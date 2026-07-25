import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from './About';

describe('About', () => {
  it('renders inside a section with id "sobre-mi"', () => {
    const { container } = render(<About />);
    expect(container.querySelector('section#sobre-mi')).not.toBeNull();
  });

  it('renders the "Sobre mí" heading and a non-empty bio paragraph', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument();
    expect(screen.getByTestId('bio-text').textContent.length).toBeGreaterThan(0);
  });
});
