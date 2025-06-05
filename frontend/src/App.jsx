import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dieta from './pages/Dieta';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import FazerDieta from './pages/FazerDieta';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/fazer-dieta" element={<PrivateRoute><FazerDieta /></PrivateRoute>} />
          <Route path="/dieta" element={<PrivateRoute><Dieta /></PrivateRoute>} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
