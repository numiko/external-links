/**
 * openPDFNewTab Option Tests
 *
 * @see {@link ../test-setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run test:coverage
 */

import { beforeEach, describe, expect, it } from "vitest";
import { ExternalLinks } from "../lib/external-links.js";

let externalLinks;

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('option: openPDFNewTab', () => {
  const setupTest = (options, html) => {
    document.body.innerHTML = html;
    const tags = document.querySelectorAll('a');
    externalLinks = new ExternalLinks(tags, options);
    return tags[0];
  };

  describe('default: true', () => {
    const link = setupTest(
      null,
      '<a href="https://example.com/test.pdf">PDF Link</a>'
    );

    it('adds target attribute', () => {
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('adds aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe(
        'PDF Link (Opens in new window)'
      );
    });

    it('adds rel attribute', () => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('adds external-link class', () => {
      expect(link.classList.contains('external-link')).toBe(true);
    });
  });

  describe('option passed true', () => {
    const link = setupTest(
      { openPDFNewTab: true },
      '<a href="https://example.com/test.pdf">PDF Link</a>'
    );

    it('adds target attribute', () => {
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('adds aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe(
        'PDF Link (Opens in new window)'
      );
    });

    it('adds rel attribute', () => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('adds external-link class', () => {
      expect(link.classList.contains('external-link')).toBe(true);
    });
  });

  describe('option passed false', () => {
    const link = setupTest(
      { openPDFNewTab: false },
      '<a href="https://example.com/test.pdf">PDF Link</a>'
    );

    it('does not add target attribute', () => {
      expect(link.getAttribute('target')).toBe(null);
    });

    it('does not add aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe(null);
    });

    it('does not add rel attribute', () => {
      expect(link.getAttribute('rel')).toBe(null);
    });

    it('does not add external-link class', () => {
      expect(link.classList.contains('external-link')).toBe(false);
    });
  });
});
