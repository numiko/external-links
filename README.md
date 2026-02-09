# External Links

This JavaScript module provides functionality for handling external links on a webpage.

## Features

Once initialised this package will check a site for any links pointing to an external source. It will in turn change their behaviour so that they are opened in a new tab. 'Opens in new tab' will also be added to the aria-label attribute of these links.

## Installation

The package can be installed from BitBucket.

`npm install ssh://git@bitbucket.org:numiko/external-links.git#semver:1.1.1`

## Usage

The ExternalLinks class will need to be initialized in a JavaScript file. This usually lives in the `src/js/numiko/` directory.

The ExternalLinks class will need to be initialized with a NodeList or Array of links.

### JS

```javascript
import { ExternalLinks } from '@numiko/external-links';

const links = document.links;

new ExternalLinks(links);
```

## API

See [documentation](https://v1-2-1--numiko-external-links.netlify.app/) for more detail on how to use the package.
