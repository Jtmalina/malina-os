import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dialog from './Dialog';

describe('Dialog Component', () => {
  const defaultProps = {
    title: 'System Message',
    message: "You're already inside it",
    onOk: vi.fn(),
  };

  it('renders title and message correctly', () => {
    render(<Dialog {...defaultProps} />);
    expect(screen.getByText('System Message')).toBeInTheDocument();
    expect(screen.getByText("You're already inside it")).toBeInTheDocument();
  });

  it('calls onOk when OK button is clicked', () => {
    render(<Dialog {...defaultProps} />);
    fireEvent.click(screen.getByText('OK'));
    expect(defaultProps.onOk).toHaveBeenCalled();
  });

  it('calls onOk when close button is clicked', () => {
    render(<Dialog {...defaultProps} />);
    fireEvent.click(screen.getByText('X'));
    expect(defaultProps.onOk).toHaveBeenCalled();
  });
});
