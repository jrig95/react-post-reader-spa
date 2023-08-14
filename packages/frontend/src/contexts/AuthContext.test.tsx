import React from 'react';
import { render, fireEvent, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider, useAuth, AuthContextType } from './AuthContext';

const TestComponent: React.FC = () => {
  const { token, setToken } = useAuth();

  return (
    <div>
      <span data-testid="token">{token}</span>
      <button onClick={() => setToken('test-token')}>Set Token</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('should throw an error when useAuth is used without AuthProvider', () => {
    // Temporarily remove the error boundary during the test
    const originalError = console.error;
    console.error = jest.fn();

    // Expect an error to be thrown when using useAuth without AuthProvider
    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider');

    // Restore the error boundary
    console.error = originalError;
  });
});
