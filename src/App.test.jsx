import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders all six sections in order', () => {
    const { container } = render(<App />);
    const sectionIds = Array.from(container.querySelectorAll('section')).map((el) => el.id);
    expect(sectionIds).toEqual(['inicio', 'sobre-mi', 'skills', 'proyectos', 'logros', 'contacto']);
  });

  it('renders the navbar', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'CG' })).toBeInTheDocument();
  });
});
