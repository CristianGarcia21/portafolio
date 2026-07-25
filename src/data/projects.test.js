import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
  it('exports exactly 2 projects', () => {
    expect(projects).toHaveLength(2);
  });

  it('each project has the required fields and at least one link (repo or demo)', () => {
    projects.forEach((project) => {
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.stack)).toBe(true);
      expect(project.repoUrl === null || typeof project.repoUrl === 'string').toBe(true);
      expect(project.demoUrl === null || typeof project.demoUrl === 'string').toBe(true);
      expect(project.repoUrl !== null || project.demoUrl !== null).toBe(true);
    });
  });

  it('the envios-angular project has a repo URL but no demo URL or image yet', () => {
    const envios = projects.find((p) => p.id === 'envios-angular');
    expect(envios).toBeDefined();
    expect(typeof envios.repoUrl).toBe('string');
    expect(envios.demoUrl).toBeNull();
    expect(envios.image).toBeNull();
  });

  it('the agroinsumos project has a demo URL and an image but no public repo (private repo)', () => {
    const agroinsumos = projects.find((p) => p.id === 'agroinsumos');
    expect(agroinsumos).toBeDefined();
    expect(typeof agroinsumos.demoUrl).toBe('string');
    expect(typeof agroinsumos.image).toBe('string');
    expect(agroinsumos.repoUrl).toBeNull();
  });
});
