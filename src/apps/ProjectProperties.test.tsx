import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectProperties from './ProjectProperties';

describe('ProjectProperties App', () => {
  it('renders project metadata correctly', () => {
    render(<ProjectProperties />);
    expect(screen.getByText('Malina-OS Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Interactive Desktop Environment')).toBeInTheDocument();
    expect(screen.getByText(/exploration into agentic solutions/)).toBeInTheDocument();
  });

  it('lists technical stack items', () => {
    render(<ProjectProperties />);
    expect(screen.getByText('React 18')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('includes AI Engineering information', () => {
    render(<ProjectProperties />);
    expect(screen.getByText(/AI Engineering Experiment/)).toBeInTheDocument();
    expect(screen.getByText(/Gemini 2.0 Flash/)).toBeInTheDocument();
  });

  it('opens source code link on button click', () => {
    const windowSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<ProjectProperties />);
    
    const sourceBtn = screen.getByText('View Source');
    fireEvent.click(sourceBtn);
    
    expect(windowSpy).toHaveBeenCalledWith(expect.stringContaining('github.com'), '_blank');
    windowSpy.mockRestore();
  });
});
