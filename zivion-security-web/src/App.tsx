import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './screens/Login';
import { GuardDashboard } from './screens/GuardDashboard';
import { Visitors } from './screens/Visitors';
import { Vehicles } from './screens/Vehicles';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Guard Dashboard Routes wrapped in Layout */}
        <Route 
          path="/dashboard/*" 
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<GuardDashboard />} />
                <Route path="/visitors" element={<Visitors />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
