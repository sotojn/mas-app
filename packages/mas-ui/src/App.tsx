import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PlayerHub from './components/PlayerHub';
import AdminHub from './components/AdminHub';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/player-hub" element={<PlayerHub/>} />
        <Route path="/admin-hub" element={<AdminHub/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;