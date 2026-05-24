import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Window from './Window';

describe('Window Component', () => {
  const defaultProps = {
    id: 'test-window',
    title: 'Test Window',
    children: <div>Content</div>,
    onClose: vi.fn(),
    onFocus: vi.fn(),
  };

  it('renders correctly with title and content', () => {
    render(<Window {...defaultProps} />);
    expect(screen.getByText('Test Window')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onFocus when clicked', () => {
    render(<Window {...defaultProps} />);
    fireEvent.mouseDown(screen.getByText('Test Window'));
    expect(defaultProps.onFocus).toHaveBeenCalledWith('test-window');
  });

  it('calls onClose when the close button is clicked', () => {
    render(<Window {...defaultProps} />);
    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledWith('test-window');
  });

  it('applies the active class when isActive is true', () => {
    const { container } = render(<Window {...defaultProps} isActive={true} />);
    // Check if the title bar parent or the window itself has the active class
    // Based on Window.tsx: className={`${styles.window} ${isActive ? styles.active : ''}`}
    expect(container.firstChild).toHaveClass(/active/);
  });
});
