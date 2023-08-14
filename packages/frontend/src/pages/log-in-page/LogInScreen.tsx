import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Form from '../../components/form/Form';
import { useNavigate } from 'react-router-dom';
import './LogInScreen.css'

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:1338/register?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      const json = await response.json();
      setToken(json.user.token);
      console.log(`Registration successful. Token: ${json.user.token}`);
      navigate('/home');
    } catch (error: any) {
      console.error("HTTP error", error);
    } finally {
      setEmail('');
    }
  };

  return (
    <div className='container'>
      <div>
        <h1>Login</h1>
        <Form email={email} handleEmailChange={handleEmailChange} handleSubmit={handleSubmit} placeholder='email' />
      </div>
    </div>
  );
};

export default LoginScreen;
