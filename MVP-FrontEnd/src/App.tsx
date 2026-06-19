import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para la pantalla de inicio de sesión */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta para el panel de control */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Si escriben cualquier otra ruta o entran a "/", los mandamos al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;