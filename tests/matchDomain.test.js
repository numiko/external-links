/**
 * matchDomain Function Tests
 *
 * @see {@link ../setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run coverage
 */

import { test, expect, describe, beforeEach } from 'vitest';
import { matchDomain } from '../lib/external-links.js';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('matchDomain Function', () => {
  const setupTest = (innerHTML, domain) => {
    document.body.innerHTML = `<!DOCTYPE html><a href="${innerHTML}">Link</a>`;
    const link = document.querySelector('a');
    const url = link.getAttribute('href');
    const matches = matchDomain(url, domain);
    return { url, matches };
  };

  test('returns true when domain matches', () => {
    const { matches } = setupTest('https://example.com', 'example.com');
    expect(matches).toBe(true);
  });

  test('returns false when domain does not match', () => {
    const { matches } = setupTest('https://other.com', 'example.com');
    expect(matches).toBe(false);
  });

  test('returns true when domain matches case-insensitively', () => {
    const { matches } = setupTest('https://EXAMPLE.com', 'example.com');
    expect(matches).toBe(true);
  });

  test('returns true when domain matches the current host', () => {
    const { matches } = setupTest('https://example.com');
    expect(matches).toBe(true);
  });

  test('returns false when domain is a substring of another domain', () => {
    const { matches } = setupTest('https://otherexample.com', 'example.com');
    expect(matches).toBe(false);
  });
});
