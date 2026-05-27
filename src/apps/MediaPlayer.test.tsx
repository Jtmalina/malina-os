import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MediaPlayer from './MediaPlayer';

describe('MediaPlayer App', () => {
  it('renders the placeholder when no video is loaded', () => {
    render(<MediaPlayer />);
    expect(screen.getByText(/SELECT A FILE TO PLAY/i)).toBeInTheDocument();
  });

  it('renders correctly with video iframe when URL is provided', () => {
    render(<MediaPlayer videoUrl="https://www.youtube.com/embed/test" title="Test Video" />);
    expect(screen.getByTitle(/Test Video/i)).toBeInTheDocument();
  });

  it('contains an iframe for the video when URL is provided', () => {
    render(<MediaPlayer videoUrl="https://www.youtube.com/embed/test" />);
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
