export type ExternalLinksOptions = {
    openPDFNewTab: boolean;
    classList: string[];
    icon: string | null;
    /**
     * The site's main domain, e.g. `example.com`. Links to this domain, its `www`
     * version and its subdomains are treated as the same site.
     * Defaults to the current host.
     */
    domain?: string;
};
export declare class ExternalLinks {
    options: ExternalLinksOptions;
    links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[];
    baseDomain: string | null;
    constructor(links?: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[], options?: {});
    /**
     * Add attributes to links
     * links - The links to process
     */
    addAttributesToLinks(links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[]): void;
    /**
     * Get a files extension
     * https://www.jstips.co/en/javascript/get-file-extension/
     * url - Usually the href of a link
     */
    getFileExtension(url: string): string;
    /**
    * Test whether a link is external
    */
    isExternalLink(link: HTMLAnchorElement): boolean;
    /**
     * Test whether a URL matches the site domain (or a given domain when passed).
     * Uses the declared domain from the constructor when set; otherwise falls back to the given domain or window.location.host.
     * Treats www and non-www as the same base (e.g. example.com and www.example.com both match).
     * Also treats subdomains as same-site (e.g. sub.example.com, www.sub.example.com when domain is example.com).
     * @param url - The URL to test
     * @param domainOverride - Optional domain to match against. When not passed, uses the instance's declared domain or current host.
     * @returns `true` if the URL's host matches the base domain or is a subdomain of it, `false` otherwise
     */
    matchDomain(url: string, domainOverride?: string): boolean;
}
