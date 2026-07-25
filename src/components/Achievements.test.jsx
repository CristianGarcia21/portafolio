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
    const card = screen.getByTestId('achievement-node-open-data-colombia');
    expect(within(card).getByText('En curso')).toBeInTheDocument();
  });

  it('renders "Completado" for the two finished hackathons', () => {
    render(<Achievements />);
    const talentoTech = screen.getByTestId('achievement-node-talento-tech');
    const colombia50 = screen.getByTestId('achievement-node-colombia-5-0');
    expect(within(talentoTech).getByText('Completado')).toBeInTheDocument();
    expect(within(colombia50).getByText('Completado')).toBeInTheDocument();
  });
});
