import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Contact from './Contact';
import { contact } from '../data/contact';

describe('Contact', () => {
  it('renders inside a section with id "contacto"', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('section#contacto')).not.toBeNull();
  });

  it('renders links to email, LinkedIn and GitHub from the contact data', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`,
    );
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', contact.linkedin);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', contact.github);
  });
});
