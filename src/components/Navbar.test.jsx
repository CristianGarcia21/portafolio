import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders a link for every section', () => {
    render(<Navbar />);
    ['Inicio', 'Sobre mí', 'Skills', 'Proyectos', 'Logros', 'Contacto'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    });
  });

  it('hides the mobile menu by default', () => {
    render(<Navbar />);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('opens the mobile menu when the toggle button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: /abrir menú/i }));
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('closes the mobile menu after clicking a link inside it', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole('button', { name: /abrir menú/i }));
    const mobileMenu = screen.getByTestId('mobile-menu');
    await user.click(within(mobileMenu).getByRole('link', { name: 'Inicio' }));
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('updates aria-expanded and aria-label when the menu opens', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggleButton = screen.getByRole('button', { name: /abrir menú/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(toggleButton).toHaveAttribute('aria-label', 'Cerrar menú');
  });
});
