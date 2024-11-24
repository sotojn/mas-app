import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (role: string) => {
    if (role === 'admin') {
      navigate('/admin-hub');
    } else {
      navigate('/player-hub');
    }
  };

  return (
    <div>
      <h1>Login Page Hello</h1>
      <button onClick={() => handleLogin('player')}>Login as Player</button>
      <button onClick={() => handleLogin('admin')}>Login as Admin</button>
    </div>
  );
};

export default LoginPage;