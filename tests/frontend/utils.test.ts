import { cn } from '@/lib/utils';

// Mock the dependencies with jest.fn()
jest.mock('tailwind-merge', () => ({
  twMerge: jest.fn(value => value),
}));

jest.mock('clsx', () => ({
  clsx: jest.fn((...args) => args),
}));

describe('Utils', () => {
  describe('cn function', () => {
    it('uses the utility functions', () => {
      // Call our utility function
      cn('class1', 'class2', 'class3');
      
      // Verify the mocks were called
      const clsxMock = require('clsx').clsx;
      const twMergeMock = require('tailwind-merge').twMerge;
      
      // Just check if they were called, not how
      expect(clsxMock).toHaveBeenCalled();
      expect(twMergeMock).toHaveBeenCalled();
    });
  });
});