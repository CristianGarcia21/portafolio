import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';
import { projects } from '../data/projects';

describe('Projects', () => {
  it('renders inside a section with id "proyectos"', () => {
    const { container } = render(<Projects />);
    expect(container.querySelector('section#proyectos')).not.toBeNull();
  });

  it('renders a card for every project', () => {
    render(<Projects />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('renders exactly one repo link, one demo link, and one image placeholder for the real project data', () => {
    render(<Projects />);
    expect(screen.getAllByRole('link', { name: /repositorio/i })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /demo en vivo/i })).toHaveLength(1);
    expect(screen.getAllByTestId('image-placeholder')).toHaveLength(1);
  });
});
