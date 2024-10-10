class s {
  constructor(t = {}) {
    this.options = {
      openPDFNewTab: !0,
      ...t
    }, this.links = document.links, this.addAttributesToLinks();
  }
  addAttributesToLinks() {
    for (const t of this.links) {
      const e = t.getAttribute("href"), n = this.getFileExtension(e) === "pdf";
      (this.isExternalLink(t) && !this.matchDomain(e) || n && this.options.openPDFNewTab) && (t.hasAttribute("target") || t.setAttribute("target", "_blank"), t.hasAttribute("aria-label") || t.setAttribute(
        "aria-label",
        `${t.innerText.trim()} (Opens in new window)`
      ), t.hasAttribute("rel") || t.setAttribute("rel", "noopener noreferrer"), t.classList.add("external-link"));
    }
  }
  /**
   * Get a files extension
   * https://www.jstips.co/en/javascript/get-file-extension/
   * @param {String} url - Usually the href of a link
   * @returns {String}
   */
  getFileExtension(t) {
    let e;
    try {
      e = new URL(t).pathname;
    } catch {
      e = t;
    }
    return e.slice((e.lastIndexOf(".") - 1 >>> 0) + 2);
  }
  /**
  * Test whether a link is external
  * @param {HTML element} link
  * @returns {Boolean}
  */
  isExternalLink(t) {
    return (t.protocol === "https:" || t.protocol === "http:") && location.hostname !== t.hostname && t.hostname.length && t.hostname.slice(0, 1) !== "/";
  }
  /**
   * Test whether a URL matches a given domain
   * @param {String} url - The URL to test
   * @param {String} [domain=window.location.host] - The domain to match against. Defaults to the current host.
   * @returns {Boolean} - `true` if the URL's domain matches the given domain, `false` otherwise
   */
  matchDomain(t, e = window.location.host) {
    let n;
    try {
      n = new URL(t).host;
    } catch {
      return !1;
    }
    return n.toLowerCase() === e.toLowerCase() || n.toLowerCase().endsWith("." + e.toLowerCase());
  }
  /**
   * Initialize the ExternalLinks functionality
   * @param {Object} options - Configuration options
   * @returns {ExternalLinks} - Instance of ExternalLinks
   */
  static init(t = {}) {
    return new s(t);
  }
}
export {
  s as default
};
