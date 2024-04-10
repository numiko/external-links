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
  test('returns true when domain matches', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="https://example.com">Link</a>`;
    const link = document.querySelector('a');
    const url = link.getAttribute('href');
    const domain = 'example.com';
    const matches = matchDomain(url, domain);
    expect(matches).toBe(true);
  });

  test('returns false when domain does not match', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="https://example.com">Link</a>`;
    const link = document.querySelector('a');
    const url = link.getAttribute('href');
    const domain = 'other.com';
    const matches = matchDomain(url, domain);
    expect(matches).toBe(false);
  });

  test('returns true when domain matches case-insensitively', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="https://EXAMPLE.com">Link</a>`;
    const link = document.querySelector('a');
    const url = link.getAttribute('href');
    const domain = 'example.com';
    const matches = matchDomain(url, domain);
    expect(matches).toBe(true);
  });

  test('returns true when domain matches the current host', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="https://example.com">Link</a>`;
    const link = document.querySelector('a');
    const url = link.getAttribute('href');
    const matches = matchDomain(url);
    expect(matches).toBe(true);
  });

  test('returns false when domain is a substring of another domain', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="https://otherexample.com">Link</a>`;
    const link = document.querySelector('a');
    const url = link.getAttribute('href');
    const domain = 'example.com';
    const matches = matchDomain(url, domain);
    expect(matches).toBe(false);
  });
});
