import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Insert from './pages/Insert';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<Insert />} />
      </Routes>
    </Router>
  );
}
