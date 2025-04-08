class r {
  constructor(e = [], t = {}) {
    this.options = {
      openPDFNewTab: !0,
      ...t
    }, this.icon = this.options.icon, this.links = e, this.addAttributesToLinks(this.links);
  }
  /**
   * Add attributes to links
   * @param {NodeList|Array} links - The links to process
   * @returns {void}
   */
  addAttributesToLinks(e) {
    for (const t of e) {
      const n = t.getAttribute("href"), i = this.getFileExtension(n) === "pdf";
      (this.isExternalLink(t) && !this.matchDomain(n) || i && this.options.openPDFNewTab) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute(
        "aria-label",
        `${t.innerText.trim()} (Opens in new window)`
      ), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add("external-link"), this.icon && t.insertAdjacentHTML("beforeend", this.icon));
    }
  }
  /**
   * Get a files extension
   * https://www.jstips.co/en/javascript/get-file-extension/
   * @param {String} url - Usually the href of a link
   * @returns {String}
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
  * @param {HTML element} link
  * @returns {Boolean}
  */
  isExternalLink(e) {
    return (e.protocol === "https:" || e.protocol === "http:") && location.hostname !== e.hostname && e.hostname.length && e.hostname.slice(0, 1) !== "/";
  }
  /**
   * Test whether a URL matches a given domain
   * @param {String} url - The URL to test
   * @param {String} [domain=window.location.host] - The domain to match against. Defaults to the current host.
   * @returns {Boolean} - `true` if the URL's domain matches the given domain, `false` otherwise
   */
  matchDomain(e, t = window.location.host) {
    let n;
    try {
      n = new URL(e).host;
    } catch {
      return !1;
    }
    return n.toLowerCase() === t.toLowerCase() || n.toLowerCase().endsWith("." + t.toLowerCase());
  }
}
export {
  r as ExternalLinks
};
