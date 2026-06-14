import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DreadTide from './DreadTide';

describe('DreadTide App', () => {
  it('renders the game landing page', () => {
    render(<DreadTide />);
    expect(screen.getByText('DREAD TIDE')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /play now/i })).toBeInTheDocument();
  });

  it('links to the live game in a new tab', () => {
    render(<DreadTide />);
    const link = screen.getByRole('link', { name: /play now/i });
    expect(link).toHaveAttribute('href', 'https://dread-tide.vercel.app/game.html');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
