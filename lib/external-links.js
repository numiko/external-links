/*
 * Default all external links to open in new window
 * with explanatory 'aria-label' and appropriate 'rel'
 * unless attributes already exist.
 * Leave attribute values empty in HTML to
 * ignore the following settings.
 */

export default class ExternalLinks {

  constructor(options = {}) {
    this.options = {
      openPDFNewTab: true,
      ...options
    }
    this.links = document.links;
  }


  addAttributesToLinks() {
    for (const link of this.links) {
      const href = link.getAttribute('href');
      const isPDF = this.getFileExtension(href) === 'pdf';
      const isExternal = this.isExternalLink(link) && !this.matchDomain(href);
      if (isExternal || (isPDF && this.options.openPDFNewTab))
      {
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }

        if (!link.hasAttribute('aria-label')) {
          link.setAttribute(
            'aria-label',
            `${link.text.trim()} (Opens in new window)`
          );
        }

        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }

        link.classList.add('external-link');
      }
    }
  }

  /**
   * Get a files extension
   * https://www.jstips.co/en/javascript/get-file-extension/
   * @param {String} url - Usually the href of a link
   * @returns {String}
   */

  getFileExtension(url) {
    let pathname;
    try {
      // Create a URL object to easily get the pathname if there are params or fragments
      pathname = new URL(url).pathname;
    } catch (e) {
      pathname = url;
    }
    // Get the value from the last "."
    let extension = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 2);

    return extension;
  }


  /**
  * Test whether a link is external
  * @param {HTML element} link
  * @returns {Boolean}
  */
  isExternalLink(link) {
    return (
      (link.protocol === 'https:' || link.protocol === 'http:') &&
      location.hostname !== link.hostname &&
      link.hostname.length &&
      link.hostname.slice(0, 1) !== '/'
    );
  }

/**
 * Test whether a URL matches a given domain
 * @param {String} url - The URL to test
 * @param {String} [domain=window.location.host] - The domain to match against. Defaults to the current host.
 * @returns {Boolean} - `true` if the URL's domain matches the given domain, `false` otherwise
 */
  matchDomain(url, domain = window.location.host) {
    let urlDomain;
    try {
      urlDomain = new URL(url).host;
    } catch {
      return false;
    }
    return (
      urlDomain.toLowerCase() === domain.toLowerCase() ||
      urlDomain.toLowerCase().endsWith('.' + domain.toLowerCase())
    );
  }
}

/**
 * Run on page load
 */
const externalLinks = new ExternalLinks({ openPDFNewTab: true });
externalLinks.addAttributesToLinks();
