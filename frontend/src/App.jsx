import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import DietForm from './pages/DietForm';
import MinhasDietas from './pages/MinhasDietas';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dietas" element={<DietForm />} />
          <Route path="/minhas-dietas" element={<MinhasDietas />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;