/**
 * getFileExtension Tests
 *
 * @see {@link ../setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run coverage
 */

import { test, expect, describe, beforeEach } from 'vitest';
import { getFileExtension } from '../lib/external-links.js';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('getFileExtension Function', () => {
  test('returns the correct file extension', () => {
    const url = new URL('https://example.com/document.pdf');
    const extension = getFileExtension(url);
    expect(extension).toBe('pdf');
  });

  test('returns the correct file extension when URL has parameters', () => {
    const url = new URL('https://example.com/test.pdf?param=value');
    const extension = getFileExtension(url);
    expect(extension).toBe('pdf');
  });

  test('returns an empty string when URL has no file extension', () => {
    const url = new URL('https://example.com/document');
    const extension = getFileExtension(url);
    expect(extension).toBe('');
  });

  test('returns the correct file extension when URL has a fragment identifier', () => {
    const url = new URL('https://example.com/document.pdf#page=2');
    const extension = getFileExtension(url);
    expect(extension).toBe('pdf');
  });

  test('returns the correct file extension when URL has multiple query parameters', () => {
    const url = new URL(
      'https://example.com/document.pdf?param1=value1&param2=value2'
    );
    const extension = getFileExtension(url);
    expect(extension).toBe('pdf');
  });

  test('returns the correct file extension when URL has a query parameter with a period', () => {
    const url = new URL(
      'https://example.com/document.pdf?param=value.with.period'
    );
    const extension = getFileExtension(url);
    expect(extension).toBe('pdf');
  });
});
