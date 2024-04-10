function o() {
  const e = document.links;
  for (const t of e) {
    const n = t.getAttribute("href");
    (s(t) || r(t) == "pdf" && !i(n)) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute(
      "aria-label",
      `${t.text.trim()} (Opens in new window)`
    ), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add("external-link"));
  }
}
function r(e) {
  let n = new URL(e.href).pathname;
  return n.slice((n.lastIndexOf(".") - 1 >>> 0) + 2);
}
function s(e) {
  return (e.protocol === "https:" || e.protocol === "http:") && location.hostname !== e.hostname && e.hostname.length && e.hostname.slice(0, 1) !== "/";
}
function i(e, t = window.location.host) {
  const n = new URL(e).hostname;
  return n.toLowerCase() === t.toLowerCase() || n.toLowerCase().endsWith("." + t.toLowerCase());
}
o();
export {
  o as addAttributesToLinks,
  r as getFileExtension,
  s as isExternalLink,
  i as matchDomain
};
