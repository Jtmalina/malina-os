import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Zombies from './Zombies';

describe('Zombies App', () => {
  beforeEach(() => {
    window.IS_VITEST = true;
  });

  afterEach(() => {
    delete window.IS_VITEST;
  });

  it('shows loading screen initially', () => {
    render(<Zombies />);
    expect(screen.getByText(/CITY STREETS/)).toBeInTheDocument();
  });

  it('transitions to main menu when skipLoading is true', () => {
    render(<Zombies skipLoading={true} />);
    expect(screen.getByText('PLAY TRAILER')).toBeInTheDocument();
    expect(screen.getByText('SCREENSHOTS')).toBeInTheDocument();
    expect(screen.getByText('SETTINGS')).toBeInTheDocument();
  });

  it('can navigate to screenshots and back', () => {
    render(<Zombies skipLoading={true} />);

    fireEvent.click(screen.getByText('SCREENSHOTS'));
    expect(screen.getByText('The Main Thoroughfare')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText(/BACK TO MAIN MENU/));
    expect(screen.getByText('PLAY TRAILER')).toBeInTheDocument();
  });

  it('can navigate to settings and back', () => {
    render(<Zombies skipLoading={true} />);

    fireEvent.click(screen.getByText('SETTINGS'));
    expect(screen.getByText('Zombies Settings')).toBeInTheDocument();
    expect(screen.getByText('GORE LEVEL')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/BACK TO MAIN MENU/));
    expect(screen.getByText('PLAY TRAILER')).toBeInTheDocument();
  });

  it('calls onClose when Quit is clicked', () => {
    const onClose = vi.fn();
    render(<Zombies onClose={onClose} skipLoading={true} />);

    fireEvent.click(screen.getByText('QUIT'));
    expect(onClose).toHaveBeenCalled();
  });
});
