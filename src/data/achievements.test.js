import { describe, expect, it } from 'vitest';
import { achievements } from './achievements';

const VALID_STATUSES = ['completed', 'in-progress'];

describe('achievements data', () => {
  it('exports exactly 3 achievements', () => {
    expect(achievements).toHaveLength(3);
  });

  it('each achievement has a valid status', () => {
    achievements.forEach((achievement) => {
      expect(VALID_STATUSES).toContain(achievement.status);
    });
  });

  it('includes the Open Data Colombia hackathon as in-progress', () => {
    const openData = achievements.find((a) => a.id === 'open-data-colombia');
    expect(openData).toBeDefined();
    expect(openData.status).toBe('in-progress');
  });
});
