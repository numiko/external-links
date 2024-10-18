# External Links

## Description

This JavaScript module provides functionality for handling external links on a webpage.

## Installation

The package can be installed from BitBucket. If the package has reached version 1,
prefer the semver method; if the package is not yet stable, we recommend installing via the tag.

`npm install ssh://git@bitbucket.org:numiko/external-links.git#<TAG_NAME>`

`npm install ssh://git@bitbucket.org:numiko/external-links.git##semver:<VERSION>`

## Usage

The ExternalLinks class will need to be initialized in a JavaScript file. This usually lives in the `src/js/numiko/` directory.

The ExternalLinks class will need to be initialized with a NodeList or Array of links.

### JS

```javascript
import ExternalLinks from '@numiko/external-links.js';

const links = document.querySelectorAll('a');

new ExternalLinks(links);
```

## API

### Options

| Option | Description | Type | Default |
| --- | --- | --- | --- |
| `openPDFNewTab` | Links to PDF's will open in a new tab | `boolean` | `true` |

### Methods

| Method | Description | Parameters | Return Type |
| --- | --- | --- | --- |
| `addAttributesToLinks(links)` | Is automatically called when the ExternalLinks class is initialized. It scans the webpage for external links and adds the specific attributes: `rel="noopener noreferrer"` `target="_blank"` `aria-label="Opens in a new tab"` `class="external-link"` to them to improve security, accessibility, and user experience. | `links: NodeList\|Array` | `void` |
| |  |  |  |
| `getFileExtension(url)` | Extracts and returns the file extension from a given URL or pathname. E.g. `https://www.example.com/file.pdf` returns `pdf`. | `url: string` | `string` |
| `isExternalLink(link)` | Checks if a given link is external. A link is considered external if it uses the `http:` or `https:` protocol, its hostname is different from the current location's hostname, and its hostname is not a relative path. | `link: HTMLElement` | `boolean` |
| `matchDomain(url, domain?)` | Checks if the domain of a given URL matches a specified domain. If no domain is provided, it defaults to the current host. Returns `true` if the URL's domain matches the given domain (case-insensitive). It also considers subdomains as a match (e.g., `www.example.com` matches `example.com`). | `url: string`, `domain?: string` | `boolean` |
