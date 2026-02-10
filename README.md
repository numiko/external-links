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

## API

See [documentation](https://v1-4-1--numiko-external-links.netlify.app/) for more detail on how to use the package.
