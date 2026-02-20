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
  domain?: string;
}

export class ExternalLinks {
  options: ExternalLinksOptions;

  links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[];

  baseDomain: string | null = null;

  constructor(links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[] = [], options = {}) {
    this.options = {
      openPDFNewTab: true,
      classList: [
        'external-link',
      ],
      icon: null,
      ...options
    };
    if (this.options.domain != null && this.options.domain !== '') {
      const normalisedDomain = this.options.domain.toLowerCase().trim();
      this.baseDomain = normalisedDomain.startsWith('www.') ? normalisedDomain.slice(4) : normalisedDomain;
    }
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
   * Test whether a URL matches the site domain (or a given domain when passed).
   * Uses the declared domain from the constructor when set; otherwise falls back to the given domain or window.location.host.
   * Treats www and non-www as the same base (e.g. example.com and www.example.com both match).
   * Also treats subdomains as same-site (e.g. sub.example.com, www.sub.example.com when domain is example.com).
   * @param url - The URL to test
   * @param domainOverride - Optional domain to match against. When not passed, uses the instance's declared domain or current host.
   * @returns `true` if the URL's host matches the base domain or is a subdomain of it, `false` otherwise
   */
  matchDomain(url: string, domainOverride?: string): boolean {
    let urlHost: string;
    try {
      urlHost = new URL(url).host.toLowerCase();
    } catch {
      return false;
    }
    const domainToMatch = (domainOverride ?? this.baseDomain ?? window.location.host).toLowerCase();
    const base = domainToMatch.startsWith('www.') ? domainToMatch.slice(4) : domainToMatch;
    const urlBase = urlHost.startsWith('www.') ? urlHost.slice(4) : urlHost;
    return (
      urlBase === base ||
      urlBase.endsWith('.' + base)
    );
  }
}
