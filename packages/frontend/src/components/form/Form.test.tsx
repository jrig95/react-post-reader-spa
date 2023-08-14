import React, { useState } from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import Form from './Form';

describe('Form Component', () => {
  const handleSubmitMock = jest.fn(() => Promise.resolve());

  const TestComponent: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleEmailChangeMock = (event: React.ChangeEvent<HTMLInputElement>): void => {
      act(() => {
        setEmail(event.target.value);
      });
    };

    return (
      <Form
        email={email}
        handleEmailChange={handleEmailChangeMock}
        handleSubmit={handleSubmitMock}
        placeholder='Enter Email'
      />
    );
  };

  it('renders the form and responds to user input', async () => {
    const { getByLabelText, getByRole, getByTestId } = render(<TestComponent />);

    const emailInput = getByLabelText('Email') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toBe('test@example.com');

    const form = getByTestId('form');

    fireEvent.submit(form);

    await waitFor(() => expect(handleSubmitMock).toHaveBeenCalled());
  });
});
