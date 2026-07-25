import { describe, expect, it } from 'vitest';
import { skills } from './skills';

describe('skills data', () => {
  it('exports a non-empty array', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('each skill has a non-empty name and an icon component', () => {
    skills.forEach((skill) => {
      expect(typeof skill.name).toBe('string');
      expect(skill.name.length).toBeGreaterThan(0);
      expect(typeof skill.icon).toBe('function');
    });
  });
});
