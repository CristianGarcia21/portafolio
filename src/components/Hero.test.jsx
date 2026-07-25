import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('renders inside a section with id "inicio"', () => {
    const { container } = render(<Hero />);
    expect(container.querySelector('section#inicio')).not.toBeNull();
  });

  it('renders the name and role', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: /cristian garcía/i })).toBeInTheDocument();
    expect(screen.getByText(/frontend developer/i)).toBeInTheDocument();
  });

  it('renders CTA links to projects and contact', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /ver proyectos/i })).toHaveAttribute('href', '#proyectos');
    expect(screen.getByRole('link', { name: /^contacto$/i })).toHaveAttribute('href', '#contacto');
  });

  it('renders the profile photo', () => {
    render(<Hero />);
    expect(screen.getByRole('img', { name: /foto de perfil/i })).toHaveAttribute(
      'src',
      '/images/profile/profile.jpg',
    );
  });

  it('hides the profile photo if it fails to load, without breaking the rest of the Hero', () => {
    render(<Hero />);
    fireEvent.error(screen.getByRole('img', { name: /foto de perfil/i }));
    expect(screen.queryByRole('img', { name: /foto de perfil/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /cristian garcía/i })).toBeInTheDocument();
  });
});
