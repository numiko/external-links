function o() {
  const e = document.links;
  for (const t of e) {
    const n = t.getAttribute("href");
    (a(t) || r(n) == "pdf" && !i(n)) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute(
      "aria-label",
      `${t.innerText.trim()} (Opens in new window)`
    ), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add("external-link"));
  }
}
function r(e) {
  let t;
  try {
    t = new URL(e).pathname;
  } catch {
    t = e;
  }
  return t.slice((t.lastIndexOf(".") - 1 >>> 0) + 2);
}
function a(e) {
  return (e.protocol === "https:" || e.protocol === "http:") && location.hostname !== e.hostname && e.hostname.length && e.hostname.slice(0, 1) !== "/";
}
function i(e, t = window.location.host) {
  let n;
  try {
    n = new URL(e).host;
  } catch {
    return !1;
  }
  return n.toLowerCase() === t.toLowerCase() || n.toLowerCase().endsWith("." + t.toLowerCase());
}
o();
export {
  o as addAttributesToLinks,
  r as getFileExtension,
  a as isExternalLink,
  i as matchDomain
};
