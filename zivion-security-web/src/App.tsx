import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Login';
import { AdminDashboard } from './screens/AdminDashboard';
import { SupervisorDashboard } from './screens/SupervisorDashboard';
import { GuardDashboard } from './screens/GuardDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/supervisor" element={<SupervisorDashboard />} />
        <Route path="/guard" element={<GuardDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
