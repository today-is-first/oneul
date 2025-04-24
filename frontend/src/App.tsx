import './App.css';
import { Routes, Route } from 'react-router';
import Home from '@components/home/Home';
import LoginPage from '@components/login/LoginPage';

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
