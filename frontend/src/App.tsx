import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App; 