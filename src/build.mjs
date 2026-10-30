import { watch } from "node:fs";
import { createServer } from "node:http";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import { render_doc } from "./djot.mjs";
import { fill_durations } from "./durations.mjs";
import * as t from "./templates.mjs";

const OUT = "out/www";
const POSTS = "content/posts";
const PAGES = ["about", "cv"];

async function main() {
  const [command, arg] = process.argv.slice(2);
  switch (command) {
    case "build":
      await build();
      break;
    case "serve":
      await build();
      serve(8080);
      break;
    case "new":
      await touch(arg);
      break;
    default:
      console.error("usage: build.mjs <build | serve | new SLUG>");
      process.exit(1);
  }
}

async function build() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const posts = await collect_posts();
  await write("index.html", t.index_page(posts));
  await write("feed.xml", t.feed(posts));
  for (const post of posts) {
    await write(post.path.slice(1), t.post_page(post));
  }

  for (const name of PAGES) {
    const source = fill_durations(await readFile(`content/${name}.dj`, "utf8"));
    const { html, title, summary } = render_doc(source);
    if (!title) throw new Error(`content/${name}.dj needs a level-1 heading`);
    await write(
      `${name}.html`,
      t.page({ title, html, summary, path: `/${name}.html` }),
    );
  }

  await cp("content/css", join(OUT, "css"), { recursive: true });
  await cp("content/assets", join(OUT, "assets"), {
    recursive: true,
    filter: (src) => !basename(src).startsWith("."),
  });
  await cp("content/favicon.svg", join(OUT, "favicon.svg"));
  // Keeps the custom domain set on GitHub Pages across Actions deploys.
  await cp("content/CNAME", join(OUT, "CNAME"));
  console.log(`built ${posts.length} posts into ${OUT}`);
}

async function collect_posts() {
  const files = (await readdir(POSTS))
    .filter((file) => file.endsWith(".dj"))
    .sort()
    .reverse();

  const posts = [];
  for (const file of files) {
    const match = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.dj$/);
    if (!match) throw new Error(`post filename must be YYYY-MM-DD-slug.dj: ${file}`);
    const [, y, m, d, slug] = match;
    const date = new Date(Date.UTC(+y, +m - 1, +d));

    const source = await readFile(join(POSTS, file), "utf8");
    const { html, title, summary } = render_doc(source, { date });
    if (!title) throw new Error(`${file} needs a level-1 heading`);

    posts.push({
      date,
      title,
      summary,
      html,
      path: `/${y}/${m}/${d}/${slug}.html`,
      src: `${POSTS}/${file}`,
    });
  }
  return posts;
}

async function write(path, content) {
  const full = join(OUT, path);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, content);
}

async function touch(slug) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("usage: npm run new -- <slug>   (lowercase letters, digits, dashes)");
  }
  const date = new Date().toISOString().slice(0, 10);
  const path = join(POSTS, `${date}-${slug}.dj`);
  await writeFile(path, "# Title\n\nWrite here.\n", { flag: "wx" });
  console.log(`created ${path}`);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

function serve(port) {
  const root = resolve(OUT);
  createServer(async (req, res) => {
    let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = resolve(root, `.${pathname}`);
    if (!file.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("not found");
    }
  }).listen(port, () => console.log(`serving http://localhost:${port}`));

  // Rebuild in a fresh process: a long-running one keeps the old modules loaded.
  let timer;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      Bun.spawn(["bun", "src/build.mjs", "build"], {
        stdout: "inherit",
        stderr: "inherit",
      });
    }, 100);
  };
  for (const dir of ["content", "src"]) {
    watch(dir, { recursive: true }, rebuild);
  }
}

await main();
