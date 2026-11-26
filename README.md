# External Links

This JavaScript module provides functionality for handling external links on a webpage.

## Features

Once initialised this package will check a site for any links pointing to an external source. It will in turn change their behaviour so that they are opened in a new tab. 'Opens in new tab' will also be added to the aria-label attribute of these links.

## Installation

`npm i @numiko/external-links`

## Usage

### JS

```javascript
import { ExternalLinks } from '@numiko/external-links';

const links = document.links;

new ExternalLinks(links);
```

### Options

```javascript
new ExternalLinks(links, {
  openPDFNewTab: true,
  classList: ['external-link'],
  icon: null,
  domain: 'example.com',
});
```

| Option | Default | Description |
| --- | --- | --- |
| `openPDFNewTab` | `true` | Open PDF links in a new tab, even on the same site. |
| `classList` | `['external-link']` | Classes added to external links. |
| `icon` | `null` | HTML added to the end of external links, e.g. an SVG icon. |
| `domain` | current host | The site's main domain. Links to this domain, its `www` version and its subdomains are treated as the same site. Useful when the site is viewed on another host, such as staging. |

### Same-site links

Links are treated as the same site, and left alone, when they point to:

- the current host
- the site's domain, with or without `www`
- any subdomain of the site's domain

The site's domain is the `domain` option if set, otherwise the current host without `www`. For example, on `www.example.com` links to `example.com`, `app.example.com` and `www.app.example.com` open in the same tab, while links to other domains, such as `example.org`, open in a new tab.

## API

See [documentation](https://v1-8-0--numiko-external-links.netlify.app/) for more detail on how to use the package.
