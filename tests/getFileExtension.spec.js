/**
 * getFileExtension Tests
 *
 * @see {@link ../src/setup.js} for test configuration
 *
 * @example
 * To run tests: npm run test
 * To generate coverage: npm run test:coverage
 */

import { it, expect, describe, beforeEach } from 'vitest';
import { getFileExtension } from '../lib/external-links.js';

describe('getFileExtension Function', () => {
  const setupTest = (href) => {
    const extension = getFileExtension(href);
    return extension;
  };

  it('returns the correct file extension', () => {
    const extension = setupTest('https://example.com/document.pdf');
    expect(extension).toBe('pdf');
  });

  it('returns the correct file extension when URL has parameters', () => {
    const extension = setupTest('https://example.com/test.pdf?param=value');
    expect(extension).toBe('pdf');
  });

  it('returns an empty string when URL has no file extension', () => {
    const extension = setupTest('https://example.com/document');
    expect(extension).toBe('');
  });

  it('returns the correct file extension when URL has a fragment identifier', () => {
    const extension = setupTest('https://example.com/document.pdf#page=2');
    expect(extension).toBe('pdf');
  });

  it('returns the correct file extension when URL has multiple query parameters', () => {
    const extension = setupTest(
      'https://example.com/document.pdf?param1=value1&param2=value2'
    );
    expect(extension).toBe('pdf');
  });

  it('returns the correct file extension when URL has a query parameter with a period', () => {
    const extension = setupTest(
      'https://example.com/document.pdf?param=value.with.period'
    );
    expect(extension).toBe('pdf');
  });
});
