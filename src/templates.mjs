export const SITE = {
  title: "Roquib",
  url: "https://roquib.github.io",
  author: "Abdur Roquib Pramanik",
  description: "Notes on what I learn at university: course theory, code, and things I work out along the way.",
  email: "roquib01@outlook.com",
  github: "roquib",
  repo: "roquib.github.io",
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
<a href="/feed.xml">RSS</a>
<a href="https://github.com/${SITE.github}">GitHub</a>
</nav>
</div>
</header>
<main class="wrap">
${body}
</main>
<footer class="site-footer">
<div class="wrap">
<p>&copy; ${new Date().getFullYear()} ${esc(SITE.author)}</p>
<p><a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
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
    body: `<p class="lede">${esc(SITE.description)}</p>
${posts.length ? `<ul class="post-list">\n${items}\n</ul>` : "<p>No posts yet.</p>"}`,
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
<p class="post-footer"><a href="https://github.com/${SITE.github}/${SITE.repo}/edit/master/${post.src}">Edit this post</a></p>
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
