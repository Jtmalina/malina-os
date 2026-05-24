import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Taskbar from './Taskbar';

describe('Taskbar Component', () => {
  const mockWindows = [
    { id: 'app1', title: 'App 1', icon: '📝', isOpen: true, isMinimized: false },
    { id: 'app2', title: 'App 2', icon: '🎨', isOpen: true, isMinimized: true },
    { id: 'app3', title: 'App 3', icon: '📂', isOpen: false, isMinimized: false },
  ];

  const defaultProps = {
    windows: mockWindows,
    activeWindowId: 'app1',
    onTaskClick: vi.fn(),
    onStartClick: vi.fn(),
    isStartMenuOpen: false,
  };

  it('renders the start button', () => {
    render(<Taskbar {...defaultProps} />);
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('renders buttons for open windows', () => {
    render(<Taskbar {...defaultProps} />);
    expect(screen.getByText('App 1')).toBeInTheDocument();
    expect(screen.getByText('App 2')).toBeInTheDocument();
    expect(screen.queryByText('App 3')).not.toBeInTheDocument();
  });

  it('highlights the active task', () => {
    render(<Taskbar {...defaultProps} />);
    // In CSS modules, classes are hashed, but we can check if it contains 'activeTask' 
    // since we're using happy-dom and vitest might not be fully parsing CSS modules 
    // unless configured. But the logic check is solid.
    const app1Button = screen.getByText('App 1').closest('button');
    expect(app1Button?.className).toContain('activeTask');
  });

  it('calls onTaskClick when a task button is clicked', () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.click(screen.getByText('App 2'));
    expect(defaultProps.onTaskClick).toHaveBeenCalledWith('app2');
  });

  it('calls onStartClick when start button is clicked', () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.click(screen.getByText('Start'));
    expect(defaultProps.onStartClick).toHaveBeenCalled();
  });
});
