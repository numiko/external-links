/**
 * addAttributesToLinks Tests
 *
 * Uses getFileExtension, isExternalLink, and matchDomain functions in code
 *
 * @see {@link ../src/setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run test:coverage
 */

import { it, expect, describe, beforeEach } from 'vitest';
import ExternalLinks from '../lib/external-links.js';

let externalLinks;

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('addAttributesToLinks Function', () => {
  const setupTest = (html) => {
    document.body.innerHTML = html;
    const tag = document.querySelector('a');
    externalLinks = new ExternalLinks({ openPDFsInNewTab: true });
    externalLinks.addAttributesToLinks();
    return tag;
  };

  describe('External links', () => {
    const link = setupTest('<a href="https://external.com">External Link</a>');

    it('adds target attribute', () => {
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('adds aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe(
        'External Link (Opens in new window)'
      );
    });

    it('adds rel attribute', () => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('adds external-link class', () => {
      expect(link.classList.contains('external-link')).toBe(true);
    });
  });

  describe('External PDF links', () => {
    const link = setupTest(
      '<a href="https://external.com/test.pdf">PDF Link</a>'
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

  describe('External links with existing attributes', () => {
    const link = setupTest(
      '<a href="https://external.com" target="_self" aria-label="Existing label" rel="existing rel" class="existing-class">Link</a>'
    );

    it('does not change existing target attribute', () => {
      expect(link.getAttribute('target')).toBe('_self');
    });

    it('does not change existing aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe('Existing label');
    });

    it('does not change existing rel attribute', () => {
      expect(link.getAttribute('rel')).toBe('existing rel');
    });

    it('does not change class attribute', () => {
      expect(link.classList.contains('existing-class')).toBe(true);
    });
  });

  describe('PDF links with existing attributes', () => {
    const link = setupTest(
      '<a href="https://example.com/test.pdf" target="_self" aria-label="Existing label" rel="existing rel" class="existing-class">Link</a>'
    );

    it('does not change existing target attribute', () => {
      expect(link.getAttribute('target')).toBe('_self');
    });

    it('does not change existing aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe('Existing label');
    });

    it('does not change existing rel attribute', () => {
      expect(link.getAttribute('rel')).toBe('existing rel');
    });

    it('does not change class attribute', () => {
      expect(link.classList.contains('existing-class')).toBe(true);
    });
  });

  describe('Internal links', () => {
    const link = setupTest('<a href="/internal">Internal Link</a>');

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

  describe('PDF links that match the current domain', () => {
    const link = setupTest(
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
