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

  it('every nav link href matches a rendered section id', () => {
    const { container } = render(<App />);
    const sectionIds = new Set(
      Array.from(container.querySelectorAll('section')).map((el) => `#${el.id}`),
    );
    const navHrefs = Array.from(container.querySelectorAll('header a[href^="#"]')).map(
      (a) => a.getAttribute('href'),
    );
    expect(navHrefs.length).toBeGreaterThan(0);
    navHrefs.forEach((href) => {
      expect(sectionIds.has(href)).toBe(true);
    });
  });
});
