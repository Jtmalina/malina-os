import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from './Projects';

describe('Projects App', () => {
  it('renders root folders initially', () => {
    render(<Projects />);
    expect(screen.getByText('Apps')).toBeInTheDocument();
    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  it('navigates into a folder on double click', () => {
    render(<Projects />);
    fireEvent.doubleClick(screen.getByText('Apps'));
    
    expect(screen.getByText('Malina-OS Portfolio.exe')).toBeInTheDocument();
    expect(screen.getByText('OmniList.exe')).toBeInTheDocument();
  });

  it('can navigate back up to root', () => {
    render(<Projects />);
    fireEvent.doubleClick(screen.getByText('Games'));
    expect(screen.getByText('City Streets.exe')).toBeInTheDocument();

    const upBtn = screen.getByText(/Up/);
    fireEvent.click(upBtn);
    expect(screen.getByText('Apps')).toBeInTheDocument();
  });

  it('calls onLaunch when an executable is double clicked', () => {
    const onLaunch = vi.fn();
    render(<Projects onLaunch={onLaunch} />);
    fireEvent.doubleClick(screen.getByText('Games'));
    fireEvent.doubleClick(screen.getByText('Marathon.exe'));
    
    expect(onLaunch).toHaveBeenCalledWith('marathon');
  });

  it('opens external URL for projects with links', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<Projects />);
    fireEvent.doubleClick(screen.getByText('Apps'));
    fireEvent.doubleClick(screen.getByText('OmniList.exe'));
    
    expect(windowSpy).toHaveBeenCalledWith(expect.stringContaining('omni-list'), '_blank');
    windowSpy.mockRestore();
  });
});
