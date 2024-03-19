// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardRoutes from './components/routes/DashboardRoutes'; // Ajuste o caminho conforme a estrutura do seu projeto
import Login from './components/login/login';

import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<DashboardRoutes sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />} />
      </Routes>
    </Router>
  );
};

export default App;
