import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginScreen from './LogInScreen';
import fetchMock from 'jest-fetch-mock';

// Enable the fetch mock
fetchMock.enableMocks();
jest.useFakeTimers();

jest.mock('../../contexts/AuthContext.tsx', () => {
  const setTokenMock = jest.fn();
  return {
    useAuth: () => ({
      setToken: setTokenMock,
    }),
    setTokenMock,
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LogInScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
  });

  it('should render the Login Screen', () => {
    render(<LoginScreen />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const email = 'test@example.com';
    const apiUrl = `http://localhost:1338/register?email=${encodeURIComponent(email)}`;

    render(<LoginScreen />);

    // Use handleEmailChange to set the email value
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: email } });

    // Log the API call
    fetchMock.mockResponseOnce(JSON.stringify({ user: { token: 'e2b74803-7bff-49b7-b0d0-8e9b8ef479a1' } }));

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    // Wrap the fireEvent.click() with act()
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Log the fetchMock calls
    console.log(fetchMock.mock.calls);

    // Ensure the fetch API is called with the correct email value
    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toBe(apiUrl);
    });

    // Ensure the setTokenMock function is called with the expected token value
    const { setTokenMock } = require('../../contexts/AuthContext');
    await waitFor(() => expect(setTokenMock).toHaveBeenCalledWith('e2b74803-7bff-49b7-b0d0-8e9b8ef479a1'));

    // Resolve any async actions and timers
    jest.runAllTimers();
  });
});
