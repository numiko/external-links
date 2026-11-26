/**
 * Site domain behaviour tests
 *
 * Runs ExternalLinks on different site hosts to check which links are
 * treated as external (opened in a new tab). Split into:
 * - behaviour that must not change from 1.6.0
 * - the intended change for sites served from www (FEF-240)
 * - the optional `domain` setting
 *
 * All domains use the reserved .test top-level domain (RFC 2606).
 *
 * @see {@link ../test-setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run test:coverage
 */

import { it, expect, describe, afterEach } from 'vitest';
import { ExternalLinks } from '../lib/external-links.ts';

const DEFAULT_SITE = 'https://example.com';

const setSite = (url) => {
  window.happyDOM.setURL(url);
};

const runOnSite = (site, href, options) => {
  setSite(site);
  document.body.innerHTML = `<a href="${href}">Link text</a>`;
  const link = document.querySelector('a');
  new ExternalLinks([link], options);
  return link;
};

const opensInNewTab = (site, href, options) =>
  runOnSite(site, href, options).getAttribute('target') === '_blank';

afterEach(() => {
  document.body.innerHTML = '';
  setSite(DEFAULT_SITE);
});

describe('Site domain behaviour', () => {
  describe('unchanged from 1.6.0', () => {
    it.each([
      // Site on a bare domain
      ['https://site.test', '/internal', undefined, false],
      ['https://site.test', '#top', undefined, false],
      ['https://site.test', 'mailto:hello@site.test', undefined, false],
      ['https://site.test', 'tel:01234567890', undefined, false],
      ['https://site.test', 'https://site.test/page', undefined, false],
      ['https://site.test', 'https://SITE.test/page', undefined, false],
      ['https://site.test', 'https://www.site.test/page', undefined, false],
      ['https://site.test', 'https://sub.site.test', undefined, false],
      ['https://site.test', 'https://www.sub.site.test', undefined, false],
      ['https://site.test', 'https://external.test', undefined, true],
      ['https://site.test', 'https://othersite.test', undefined, true],
      ['https://site.test', 'https://site.test.attacker.test', undefined, true],
      ['https://site.test', 'https://wwwsite.test', undefined, true],
      ['https://site.test', '/doc.pdf', undefined, true],
      ['https://site.test', 'https://external.test/doc.pdf', undefined, true],
      ['https://site.test', '/doc.pdf', { openPDFNewTab: false }, false],
      ['https://site.test', 'https://external.test/doc.pdf', { openPDFNewTab: false }, true],
      ['https://site.test', 'https://external.test', null, true],
      ['https://site.test', 'https://sub.site.test', {}, false],
      // Site served from www: own host and unrelated sites
      ['https://www.site.test', '/internal', undefined, false],
      ['https://www.site.test', 'https://www.site.test/page', undefined, false],
      ['https://www.site.test', 'https://external.test', undefined, true],
      ['https://www.site.test', 'https://www.external.test', undefined, true],
      ['https://www.site.test', 'https://othersite.test', undefined, true],
      ['https://www.site.test', 'https://site.test.attacker.test', undefined, true],
      ['https://www.site.test', 'https://wwwsite.test', undefined, true],
      // Site on a subdomain: the parent domain is still external
      ['https://www.sub.site.test', 'https://site.test', undefined, true],
      ['https://sub.site.test', 'https://site.test', undefined, true],
      // Local development
      ['http://localhost:5173', '/internal', undefined, false],
      ['http://localhost:5173', 'http://localhost:5173/page', undefined, false],
      ['http://localhost:5173', 'https://site.test', undefined, true],
    ])('on %s, %s (options: %o) opens in new tab: %s', (site, href, options, expected) => {
      expect(opensInNewTab(site, href, options)).toBe(expected);
    });
  });

  describe('sites served from www treat the bare domain and its subdomains as the same site (FEF-240)', () => {
    it.each([
      ['https://www.site.test', 'https://site.test/page'],
      ['https://www.site.test', 'https://SITE.test/page'],
      ['https://www.site.test', 'https://sub.site.test'],
      ['https://www.site.test', 'https://www.sub.site.test'],
      ['https://www.site.test', 'https://deep.sub.site.test'],
      ['https://www.sub.site.test', 'https://sub.site.test'],
      ['https://www.sub.site.test', 'https://deep.sub.site.test'],
    ])('on %s, %s opens in the same tab', (site, href) => {
      expect(opensInNewTab(site, href)).toBe(false);
    });

    describe('sites on a shared parent domain only match their own subdomains', () => {
      it.each([
        ['https://member.parent.test', false],
        ['https://careers.member.parent.test', false],
        ['https://www.parent.test', true],
        ['https://www.other-member.parent.test', true],
      ])('on https://www.member.parent.test, %s opens in new tab: %s', (href, expected) => {
        expect(opensInNewTab('https://www.member.parent.test', href)).toBe(expected);
      });
    });
  });

  describe('declared domain option', () => {
    describe('on a site not served from the declared domain (e.g. local or staging)', () => {
      it.each([
        ['https://site.test', false],
        ['https://www.site.test', false],
        ['https://app.site.test', false],
        ['https://www.app.site.test', false],
        ['https://site.test/doc.pdf', true],
        ['https://external.test', true],
        ['https://othersite.test', true],
        ['https://site.test.attacker.test', true],
        ['/internal', false],
        ['http://localhost:5173/page', false],
      ])('on http://localhost:5173 with domain site.test, %s opens in new tab: %s', (href, expected) => {
        expect(opensInNewTab('http://localhost:5173', href, { domain: 'site.test' })).toBe(expected);
      });
    });

    it.each(['www.site.test', 'WWW.Site.TEST', '  site.test  '])(
      'normalises the declared domain %j',
      (domain) => {
        expect(opensInNewTab('http://localhost:5173', 'https://app.site.test', { domain })).toBe(false);
        expect(opensInNewTab('http://localhost:5173', 'https://external.test', { domain })).toBe(true);
      }
    );

    it('falls back to the current host when the declared domain is empty', () => {
      expect(opensInNewTab('https://site.test', 'https://sub.site.test', { domain: '' })).toBe(false);
      expect(opensInNewTab('https://site.test', 'https://external.test', { domain: '' })).toBe(true);
    });

    it('replaces the current host for subdomain matching, but links to the current host stay internal', () => {
      const options = { domain: 'site.test' };
      expect(opensInNewTab('https://staging.agency.test', 'https://staging.agency.test/page', options)).toBe(false);
      expect(opensInNewTab('https://staging.agency.test', '/page', options)).toBe(false);
      expect(opensInNewTab('https://staging.agency.test', 'https://assets.staging.agency.test', options)).toBe(true);
    });

    it('adds the same attributes to external links as without the option', () => {
      const withDomain = runOnSite('https://www.site.test', 'https://external.test', { domain: 'site.test' });
      const withoutDomain = runOnSite('https://www.site.test', 'https://external.test');
      for (const attribute of ['target', 'rel', 'aria-label', 'class']) {
        expect(withDomain.getAttribute(attribute)).toBe(withoutDomain.getAttribute(attribute));
      }
      expect(withDomain.getAttribute('aria-label')).toBe('Link text (Opens in new window)');
    });
  });
});
