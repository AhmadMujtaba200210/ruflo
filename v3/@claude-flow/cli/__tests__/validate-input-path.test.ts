/**
 * Regression test for path traversal validation in validatePath.
 */

import { describe, it, expect } from 'vitest';
import { validatePath } from '../src/mcp-tools/validate-input.js';

describe('validatePath traversal checks', () => {
  it('accepts normal paths', () => {
    expect(validatePath('foo/bar', 'path').valid).toBe(true);
    expect(validatePath('C:\\temp\\file', 'path').valid).toBe(true);
    expect(validatePath('foo..bar', 'path').valid).toBe(true);
  });

  it('rejects .. path segments', () => {
    const cases = [
      '..',
      '../secret',
      '../../secret',
      '..\\secret',
      'foo/..',
      'foo/bar/..',
      'foo/../bar',
      'foo\\..\\bar',
    ];

    for (const value of cases) {
      const result = validatePath(value, 'path');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('path traversal');
    }
  });
});
