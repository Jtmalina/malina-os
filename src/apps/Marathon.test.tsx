import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Marathon from './Marathon';

describe('Marathon App', () => {
  beforeEach(() => {
    window.IS_VITEST = true;
  });

  afterEach(() => {
    delete window.IS_VITEST;
  });

  it('shows loading screen initially', () => {
    render(<Marathon />);
    expect(screen.getByText('MARATHON')).toBeInTheDocument();
  });

  it('transitions to main menu when skipLoading is true', () => {
    render(<Marathon skipLoading={true} />);
    expect(screen.getByText('PLAY')).toBeInTheDocument();
    expect(screen.getByText('OPTIONS')).toBeInTheDocument();
    expect(screen.getByText('CREDITS')).toBeInTheDocument();
  });

  it('can navigate to options and back', () => {
    render(<Marathon skipLoading={true} />);

    fireEvent.click(screen.getByText('OPTIONS'));
    expect(screen.getByText('GAME OPTIONS')).toBeInTheDocument();
    expect(screen.getByText('EXISTENTIAL DREAD')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/RETURN TO MAIN MENU/));
    expect(screen.getByText('PLAY')).toBeInTheDocument();
  });

  it('calls onLaunch for media player when Play is clicked', () => {
    const onLaunch = vi.fn();
    render(<Marathon onLaunch={onLaunch} skipLoading={true} />);

    fireEvent.click(screen.getByText('PLAY'));
    expect(onLaunch).toHaveBeenCalledWith('media-player');
  });

  it('calls onClose when Quit is clicked', () => {
    const onClose = vi.fn();
    render(<Marathon onClose={onClose} skipLoading={true} />);

    fireEvent.click(screen.getByText('QUIT'));
    expect(onClose).toHaveBeenCalled();
  });
});
