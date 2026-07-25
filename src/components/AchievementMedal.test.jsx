import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AchievementMedal from './AchievementMedal';

const withPhotoAndBlog = {
  id: 'talento-tech',
  title: 'Hackathon Talento Tech',
  result: '1er lugar',
  status: 'completed',
  team: 'Try-Catch-Mijo',
  description: 'Agente de voz con IA usando Twilio y ElevenLabs.',
  photo: '/images/achievements/talento-tech/foto-ganadores.jpg',
  blogUrl: 'https://example.com/blog',
};

const withCertificate = {
  id: 'colombia-5-0',
  title: 'Hackathon Colombia 5.0',
  result: '2do lugar',
  status: 'completed',
  certificateUrl: '/images/achievements/colombia-5-0/certificado.pdf',
};

const inProgress = {
  id: 'open-data-colombia',
  title: 'Hackathon Open Data Colombia',
  result: 'Resultados pendientes',
  status: 'in-progress',
};

describe('AchievementMedal', () => {
  it('shows the front face by default with title, result and status badge', () => {
    render(<AchievementMedal achievement={withPhotoAndBlog} />);
    expect(screen.getByText('Hackathon Talento Tech')).toBeInTheDocument();
    expect(screen.getByText('1er lugar')).toBeInTheDocument();
    expect(screen.getByText('Completado')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver más sobre/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('flips to reveal the photo and blog link when the front is clicked', () => {
    render(<AchievementMedal achievement={withPhotoAndBlog} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));

    // The front face is now aria-hidden, so it must be queried with { hidden: true }.
    expect(
      screen.getByRole('button', { name: /ver más sobre/i, hidden: true }),
    ).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('img', { name: /equipo ganador/i })).toHaveAttribute(
      'src',
      withPhotoAndBlog.photo,
    );
    expect(screen.getByText(/equipo try-catch-mijo/i)).toBeInTheDocument();
    expect(screen.getByText(withPhotoAndBlog.description)).toBeInTheDocument();
    const blogLink = screen.getByRole('link', { name: /ver blog/i });
    expect(blogLink).toHaveAttribute('href', withPhotoAndBlog.blogUrl);
    expect(blogLink).toHaveAttribute('tabIndex', '0');
  });

  it('opens a full-size lightbox when the photo is clicked, and returns focus to it on close', () => {
    render(<AchievementMedal achievement={withPhotoAndBlog} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));

    const photoButton = screen.getByRole('button', { name: /ampliar foto/i });
    fireEvent.click(photoButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    // Two images now exist: the small thumbnail on the card and the full-size one in the lightbox.
    expect(screen.getAllByRole('img', { name: /equipo ganador/i })).toHaveLength(2);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(photoButton).toHaveFocus();
  });

  it('falls back to a placeholder when the photo fails to load', () => {
    render(<AchievementMedal achievement={withPhotoAndBlog} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));
    fireEvent.error(screen.getByRole('img', { name: /equipo ganador/i }));
    expect(screen.getByTestId('achievement-photo-placeholder')).toBeInTheDocument();
  });

  it('flips back to the front when "Volver" is clicked', () => {
    render(<AchievementMedal achievement={withPhotoAndBlog} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));
    fireEvent.click(screen.getByRole('button', { name: /ocultar detalles/i }));
    expect(screen.getByRole('button', { name: /ver más sobre/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('moves focus to the "Volver" control after flipping, and back to the front button after flipping back', () => {
    render(<AchievementMedal achievement={withPhotoAndBlog} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));

    const volverButton = screen.getByRole('button', { name: /ocultar detalles/i });
    expect(volverButton).toHaveFocus();

    fireEvent.click(volverButton);
    expect(screen.getByRole('button', { name: /ver más sobre/i })).toHaveFocus();
  });

  it('shows the certificate link on the back for an achievement with a certificateUrl', () => {
    render(<AchievementMedal achievement={withCertificate} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));
    expect(screen.getByRole('link', { name: /ver certificado/i })).toHaveAttribute(
      'href',
      withCertificate.certificateUrl,
    );
  });

  it('shows a pending message on the back for an in-progress achievement with no assets yet', () => {
    render(<AchievementMedal achievement={inProgress} />);
    fireEvent.click(screen.getByRole('button', { name: /ver más sobre/i }));
    expect(screen.getByText(/resultados están en camino/i)).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
