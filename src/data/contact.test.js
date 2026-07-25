import { describe, expect, it } from 'vitest';
import { contact } from './contact';

describe('contact data', () => {
  it('has an email containing "@"', () => {
    expect(contact.email).toContain('@');
  });

  it('has https URLs for linkedin and github', () => {
    expect(contact.linkedin.startsWith('https://')).toBe(true);
    expect(contact.github.startsWith('https://')).toBe(true);
  });
});
