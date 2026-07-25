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

  it('the talento-tech achievement has a team, a photo, a description and a blog link', () => {
    const talentoTech = achievements.find((a) => a.id === 'talento-tech');
    expect(talentoTech).toBeDefined();
    expect(talentoTech.team).toBe('Try-Catch-Mijo');
    expect(typeof talentoTech.photo).toBe('string');
    expect(talentoTech.description.length).toBeGreaterThan(0);
    expect(talentoTech.blogUrl.startsWith('https://')).toBe(true);
  });

  it('the colombia-5-0 achievement has a description and a certificate PDF path', () => {
    const colombia50 = achievements.find((a) => a.id === 'colombia-5-0');
    expect(colombia50).toBeDefined();
    expect(colombia50.description.length).toBeGreaterThan(0);
    expect(colombia50.certificateUrl.endsWith('.pdf')).toBe(true);
  });
});
