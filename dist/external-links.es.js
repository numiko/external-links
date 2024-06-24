function r() {
  const e = document.links;
  for (const t of e) {
    const n = t.getAttribute("href"), o = t.pathname;
    (i(t) || s(o) == "pdf" && !a(n)) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute(
      "aria-label",
      `${t.text.trim()} (Opens in new window)`
    ), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add("external-link"));
  }
}
function s(e) {
  return e.slice((e.lastIndexOf(".") - 1 >>> 0) + 2);
}
function i(e) {
  return (e.protocol === "https:" || e.protocol === "http:") && location.hostname !== e.hostname && e.hostname.length && e.hostname.slice(0, 1) !== "/";
}
function a(e, t = window.location.host) {
  let n;
  try {
    n = new URL(e).host;
  } catch {
    return !1;
  }
  return n.toLowerCase() === t.toLowerCase() || n.toLowerCase().endsWith("." + t.toLowerCase());
}
r();
export {
  r as addAttributesToLinks,
  s as getFileExtension,
  i as isExternalLink,
  a as matchDomain
};
