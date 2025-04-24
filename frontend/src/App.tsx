import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '@components/home/Home';
import LoginPage from '@components/login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
