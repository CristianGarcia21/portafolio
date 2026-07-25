import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PhotoLightbox from './PhotoLightbox';

describe('PhotoLightbox', () => {
  it('renders the full image in a dialog and focuses the close button', () => {
    render(<PhotoLightbox src="/photo.jpg" alt="Foto de prueba" onClose={() => {}} />);
    const dialog = screen.getByRole('dialog', { name: 'Foto de prueba' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Foto de prueba' })).toHaveAttribute('src', '/photo.jpg');
    expect(screen.getByRole('button', { name: /cerrar imagen/i })).toHaveFocus();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<PhotoLightbox src="/photo.jpg" alt="Foto de prueba" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /cerrar imagen/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<PhotoLightbox src="/photo.jpg" alt="Foto de prueba" onClose={onClose} />);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when the image itself is clicked', () => {
    const onClose = vi.fn();
    render(<PhotoLightbox src="/photo.jpg" alt="Foto de prueba" onClose={onClose} />);
    fireEvent.click(screen.getByRole('img'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when the Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<PhotoLightbox src="/photo.jpg" alt="Foto de prueba" onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
