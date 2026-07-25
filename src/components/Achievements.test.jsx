import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Achievements from './Achievements';
import { achievements } from '../data/achievements';

describe('Achievements', () => {
  it('renders inside a section with id "logros"', () => {
    const { container } = render(<Achievements />);
    expect(container.querySelector('section#logros')).not.toBeNull();
  });

  it('renders a medal with the title of every achievement', () => {
    render(<Achievements />);
    achievements.forEach((achievement) => {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
    });
  });

  it('renders "En curso" on the front of the Open Data Colombia medal', () => {
    render(<Achievements />);
    const medal = screen.getByTestId('achievement-medal-open-data-colombia');
    expect(within(medal).getByText('En curso')).toBeInTheDocument();
  });

  it('renders "Completado" on the front of the two finished hackathon medals', () => {
    render(<Achievements />);
    const talentoTech = screen.getByTestId('achievement-medal-talento-tech');
    const colombia50 = screen.getByTestId('achievement-medal-colombia-5-0');
    expect(within(talentoTech).getByText('Completado')).toBeInTheDocument();
    expect(within(colombia50).getByText('Completado')).toBeInTheDocument();
  });
});
