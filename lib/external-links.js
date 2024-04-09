/*
 * Default all external links to open in new window
 * with explanatory 'aria-label' and appropriate 'rel'
 * unless attributes already exist.
 * Leave attribute values empty in HTML to
 * ignore the following settings.
 */
const links = document.links;

for (const link of links) {

  const href= link.getAttribute('href');

  if ( isExternalLink(link) || getFileExtension(link) == 'pdf' && !matchDomain(href)  ) {

    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
    }

    if (!link.hasAttribute('aria-label')) {
      link.setAttribute('aria-label', `${link.text.trim()} (Opens in new window)`);
    }

    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }

    link.classList.add('external-link');
  }
}

/**
 * Get a files extension
 * https://www.jstips.co/en/javascript/get-file-extension/
 * @param {HTML Element} link
 * @returns {String}
 */
function getFileExtension(link) {
  // Get the value from the last "."
  let extension =  link.href.slice((link.href.lastIndexOf('.') - 1 >>> 0) + 2);
  // Remove any paramters
  if (extension.indexOf('?') > 0) {
    extension = extension.substring(0, extension.indexOf('?'));
  }
  return extension;
}

/**
 * Test whether a link is external
 * @param {HTML element} link
 * @returns {Boolean}
 */
function isExternalLink(link) {
  return (link.protocol === 'https:' || link.protocol === 'http:' ) &&
    location.hostname !== link.hostname &&
    link.hostname.length &&
    link.hostname.slice(0, 1) !== '/';
}

function matchDomain(url, domain = window.location.host) {
  return url.toLowerCase().includes(domain.toLowerCase());
}
