import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth';
import Trains from './pages/Trains';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/trains" element={<Trains />} />
      </Routes>
    </BrowserRouter>
  );
}
