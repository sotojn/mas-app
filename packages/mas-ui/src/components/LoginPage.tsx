import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const history = useNavigate();

  const handleLogin = (role: string) => {
    if (role === 'admin') {
      history('/admin-hub');
    } else {
      history('/player-hub');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => handleLogin('player')}>Login as Player</button>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
    </div>
  );
};

export default LoginPage;
