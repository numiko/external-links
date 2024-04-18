# External Links

## Installation

`npm install bitbucket:numiko/@numiko/external-links`

## Description

This JavaScript module provides functionality for handling external links on a webpage. It includes the following exported functions:

`addAttributesToLinks()`
This function is automatically run on page load. It scans the webpage for external links and adds the specific attributes:
`rel="noopener noreferrer"`
`target="_blank"`
`aria-label="Opens in a new tab"`
`class="external-link"` to them to improve security, accessibility, and user experience.

`isExternalLink(link)`
This function checks if a given link is external. It takes an HTML link element as an argument and returns a boolean value. A link is considered external if it uses the `http:` or `https:` protocol, its hostname is different from the current location's hostname, and its hostname is not a relative path.

`matchDomain(url, domain)`
This function checks if the domain of a given URL matches a specified domain. It takes two arguments: a URL string and an optional domain string. If no domain is provided, it defaults to the current host. The function returns `true` if the URL's domain matches the given domain (case-insensitive), and `false` otherwise. It also considers subdomains as a match (e.g., `www.example.com` matches `example.com`).
