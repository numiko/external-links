/**
 * matchDomain Function Tests
 *
 * @see {@link ../src/setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run test:coverage
 */

import { it, expect, describe, beforeEach } from 'vitest';
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

  it('returns true when domain matches', () => {
    const { matches } = setupTest('https://example.com', 'example.com');
    expect(matches).toBe(true);
  });

  it('returns false when domain does not match', () => {
    const { matches } = setupTest('https://other.com', 'example.com');
    expect(matches).toBe(false);
  });

  it('returns true when domain matches case-insensitively', () => {
    const { matches } = setupTest('https://EXAMPLE.com', 'example.com');
    expect(matches).toBe(true);
  });

  it('returns true when domain matches the current host', () => {
    const { matches } = setupTest('https://example.com');
    expect(matches).toBe(true);
  });

  it('returns false when domain is a substring of another domain', () => {
    const { matches } = setupTest('https://otherexample.com', 'example.com');
    expect(matches).toBe(false);
  });

  it('returns true when domain is a subdomain of the specified domain', () => {
  const { matches } = setupTest('https://sub.example.com', 'example.com');
  expect(matches).toBe(true);
  });

  it('returns true when URL has parameters and matches the specified domain', () => {
  const { matches } = setupTest('https://example.com?page=1', 'example.com');
  expect(matches).toBe(true);
  });

  it('returns true when URL has a fragment and matches the specified domain', () => {
    const { matches } = setupTest('https://example.com#section', 'example.com');
    expect(matches).toBe(true);
  });

  it('returns true when URL has a different protocol', () => {
    const { matches } = setupTest('ftp://example.com', 'example.com');
    expect(matches).toBe(true);
  });

  it('returns false when URL is relative', () => {
    const { matches } = setupTest('/page', 'example.com');
    expect(matches).toBe(false);
  });

  it('returns false when URL is an anchor id', () => {
    const { matches } = setupTest('#section', 'example.com');
    expect(matches).toBe(false);
  });
});
