/**
 * addAttributesToLinks Tests
 *
 * Uses getFileExtension, isExternalLink, and matchDomain functions in code
 *
 * @see {@link ../test-setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run test:coverage
 */

import { it, expect, describe, beforeEach } from 'vitest';
import { ExternalLinks } from '../lib/external-links.js';

let externalLinks;

beforeEach(() => {
  document.body.innerHTML = '';
});

const setupTest = (html) => {
  document.body.innerHTML = html;
  const tags = document.querySelectorAll('a');
  externalLinks = new ExternalLinks(tags);
  return tags[0];
};

const setupTestWithCustomClasses = (html) => {
  document.body.innerHTML = html;
  const tags = document.querySelectorAll('a');
  externalLinks = new ExternalLinks(tags, {
    classList: ['optionClass', 'optionClass2']
  });
  return tags[0];
};

describe('addAttributesToLinks Function', () => {
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

  describe('External links with custom classes', () => {
    const link = setupTestWithCustomClasses('<a href="https://external.com">External Link</a>');

    it('adds custom classes from options', () => {
      expect(link.classList.contains('optionClass')).toBe(true);
      expect(link.classList.contains('optionClass2')).toBe(true);
    });

    it('does not add default external-link class when custom classes are provided', () => {
      expect(link.classList.contains('external-link')).toBe(false);
    });
  });

  describe('External PDF links with no options passed', () => {
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

  describe('External links with existing classes', () => {
    const link = setupTestWithCustomClasses(
      '<a href="https://external.com" class="existing-class">Link</a>'
    );

    it('keeps existing class attribute and adds custom classes', () => {
      expect(link.classList.contains('existing-class')).toBe(true);
      expect(link.classList.contains('optionClass')).toBe(true);
      expect(link.classList.contains('optionClass2')).toBe(true);
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

  describe('PDF links with existing classes and custom classes passed in options', () => {
    const link = setupTestWithCustomClasses(
      '<a href="https://example.com/test.pdf" class="existing-class">Link</a>'
    );

    it('keeps existing class attribute and adds custom classes', () => {
      expect(link.classList.contains('existing-class')).toBe(true);
      expect(link.classList.contains('optionClass')).toBe(true);
      expect(link.classList.contains('optionClass2')).toBe(true);
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

  describe('Internal PDF Links with no options passed', () => {
    const link = setupTest(
      '<a href="https://example.com/test.pdf">PDF Link</a>'
    );

    it('does add target attribute', () => {
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('does add aria-label attribute', () => {
      expect(link.getAttribute('aria-label')).toBe('PDF Link (Opens in new window)');
    });

    it('does add rel attribute', () => {
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('does add external-link class', () => {
      expect(link.classList.contains('external-link')).toBe(true);
    });
  });

  describe('Aria-label attribute', () => {
    it('does not include HTML comments in aria-label', () => {
      const link = setupTest(`
        <a href="https://external.com">
          <span></span>
          <img src="image.jpg" alt="Image description" />
          <!-- comment --> Link with comment <!-- comment -->
        </a>
      `);
      expect(link.getAttribute('aria-label')).toBe('Link with comment (Opens in new window)');
    });

    it('ignores content inside <noscript>', () => {
      const link = setupTest(`
          <!-- This is a comment within a noscript element -->
          <a href="https://external.com">
            <noscript>
              <!-- This is a comment within a noscript element -->
            </noscript>
            Link with noscript
          </a>
      `);
      expect(link.getAttribute('aria-label')).toBe('Link with noscript (Opens in new window)');
    });

  });

});
