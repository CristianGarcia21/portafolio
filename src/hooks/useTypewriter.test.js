import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTypewriter } from './useTypewriter';

function mockMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe('useTypewriter', () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    window.matchMedia = originalMatchMedia;
  });

  it('renders the full text immediately when reduced motion is preferred', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useTypewriter('Hi'));
    expect(result.current).toBe('Hi');
  });

  it('starts empty and types one character at a time', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTypewriter('Hi'));
    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(110);
    });
    expect(result.current).toBe('H');

    act(() => {
      vi.advanceTimersByTime(110);
    });
    expect(result.current).toBe('Hi');
  });

  it('deletes back to empty after pausing on the full text, then types again (loops)', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useTypewriter('Hi'));

    // Type "Hi"
    act(() => {
      vi.advanceTimersByTime(110 * 2);
    });
    expect(result.current).toBe('Hi');

    // Pause on the full word
    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(result.current).toBe('Hi');

    // Delete both characters
    act(() => {
      vi.advanceTimersByTime(55 * 2);
    });
    expect(result.current).toBe('');

    // Pause on empty, then start typing again
    act(() => {
      vi.advanceTimersByTime(500);
      vi.advanceTimersByTime(110);
    });
    expect(result.current).toBe('H');
  });
});
