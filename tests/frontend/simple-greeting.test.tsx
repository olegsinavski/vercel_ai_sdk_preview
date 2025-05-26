import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SimpleGreeting } from '@/components/simple-greeting';

// Mock the fetch function
global.fetch = jest.fn();

describe('SimpleGreeting Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock fetch to return a pending promise
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<SimpleGreeting />);
    
    expect(screen.getByText('Loading greetings...')).toBeInTheDocument();
  });

  it('renders greetings when fetch is successful', async () => {
    // Mock successful response
    const mockGreetings = {
      greetings: ['Hello, World!', 'Hola, Mundo!', 'Bonjour, Monde!']
    };

    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGreetings),
      })
    );

    render(<SimpleGreeting />);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading greetings...')).not.toBeInTheDocument();
    });

    // Check that all greetings are rendered
    mockGreetings.greetings.forEach(greeting => {
      expect(screen.getByText(greeting)).toBeInTheDocument();
    });
  });

  it('renders error message when fetch fails', async () => {
    // Mock failed response
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    );

    render(<SimpleGreeting />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error loading greetings: Network error')).toBeInTheDocument();
    });
  });

  it('renders error when response is not ok', async () => {
    // Mock not ok response
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    render(<SimpleGreeting />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error loading greetings: Failed to fetch greetings')).toBeInTheDocument();
    });
  });
});