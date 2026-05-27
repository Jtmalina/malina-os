import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MediaPlayer from './MediaPlayer';

describe('MediaPlayer App', () => {
  it('renders correctly with video iframe', () => {
    render(<MediaPlayer />);
    expect(screen.getByTitle(/Trailer/i)).toBeInTheDocument();
  });

  it('contains an iframe for the video', () => {
    render(<MediaPlayer />);
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe?.src).toContain('youtube.com');
  });

  it('renders playback controls', () => {
    render(<MediaPlayer />);
    expect(screen.getByText('▶')).toBeInTheDocument();
    expect(screen.getByText('⏸')).toBeInTheDocument();
  });
});
