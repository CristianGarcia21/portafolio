import { describe, expect, it } from 'vitest';
import { getStatusBadge } from './achievementStatus';

describe('getStatusBadge', () => {
  it('returns a completed badge for status "completed"', () => {
    expect(getStatusBadge('completed')).toEqual({
      label: 'Completado',
      className: 'bg-emerald-500/20 text-emerald-400',
    });
  });

  it('returns an in-progress badge for status "in-progress"', () => {
    expect(getStatusBadge('in-progress')).toEqual({
      label: 'En curso',
      className: 'bg-amber-500/20 text-amber-400',
    });
  });

  it('throws for an unknown status', () => {
    expect(() => getStatusBadge('unknown')).toThrow('Unknown achievement status: unknown');
  });
});
