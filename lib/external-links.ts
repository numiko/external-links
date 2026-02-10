/*
 * Default all external links to open in new window
 * with explanatory 'aria-label' and appropriate 'rel'
 * unless attributes already exist.
 * Leave attribute values empty in HTML to
 * ignore the following settings.
 */


type ExternalLinksOptions = {
  openPDFNewTab: boolean;
  classList: string[];
  icon: string | null;
}

export class ExternalLinks {
  options: ExternalLinksOptions;

  links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[];

  constructor(links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[] = [], options = {}) {
    this.options = {
      openPDFNewTab: true,
      classList: [
        'external-link',
      ],
      icon: null,
      ...options
    };
    this.links = links;
    this.addAttributesToLinks(this.links);
  }

  /**
   * Add attributes to links
   * links - The links to process
   */
  addAttributesToLinks(links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[]): void {
    for (const link of links) {
      const href: string = link.getAttribute('href') || '';
      const isPDF: boolean = this.getFileExtension(href) === 'pdf';
      const isExternal: boolean = this.isExternalLink(link) && !this.matchDomain(href);
      if (isExternal || (isPDF && this.options.openPDFNewTab)) {
        if (!link.hasAttribute('target')) {
          link.setAttribute('target', '_blank');
        }

        if (!link.hasAttribute('aria-label')) {
          link.setAttribute(
            'aria-label',
            `${link.innerText.trim()} (Opens in new window)`
          );
        }

        if (!link.hasAttribute('rel')) {
          link.setAttribute('rel', 'noopener noreferrer');
        }


        link.classList.add(...this.options.classList);

        if (this.options.icon) {
          link.insertAdjacentHTML('beforeend', this.options.icon);
        }
      }
    }
  }

  /**
   * Get a files extension
   * https://www.jstips.co/en/javascript/get-file-extension/
   * url - Usually the href of a link
   */
  getFileExtension(url: string) {
    let pathname: string;
    try {
      // Create a URL object to easily get the pathname if there are params or fragments
      pathname = new URL(url).pathname;
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      pathname = url;
    }
    // Get the value from the last "."
    let extension: string = pathname.slice(((pathname.lastIndexOf('.') - 1) >>> 0) + 2);

    return extension;
  }

  /**
  * Test whether a link is external
  */
  isExternalLink(link: HTMLAnchorElement) {
    return (
      (link.protocol === 'https:' || link.protocol === 'http:') &&
      location.hostname !== link.hostname &&
      link.hostname.length > 0 &&
      link.hostname.slice(0, 1) !== '/'
    );
  }

  /**
   * Test whether a URL matches a given domain
   * url - The URL to test
   * [domain=window.location.host] - The domain to match against. Defaults to the current host.
   * true` if the URL's domain matches the given domain, `false` otherwise
   */
  matchDomain(url: string, domain: string = window.location.host): boolean {
    let urlDomain: string;
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
