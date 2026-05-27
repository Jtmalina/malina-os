import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contact from './Contact';

describe('Contact App', () => {
  it('renders the Outlook-style interface', () => {
    render(<Contact />);
    expect(screen.getByTestId('sidebar-outlook')).toBeInTheDocument();
    expect(screen.getByText(/Inbox/)).toBeInTheDocument();
    expect(screen.getByText(/Outbox/)).toBeInTheDocument();
  });

  it('renders the readonly "To" field correctly', () => {
    render(<Contact />);
    expect(screen.getByText(/Julian Malina <jmalina7897@gmail.com>/)).toBeInTheDocument();
  });

  it('updates form fields on change', () => {
    render(<Contact />);
    const nameInput = screen.getByPlaceholderText('Your Name') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    expect(nameInput.value).toBe('Test User');
  });

  it('shows sending status and clears form on clear', async () => {
    render(<Contact />);
    const clearBtn = screen.getByText('Clear');
    
    // Fill something
    const nameInput = screen.getByPlaceholderText('Your Name');
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    
    fireEvent.click(clearBtn);
    expect(screen.getByText('Form cleared.')).toBeInTheDocument();
    expect((nameInput as HTMLInputElement).value).toBe('');
  });

  it('updates status on send', async () => {
    render(<Contact />);
    const sendBtn = screen.getByText('Send');
    
    // Mock window.location.href
    const originalLocation = window.location;
    // @ts-expect-error - overriding location for test
    delete window.location;
    window.location = { ...originalLocation, href: '' } as unknown as Location;

    fireEvent.click(sendBtn);
    expect(screen.getByText('Sending message...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Message sent to outbox.')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Restore
    window.location = originalLocation;
  });
});
