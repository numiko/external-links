const n = document.links;
for (const t of n) {
  const e = t.getAttribute("href");
  (o(t) || r(t) == "pdf" && !i(e)) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute("aria-label", `${t.text.trim()} (Opens in new window)`), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add("external-link"));
}
function r(t) {
  let e = t.href.slice((t.href.lastIndexOf(".") - 1 >>> 0) + 2);
  return e.indexOf("?") > 0 && (e = e.substring(0, e.indexOf("?"))), e;
}
function o(t) {
  return (t.protocol === "https:" || t.protocol === "http:") && location.hostname !== t.hostname && t.hostname.length && t.hostname.slice(0, 1) !== "/";
}
function i(t, e = window.location.host) {
  return t.toLowerCase().includes(e.toLowerCase());
}
