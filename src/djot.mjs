import { parse, renderHTML } from "@djot/djot";
import hljs from "highlight.js";
import { esc, time_html } from "./templates.mjs";

const ADMONITION_TITLES = {
  note: "Note",
  warn: "Warning",
  quiz: "Question",
};

// Renders a djot document to HTML. Returns the title (first level-1 heading),
// a plain-text summary (first paragraph), and the HTML body.
export function render_doc(source, { date } = {}) {
  const doc = parse(source);
  const ctx = { title: undefined, summary: undefined };
  let section = undefined;

  const overrides = {
    section(node, r) {
      const section_prev = section;
      section = node;
      const result = child(node, "heading")?.level === 1
        ? r.renderChildren(node)
        : r.renderAstNodeDefault(node);
      section = section_prev;
      return result;
    },

    heading(node, r) {
      if (node.level === 1) ctx.title = text(node);
      if (node.level === 1 && date) {
        return `\n<header class="post-header">\n<h1>${r.renderChildren(node)}</h1>\n${
          time_html(date, "meta")
        }\n</header>\n`;
      }
      const tag = `h${node.level}`;
      const id = node.level > 1 ? section?.autoAttributes?.id : undefined;
      const children = r.renderChildren(node);
      const anchored = id ? `<a href="#${id}">${children}</a>` : children;
      return `\n<${tag}${r.renderAttributes(node)}>${anchored}</${tag}>\n`;
    },

    para(node, r) {
      if (node.children.length === 1 && node.children[0].tag === "image") {
        const cap = take_cap(node);
        return `\n<figure>\n${
          cap ? `<figcaption>${esc(cap)}</figcaption>\n` : ""
        }${r.renderChildren(node)}\n</figure>\n`;
      }
      const result = r.renderAstNodeDefault(node);
      if (!ctx.summary) ctx.summary = text(node);
      return result;
    },

    code_block(node) {
      const cap = take_cap(node);
      const code = node.text.replace(/\n$/, "");
      const lang = node.lang ?? "text";
      return `\n<figure class="code-block">\n${
        cap ? `<figcaption>${esc(cap)}</figcaption>\n` : ""
      }<pre><code class="language-${esc(lang)}">${highlight(code, node.lang)}</code></pre>\n</figure>\n`;
    },

    div(node, r) {
      const kind = Object.keys(ADMONITION_TITLES).find((name) =>
        has_class(node, name)
      );
      if (kind) {
        return `\n<aside class="admonition ${kind}">\n<p class="admonition-title">${
          ADMONITION_TITLES[kind]
        }</p>\n<div>${r.renderChildren(node)}</div>\n</aside>\n`;
      }
      if (has_class(node, "block")) {
        const cap = take_cap(node);
        return `\n<aside${r.renderAttributes(node)}>\n${
          cap ? `<div class="title">${esc(cap)}</div>\n` : ""
        }${r.renderChildren(node)}\n</aside>\n`;
      }
      return r.renderAstNodeDefault(node);
    },
  };

  const html = renderHTML(doc, { overrides });
  return { html, title: ctx.title, summary: ctx.summary };
}

function highlight(code, lang) {
  if (lang && hljs.getLanguage(lang)) {
    return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
  }
  return esc(code);
}

// Reads and removes a `cap` attribute, which becomes a figure caption.
function take_cap(node) {
  const cap = node.attributes?.cap;
  if (cap) delete node.attributes.cap;
  return cap;
}

function has_class(node, cls) {
  return (node.attributes?.class ?? "").split(" ").includes(cls);
}

function child(node, tag) {
  return (node.children ?? []).find((it) => it.tag === tag);
}

function text(node) {
  if ("text" in node) return node.text;
  if (node.tag === "hard_break") return "\n";
  if (node.tag === "soft_break") return " ";
  if ("children" in node) return node.children.map(text).join("");
  return "";
}
