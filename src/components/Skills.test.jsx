import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Skills from './Skills';
import { skills } from '../data/skills';

describe('Skills', () => {
  it('renders inside a section with id "skills"', () => {
    const { container } = render(<Skills />);
    expect(container.querySelector('section#skills')).not.toBeNull();
  });

  it('renders every skill name once in the accessible list', () => {
    render(<Skills />);
    const list = screen.getByTestId('skills-list');
    skills.forEach((skill) => {
      expect(within(list).getByText(skill.name)).toBeInTheDocument();
    });
  });

  it('renders each skill at least twice in the decorative marquee (duplicated for the loop)', () => {
    render(<Skills />);
    skills.forEach((skill) => {
      expect(screen.getAllByText(skill.name).length).toBeGreaterThanOrEqual(2);
    });
  });

  it('marks the decorative marquee as aria-hidden so it is not read twice by screen readers', () => {
    const { container } = render(<Skills />);
    const marquee = container.querySelector('[aria-hidden="true"]');
    expect(marquee).not.toBeNull();
  });
});
