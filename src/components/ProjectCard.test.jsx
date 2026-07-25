import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectCard from './ProjectCard';

const projectWithBothLinks = {
  id: 'agroinsumos',
  title: 'Agroinsumos',
  description: 'Plataforma de insumos agrícolas.',
  stack: ['React', 'Node.js'],
  repoUrl: 'https://github.com/tu-usuario/agroinsumos',
  demoUrl: 'https://demo.example.com',
  image: '/images/projects/agroinsumos/01-dashboard.png',
};

const projectWithRepoOnly = {
  id: 'envios-angular',
  title: 'App de envíos',
  description: 'App de seguimiento de envíos.',
  stack: ['Angular'],
  repoUrl: 'https://github.com/tu-usuario/envios-angular',
  demoUrl: null,
  image: null,
};

const projectWithDemoOnly = {
  id: 'proyecto-privado',
  title: 'Proyecto con repo privado',
  description: 'Proyecto con código fuente privado.',
  stack: ['React'],
  repoUrl: null,
  demoUrl: 'https://demo-privado.example.com',
  image: null,
};

describe('ProjectCard', () => {
  it('renders the image, repo link and demo link when all are provided', () => {
    render(<ProjectCard project={projectWithBothLinks} />);
    expect(screen.getByRole('img', { name: /captura del proyecto agroinsumos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /repositorio/i })).toHaveAttribute(
      'href',
      projectWithBothLinks.repoUrl,
    );
    expect(screen.getByRole('link', { name: /demo en vivo/i })).toHaveAttribute(
      'href',
      projectWithBothLinks.demoUrl,
    );
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument();
  });

  it('renders a placeholder and no demo link when image/demoUrl are missing', () => {
    render(<ProjectCard project={projectWithRepoOnly} />);
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /demo en vivo/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /repositorio/i })).toHaveAttribute(
      'href',
      projectWithRepoOnly.repoUrl,
    );
  });

  it('hides the repository link when repoUrl is null (private repo)', () => {
    render(<ProjectCard project={projectWithDemoOnly} />);
    expect(screen.queryByRole('link', { name: /repositorio/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /demo en vivo/i })).toHaveAttribute(
      'href',
      projectWithDemoOnly.demoUrl,
    );
  });
});
