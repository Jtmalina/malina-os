import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ShutdownScreen from './ShutdownScreen';

describe('ShutdownScreen Component', () => {
  it('renders the safe message', () => {
    render(<ShutdownScreen />);
    expect(screen.getByText(/safe to turn off/i)).toBeInTheDocument();
  });

  it('reloads the page when clicked', () => {
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {});
    render(<ShutdownScreen />);
    
    fireEvent.click(screen.getByText(/safe to turn off/i).parentElement!);
    expect(reloadSpy).toHaveBeenCalled();
    reloadSpy.mockRestore();
  });
});
