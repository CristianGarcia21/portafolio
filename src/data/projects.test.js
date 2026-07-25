import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('projects data', () => {
  it('exports exactly 3 projects', () => {
    expect(projects).toHaveLength(3);
  });

  it('each project has the required fields and at least one way to engage (link or note)', () => {
    projects.forEach((project) => {
      expect(typeof project.title).toBe('string');
      expect(typeof project.description).toBe('string');
      expect(Array.isArray(project.stack)).toBe(true);
      expect(project.repoUrl === null || typeof project.repoUrl === 'string').toBe(true);
      expect(project.demoUrl === null || typeof project.demoUrl === 'string').toBe(true);
      const hasLink = project.repoUrl !== null || project.demoUrl !== null;
      const hasNote = typeof project.note === 'string' && project.note.length > 0;
      expect(hasLink || hasNote).toBe(true);
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

  it('the pattern-design-detector project has no links but has an explanatory note', () => {
    const detector = projects.find((p) => p.id === 'pattern-design-detector');
    expect(detector).toBeDefined();
    expect(detector.repoUrl).toBeNull();
    expect(detector.demoUrl).toBeNull();
    expect(typeof detector.note).toBe('string');
    expect(detector.note.length).toBeGreaterThan(0);
  });

  it('the pattern-design-detector project has 3 mockup image paths', () => {
    const detector = projects.find((p) => p.id === 'pattern-design-detector');
    expect(detector).toBeDefined();
    expect(Array.isArray(detector.images)).toBe(true);
    expect(detector.images).toHaveLength(3);
    detector.images.forEach((path) => {
      expect(typeof path).toBe('string');
      expect(path.startsWith('/images/projects/pattern-design-detector/')).toBe(true);
    });
  });
});
