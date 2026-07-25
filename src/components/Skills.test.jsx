import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Skills from './Skills';
import { skills } from '../data/skills';

describe('Skills', () => {
  it('renders inside a section with id "skills"', () => {
    const { container } = render(<Skills />);
    expect(container.querySelector('section#skills')).not.toBeNull();
  });

  it('renders every skill name from the data module', () => {
    render(<Skills />);
    skills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });
});
