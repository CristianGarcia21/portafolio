import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Achievements from './Achievements';
import { achievements } from '../data/achievements';

describe('Achievements', () => {
  it('renders inside a section with id "logros"', () => {
    const { container } = render(<Achievements />);
    expect(container.querySelector('section#logros')).not.toBeNull();
  });

  it('renders the title of every achievement', () => {
    render(<Achievements />);
    achievements.forEach((achievement) => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
  });

  it('renders "En curso" for the Open Data Colombia hackathon', () => {
    render(<Achievements />);
    const openDataTitle = screen.getByText('Hackathon Open Data Colombia');
    const card = openDataTitle.closest('li');
    expect(within(card).getByText('En curso')).toBeInTheDocument();
  });
});
