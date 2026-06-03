import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ControlPanel from './ControlPanel';

describe('ControlPanel App', () => {
  const defaultProps = {
    currentBgColor: '#008080',
    onColorChange: vi.fn(),
  };

  it('renders the Display tab and sections', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('Display')).toBeInTheDocument();
    expect(screen.getByText('Desktop Background')).toBeInTheDocument();
    expect(screen.getByText('System Info')).toBeInTheDocument();
  });

  it('renders color preset buttons', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('Teal')).toBeInTheDocument();
    expect(screen.getByText('Plum')).toBeInTheDocument();
    expect(screen.getByText('Silver')).toBeInTheDocument();
  });

  it('calls onColorChange when a color preset is clicked', () => {
    render(<ControlPanel {...defaultProps} />);
    fireEvent.click(screen.getByText('Plum'));
    expect(defaultProps.onColorChange).toHaveBeenCalledWith('#800080');
  });

  it('shows bold font for the active color button', () => {
    render(<ControlPanel {...defaultProps} />);
    const tealBtn = screen.getByText('Teal');
    expect(tealBtn.style.fontWeight).toBe('bold');
  });
});
