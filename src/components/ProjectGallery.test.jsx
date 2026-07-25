import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectGallery from './ProjectGallery';

describe('ProjectGallery', () => {
  it('renders the placeholder when there is no image or images', () => {
    render(<ProjectGallery title="Proyecto" image={null} images={undefined} />);
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
  });

  it('renders a single image (legacy "image" prop) with no navigation controls', () => {
    render(<ProjectGallery title="Agroinsumos" image="/images/agroinsumos/01.png" images={undefined} />);
    expect(screen.getByRole('img', { name: /captura del proyecto agroinsumos/i })).toHaveAttribute(
      'src',
      '/images/agroinsumos/01.png',
    );
    expect(screen.queryByRole('button', { name: /imagen anterior/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /imagen siguiente/i })).not.toBeInTheDocument();
  });

  it('falls back to the placeholder when the single image fails to load', () => {
    render(<ProjectGallery title="Agroinsumos" image="/broken.png" images={undefined} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
  });

  const images = ['/one.png', '/two.png', '/three.png'];

  it('renders navigation controls and cycles forward through multiple images', () => {
    render(<ProjectGallery title="Extensión" image={null} images={images} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/one.png');

    fireEvent.click(screen.getByRole('button', { name: /imagen siguiente/i }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/two.png');

    fireEvent.click(screen.getByRole('button', { name: /imagen siguiente/i }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/three.png');

    // wraps back to the first image
    fireEvent.click(screen.getByRole('button', { name: /imagen siguiente/i }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/one.png');
  });

  it('cycles backward and wraps to the last image', () => {
    render(<ProjectGallery title="Extensión" image={null} images={images} />);
    fireEvent.click(screen.getByRole('button', { name: /imagen anterior/i }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/three.png');
  });

  it('jumps directly to an image via its dot indicator', () => {
    render(<ProjectGallery title="Extensión" image={null} images={images} />);
    fireEvent.click(screen.getByRole('button', { name: /ir a imagen 3/i }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/three.png');
    expect(screen.getByRole('button', { name: /ir a imagen 3/i })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByRole('button', { name: /ir a imagen 1/i })).toHaveAttribute('aria-current', 'false');
  });

  it('falls back to the placeholder only for the slide that failed, not the whole gallery', () => {
    render(<ProjectGallery title="Extensión" image={null} images={images} />);
    fireEvent.error(screen.getByRole('img')); // first slide fails
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /imagen siguiente/i }));
    expect(screen.getByRole('img')).toHaveAttribute('src', '/two.png');
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument();
  });
});
