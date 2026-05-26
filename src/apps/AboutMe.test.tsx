import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutMe from './AboutMe';

describe('AboutMe App', () => {
  it('renders the Notepad-style header', () => {
    render(<AboutMe />);
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('contains the correct profile information', () => {
    render(<AboutMe />);
    expect(screen.getByText(/Julian Malina/)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Wolfjaw Studios/)).toBeInTheDocument();
    expect(screen.getByText(/Northrop Grumman/)).toBeInTheDocument();
  });

  it('includes the agentic coding context', () => {
    render(<AboutMe />);
    expect(screen.getByText(/agentic coding/i)).toBeInTheDocument();
  });

  it('is content editable for authenticity', () => {
    render(<AboutMe />);
    const editor = screen.getByText(/FILE: PROFILE.TXT/);
    expect(editor).toHaveAttribute('contentEditable', 'true');
  });
});
