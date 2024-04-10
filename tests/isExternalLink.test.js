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
  test('returns true for external links', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="https://external.com">Link</a>`;
    const link = document.querySelector('a');
    const isExternal = isExternalLink(link);
    expect(isExternal).toBe(true);
  });

  test('returns false for internal links', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="/internal">Link</a>`;
    const link = document.querySelector('a');
    const isExternal = isExternalLink(link);
    expect(isExternal).toBe(false);
  });

  test('returns false for links with non-http protocols', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="ftp://external.com">Link</a>`;
    const link = document.querySelector('a');
    const isExternal = isExternalLink(link);
    expect(isExternal).toBe(false);
  });

  test('returns false for links with the same hostname as the current location', () => {
    const currentDomain = window.location.hostname;
    document.body.innerHTML = `<!DOCTYPE html><a href="https://${currentDomain}">Link</a>`;
    const link = document.querySelector('a');
    const isExternal = isExternalLink(link);
    expect(isExternal).toBe(false);
  });

  test('returns false for links with an empty hostname', () => {
    document.body.innerHTML = `<!DOCTYPE html><a href="">Link</a>`;
    const link = document.querySelector('a');
    const isExternal = isExternalLink(link);
    expect(isExternal).toBe(false);
  });
});
