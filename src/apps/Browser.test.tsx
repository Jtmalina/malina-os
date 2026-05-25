import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Browser from './Browser';

describe('Browser App', () => {
  it('renders the home page by default', () => {
    render(<Browser />);
    expect(screen.getByText('Malina Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search the web...')).toBeInTheDocument();
  });

  it('navigates when address is entered', () => {
    render(<Browser />);
    const addressInput = screen.getByDisplayValue('malina://home');
    fireEvent.change(addressInput, { target: { value: 'google.com' } });
    fireEvent.keyDown(addressInput, { key: 'Enter' });
    
    expect(screen.getByDisplayValue('https://google.com')).toBeInTheDocument();
  });

  it('shows error state for external blocked sites', () => {
    render(<Browser />);
    const addressInput = screen.getByDisplayValue('malina://home');
    fireEvent.change(addressInput, { target: { value: 'bungie.net' } });
    fireEvent.keyDown(addressInput, { key: 'Enter' });
    
    expect(screen.getByText('Navigation Blocked')).toBeInTheDocument();
  });

  it('returns to home when home button is clicked', () => {
    render(<Browser />);
    // Navigate away
    const addressInput = screen.getByDisplayValue('malina://home');
    fireEvent.change(addressInput, { target: { value: 'google.com' } });
    fireEvent.keyDown(addressInput, { key: 'Enter' });
    
    // Click home
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText('Malina Search')).toBeInTheDocument();
  });
});
