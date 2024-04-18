/**
 * getFileExtension Tests
 *
 * @see {@link ../src/setup.js} for test configuration
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
  const setupTest = (urlString) => {
    const url = new URL(urlString);
    const extension = getFileExtension(url);
    return extension;
  };

  test('returns the correct file extension', () => {
    const extension = setupTest('https://example.com/document.pdf');
    expect(extension).toBe('pdf');
  });

  test('returns the correct file extension when URL has parameters', () => {
    const extension = setupTest('https://example.com/test.pdf?param=value');
    expect(extension).toBe('pdf');
  });

  test('returns an empty string when URL has no file extension', () => {
    const extension = setupTest('https://example.com/document');
    expect(extension).toBe('');
  });

  test('returns the correct file extension when URL has a fragment identifier', () => {
    const extension = setupTest('https://example.com/document.pdf#page=2');
    expect(extension).toBe('pdf');
  });

  test('returns the correct file extension when URL has multiple query parameters', () => {
    const extension = setupTest(
      'https://example.com/document.pdf?param1=value1&param2=value2'
    );
    expect(extension).toBe('pdf');
  });

  test('returns the correct file extension when URL has a query parameter with a period', () => {
    const extension = setupTest(
      'https://example.com/document.pdf?param=value.with.period'
    );
    expect(extension).toBe('pdf');
  });
});
