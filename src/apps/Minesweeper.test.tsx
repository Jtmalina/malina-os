import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Minesweeper from './Minesweeper';

describe('Minesweeper App', () => {
  it('renders with beginner difficulty by default', () => {
    render(<Minesweeper />);
    // Beginner is 9x9 = 81 cells
    const cells = screen.getAllByRole('generic').filter(el => el.className.includes('cell'));
    expect(cells.length).toBe(81);
    // Mines counter should show 010
    expect(screen.getByText('010')).toBeInTheDocument();
  });

  it('changes difficulty to Expert via menu', () => {
    render(<Minesweeper />);
    
    // Open menu
    fireEvent.click(screen.getByText('Game'));
    
    // Select Expert
    fireEvent.click(screen.getByText('Expert'));
    
    // Expert is 16x30 = 480 cells
    const cells = screen.getAllByRole('generic').filter(el => el.className.includes('cell'));
    expect(cells.length).toBe(480);
    
    // Mines counter should show 099
    expect(screen.getByText('099')).toBeInTheDocument();
  });

  it('resets timer on new game', () => {
    render(<Minesweeper />);
    // Initially 000
    expect(screen.getByText('000')).toBeInTheDocument();
  });
});
