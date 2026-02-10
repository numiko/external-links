export declare class ExternalLinks {
    options: Required<ExternalLinksOptions>;
    links: NodeListOf<HTMLAnchorElement> | HTMLAnchorElement[];
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
     * Test whether a URL matches a given domain
     * url - The URL to test
     * [domain=window.location.host] - The domain to match against. Defaults to the current host.
     * true` if the URL's domain matches the given domain, `false` otherwise
     */
    matchDomain(url: string, domain?: string): boolean;
}

declare interface ExternalLinksOptions {
    openPDFNewTab: boolean;
    classList: string[];
    icon: string | null;
}

export { }
