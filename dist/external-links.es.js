class i {
  constructor(e = [], t = {}) {
    this.options = {
      openPDFNewTab: !0,
      classList: [
        "external-link"
      ],
      icon: null,
      ...t
    }, this.links = e, this.addAttributesToLinks(this.links);
  }
  /**
   * Add attributes to links
   * links - The links to process
   */
  addAttributesToLinks(e) {
    for (const t of e) {
      const s = t.getAttribute("href") || "", n = this.getFileExtension(s) === "pdf";
      (this.isExternalLink(t) && !this.matchDomain(s) || n && this.options.openPDFNewTab) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute(
        "aria-label",
        `${t.innerText.trim()} (Opens in new window)`
      ), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add(...this.options.classList), this.options.icon && t.insertAdjacentHTML("beforeend", this.options.icon));
    }
  }
  /**
   * Get a files extension
   * https://www.jstips.co/en/javascript/get-file-extension/
   * url - Usually the href of a link
   */
  getFileExtension(e) {
    let t;
    try {
      t = new URL(e).pathname;
    } catch {
      t = e;
    }
    return t.slice((t.lastIndexOf(".") - 1 >>> 0) + 2);
  }
  /**
  * Test whether a link is external
  */
  isExternalLink(e) {
    return (e.protocol === "https:" || e.protocol === "http:") && location.hostname !== e.hostname && e.hostname.length > 0 && e.hostname.slice(0, 1) !== "/";
  }
  /**
   * Test whether a URL matches a given domain
   * url - The URL to test
   * [domain=window.location.host] - The domain to match against. Defaults to the current host.
   * true` if the URL's domain matches the given domain, `false` otherwise
   */
  matchDomain(e, t = window.location.host) {
    let s;
    try {
      s = new URL(e).host;
    } catch {
      return !1;
    }
    return s.toLowerCase() === t.toLowerCase() || s.toLowerCase().endsWith("." + t.toLowerCase());
  }
}
const o = document.querySelectorAll("a");
new i(o);
export {
  i as ExternalLinks
};
