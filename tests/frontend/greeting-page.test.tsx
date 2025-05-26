import React from 'react';
import { render } from '@testing-library/react';
import Page from '@/app/(greeting)/page';

// Mock the SimpleGreeting component
jest.mock('@/components/simple-greeting', () => ({
  SimpleGreeting: () => <div data-testid="simple-greeting-mock">SimpleGreeting Component</div>,
}));

describe('Greeting Page', () => {
  it('renders SimpleGreeting component', () => {
    const { getByTestId } = render(<Page />);
    expect(getByTestId('simple-greeting-mock')).toBeInTheDocument();
  });
});