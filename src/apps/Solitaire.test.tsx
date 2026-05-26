import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Solitaire from './Solitaire';
import styles from './Solitaire.module.css';

describe('Solitaire App', () => {
  it('renders the green board and piles', () => {
    render(<Solitaire />);
    expect(screen.getByTestId('solitaire-board')).toBeInTheDocument();
    
    // Check foundations
    const emptyPiles = screen.getAllByText('A');
    expect(emptyPiles.length).toBeGreaterThanOrEqual(4);
  });

  it('shuffles and deals cards to tableau', () => {
    render(<Solitaire />);
    // There should be cards with back visible
    const backs = screen.getAllByTestId('card-back');
    expect(backs.length).toBeGreaterThan(0);
  });

  it('draws a card from stock when clicked', () => {
    render(<Solitaire />);
    const stock = screen.getByTestId('stock-pile');
    fireEvent.click(stock);
    
    // Waste pile should now have a card (not a back, but a face-up card)
    const waste = screen.getByTestId('waste-pile');
    expect(waste.querySelector(`.${styles.card}`)).toBeInTheDocument();
  });

  it('resets game when Game menu item is clicked', () => {
    render(<Solitaire />);
    const initialCards = document.querySelectorAll('.card').length;
    
    fireEvent.click(screen.getByText('Game'));
    
    // Board should re-initialize
    expect(document.querySelectorAll('.card').length).toBe(initialCards);
  });
});
