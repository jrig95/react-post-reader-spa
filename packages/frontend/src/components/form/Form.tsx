import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './Form.css';

interface FormProps {
  email: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  placeholder: string;
}

const Form: React.FC<FormProps> = ({ email, handleEmailChange, handleSubmit, placeholder }) => {
  return (
    <form data-testid="form" className="form-container" onSubmit={handleSubmit}>
      <div className="form-controls">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <Input
          type="email"
          id="email"
          className="form-input"
          placeholder={placeholder}
          value={email}
          onChange={handleEmailChange}
          required
        />

      </div>

      <Button type="submit" className="button button-submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
