/**
 * isExternalLink Function Tests
 *
 * @see {@link ../setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run coverage
 */

import { test, expect, describe, beforeEach } from 'vitest';
import { isExternalLink } from '../lib/external-links.js';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('isExternalLink Function', () => {
  const setupTest = (urlString) => {
    document.body.innerHTML = `<!DOCTYPE html><a href="${urlString}">Link</a>`;
    const link = document.querySelector('a');
    const isExternal = isExternalLink(link);
    return isExternal;
  };

  test('returns true for external links', () => {
    const isExternal = setupTest('https://external.com');
    expect(isExternal).toBe(true);
  });

  test('returns false for internal links', () => {
    const isExternal = setupTest('/internal');
    expect(isExternal).toBe(false);
  });

  test('returns false for links with non-http protocols', () => {
    const isExternal = setupTest('ftp://external.com');
    expect(isExternal).toBe(false);
  });

  test('returns false for links with the same hostname as the current location', () => {
    const currentDomain = window.location.hostname;
    const isExternal = setupTest(`https://${currentDomain}`);
    expect(isExternal).toBe(false);
  });

  test('returns false for links with an empty hostname', () => {
    const isExternal = setupTest('');
    expect(isExternal).toBe(false);
  });
});
