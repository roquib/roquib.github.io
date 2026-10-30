export const SITE = {
  title: "Roquib",
  url: "https://abdurroquib.com",
  author: "Abdur Roquib Pramanik",
  description:
    "Senior software engineer building products with AI-assisted engineering. TypeScript, NestJS, Next.js, Rails, and PostgreSQL, and learning Rust.",
  // Source repo, taken from the git remote. Used only for the "Edit this post" link.
  repo: "https://github.com/roquib/roquib.github.io",
  // Each link stays off the site until the owner confirms it (verified: true).
  links: [
    { label: "GitHub", url: "https://github.com/roquib", verified: true },
    { label: "LinkedIn", url: "https://linkedin.com/in/abdur-roquib", verified: true },
    { label: "X", url: "https://x.com/roquib01", verified: false },
    { label: "Email", url: "mailto:roquib01@gmail.com", verified: true },
  ],
};

export function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function yyyy_mm_dd(date) {
  return date.toISOString().slice(0, 10);
}

export function time_html(date, cls) {
  const human = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const class_attr = cls ? ` class="${cls}"` : "";
  return `<time${class_attr} datetime="${yyyy_mm_dd(date)}">${human}</time>`;
}

function layout({ title, description, path, body }) {
  const page_title = title === SITE.title ? SITE.title : `${title} · ${SITE.title}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page_title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(SITE.author)}">
<link rel="canonical" href="${SITE.url}${path}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/atom+xml" title="${esc(SITE.title)}" href="${SITE.url}/feed.xml">
<link rel="stylesheet" href="/css/main.css">
</head>
<body>
<header class="site-header">
<div class="wrap bar">
<a class="brand" href="/">${esc(SITE.title)}</a>
<nav>
<a href="/">Posts</a>
<a href="/about.html">About</a>
<a href="/cv.html">CV</a>
<a href="/feed.xml">RSS</a>
</nav>
</div>
</header>
<main class="wrap">
${body}
</main>
<footer class="site-footer">
<div class="wrap">
<p>&copy; ${new Date().getFullYear()} ${esc(SITE.author)}</p>
<p>
<a href="/feed.xml">RSS</a>${
    SITE.links
      .filter((link) => link.verified)
      .map((link) => ` · <a href="${link.url}">${esc(link.label)}</a>`)
      .join("")
  }
</p>
</div>
</footer>
</body>
</html>
`;
}

export function index_page(posts) {
  const items = posts.map((post) => `<li class="post-card">
<a href="${post.path}">
<h2>${esc(post.title)}</h2>
${post.summary ? `<p>${esc(post.summary)}</p>` : ""}
</a>
${time_html(post.date, "meta")}
</li>`).join("\n");

  return layout({
    title: SITE.title,
    description: SITE.description,
    path: "/",
    body: posts.length ? `<ul class="post-list">\n${items}\n</ul>` : "<p>No posts yet.</p>",
  });
}

export function post_page(post) {
  return layout({
    title: post.title,
    description: post.summary ?? SITE.description,
    path: post.path,
    body: `<article class="post">
${post.html}
</article>
<p class="post-footer"><a href="${SITE.repo}/edit/master/${post.src}">Edit this post</a></p>
<p class="back"><a href="/">&larr; All posts</a></p>`,
  });
}

export function page({ title, html, summary, path }) {
  return layout({
    title,
    description: summary ?? SITE.description,
    path,
    body: `<article class="page">
${html}
</article>`,
  });
}

export function feed(posts) {
  const updated = posts[0] ? posts[0].date.toISOString() : new Date().toISOString();
  const entries = posts.slice(0, 20).map((post) => {
    const url = `${SITE.url}${post.path}`;
    const day = yyyy_mm_dd(post.date);
    return `<entry>
<title>${esc(post.title)}</title>
<link href="${url}" rel="alternate" type="text/html"/>
<id>${url}</id>
<published>${day}T00:00:00Z</published>
<updated>${day}T00:00:00Z</updated>
<author><name>${esc(SITE.author)}</name></author>
<summary>${esc(post.summary ?? "")}</summary>
<content type="html" xml:base="${url}"><![CDATA[${post.html}]]></content>
</entry>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>${esc(SITE.title)}</title>
<subtitle>${esc(SITE.description)}</subtitle>
<link href="${SITE.url}/feed.xml" rel="self" type="application/atom+xml"/>
<link href="${SITE.url}/" rel="alternate" type="text/html"/>
<id>${SITE.url}/</id>
<updated>${updated}</updated>
<author><name>${esc(SITE.author)}</name></author>
${entries}
</feed>
`;
}
