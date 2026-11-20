/**
 * Site domain behaviour tests
 *
 * Runs ExternalLinks on different site hosts to check which links are
 * treated as external (opened in a new tab). Split into:
 * - behaviour that must not change from 1.6.0
 * - the intended change for sites served from www (FEF-240)
 * - the optional `domain` setting
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
      ['https://example.com', '/internal', undefined, false],
      ['https://example.com', '#top', undefined, false],
      ['https://example.com', 'mailto:hello@example.com', undefined, false],
      ['https://example.com', 'tel:01234567890', undefined, false],
      ['https://example.com', 'https://example.com/page', undefined, false],
      ['https://example.com', 'https://EXAMPLE.com/page', undefined, false],
      ['https://example.com', 'https://www.example.com/page', undefined, false],
      ['https://example.com', 'https://sub.example.com', undefined, false],
      ['https://example.com', 'https://www.sub.example.com', undefined, false],
      ['https://example.com', 'https://external.com', undefined, true],
      ['https://example.com', 'https://otherexample.com', undefined, true],
      ['https://example.com', 'https://example.com.evil.com', undefined, true],
      ['https://example.com', 'https://wwwexample.com', undefined, true],
      ['https://example.com', '/doc.pdf', undefined, true],
      ['https://example.com', 'https://external.com/doc.pdf', undefined, true],
      ['https://example.com', '/doc.pdf', { openPDFNewTab: false }, false],
      ['https://example.com', 'https://external.com/doc.pdf', { openPDFNewTab: false }, true],
      ['https://example.com', 'https://external.com', null, true],
      ['https://example.com', 'https://sub.example.com', {}, false],
      // Site served from www: own host and unrelated sites
      ['https://www.example.com', '/internal', undefined, false],
      ['https://www.example.com', 'https://www.example.com/page', undefined, false],
      ['https://www.example.com', 'https://external.com', undefined, true],
      ['https://www.example.com', 'https://www.external.com', undefined, true],
      ['https://www.example.com', 'https://otherexample.com', undefined, true],
      ['https://www.example.com', 'https://example.com.evil.com', undefined, true],
      ['https://www.example.com', 'https://wwwexample.com', undefined, true],
      // Site on a subdomain: the parent domain is still external
      ['https://www.sub.example.com', 'https://example.com', undefined, true],
      ['https://sub.example.com', 'https://example.com', undefined, true],
      // Local development
      ['http://localhost:5173', '/internal', undefined, false],
      ['http://localhost:5173', 'http://localhost:5173/page', undefined, false],
      ['http://localhost:5173', 'https://example.com', undefined, true],
    ])('on %s, %s (options: %o) opens in new tab: %s', (site, href, options, expected) => {
      expect(opensInNewTab(site, href, options)).toBe(expected);
    });
  });

  describe('sites served from www treat the bare domain and its subdomains as the same site (FEF-240)', () => {
    it.each([
      ['https://www.example.com', 'https://example.com/page'],
      ['https://www.example.com', 'https://EXAMPLE.com/page'],
      ['https://www.example.com', 'https://sub.example.com'],
      ['https://www.example.com', 'https://www.sub.example.com'],
      ['https://www.example.com', 'https://deep.sub.example.com'],
      ['https://www.sub.example.com', 'https://sub.example.com'],
      ['https://www.sub.example.com', 'https://deep.sub.example.com'],
    ])('on %s, %s opens in the same tab', (site, href) => {
      expect(opensInNewTab(site, href)).toBe(false);
    });

    describe('sites on a shared parent domain only match their own subdomains', () => {
      it.each([
        ['https://leedsth.nhs.uk', false],
        ['https://careers.leedsth.nhs.uk', false],
        ['https://www.nhs.uk', true],
        ['https://www.gosh.nhs.uk', true],
      ])('on https://www.leedsth.nhs.uk, %s opens in new tab: %s', (href, expected) => {
        expect(opensInNewTab('https://www.leedsth.nhs.uk', href)).toBe(expected);
      });
    });
  });

  describe('declared domain option', () => {
    describe('on a site not served from the declared domain (e.g. local or staging)', () => {
      it.each([
        ['https://example.com', false],
        ['https://www.example.com', false],
        ['https://app.example.com', false],
        ['https://www.app.example.com', false],
        ['https://example.com/doc.pdf', true],
        ['https://external.com', true],
        ['https://otherexample.com', true],
        ['https://example.com.evil.com', true],
        ['/internal', false],
        ['http://localhost:5173/page', false],
      ])('on http://localhost:5173 with domain example.com, %s opens in new tab: %s', (href, expected) => {
        expect(opensInNewTab('http://localhost:5173', href, { domain: 'example.com' })).toBe(expected);
      });
    });

    it.each(['www.example.com', 'WWW.Example.COM', '  example.com  '])(
      'normalises the declared domain %j',
      (domain) => {
        expect(opensInNewTab('http://localhost:5173', 'https://app.example.com', { domain })).toBe(false);
        expect(opensInNewTab('http://localhost:5173', 'https://external.com', { domain })).toBe(true);
      }
    );

    it('falls back to the current host when the declared domain is empty', () => {
      expect(opensInNewTab('https://example.com', 'https://sub.example.com', { domain: '' })).toBe(false);
      expect(opensInNewTab('https://example.com', 'https://external.com', { domain: '' })).toBe(true);
    });

    it('replaces the current host for subdomain matching, but links to the current host stay internal', () => {
      const options = { domain: 'example.com' };
      expect(opensInNewTab('https://staging.numiko.dev', 'https://staging.numiko.dev/page', options)).toBe(false);
      expect(opensInNewTab('https://staging.numiko.dev', '/page', options)).toBe(false);
      expect(opensInNewTab('https://staging.numiko.dev', 'https://assets.staging.numiko.dev', options)).toBe(true);
    });

    it('adds the same attributes to external links as without the option', () => {
      const withDomain = runOnSite('https://www.example.com', 'https://external.com', { domain: 'example.com' });
      const withoutDomain = runOnSite('https://www.example.com', 'https://external.com');
      for (const attribute of ['target', 'rel', 'aria-label', 'class']) {
        expect(withDomain.getAttribute(attribute)).toBe(withoutDomain.getAttribute(attribute));
      }
      expect(withDomain.getAttribute('aria-label')).toBe('Link text (Opens in new window)');
    });
  });
});
