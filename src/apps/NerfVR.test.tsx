import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NerfVR from './NerfVR';

describe('NerfVR App', () => {
  beforeEach(() => {
    window.IS_VITEST = true;
  });

  afterEach(() => {
    delete window.IS_VITEST;
  });

  it('shows loading screen initially', () => {
    render(<NerfVR />);
    expect(screen.getByText('NERF VR')).toBeInTheDocument();
  });

  it('transitions to main menu when skipLoading is true', () => {
    render(<NerfVR skipLoading={true} />);
    expect(screen.getByText('PLAY TRAILER')).toBeInTheDocument();
    expect(screen.getByText('ABOUT PROJECT')).toBeInTheDocument();
  });

  it('can navigate to mission briefing and back', () => {
    render(<NerfVR skipLoading={true} />);

    fireEvent.click(screen.getByText('ABOUT PROJECT'));
    expect(screen.getByText('MISSION BRIEFING')).toBeInTheDocument();
    expect(screen.getByText(/MY CONTRIBUTION/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/RETURN TO BASE/));
    expect(screen.getByText('PLAY TRAILER')).toBeInTheDocument();
  });

  it('calls onClose when Quit is clicked', () => {
    const onClose = vi.fn();
    render(<NerfVR onClose={onClose} skipLoading={true} />);

    fireEvent.click(screen.getByText('QUIT'));
    expect(onClose).toHaveBeenCalled();
  });
});
