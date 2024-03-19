// DashboardRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './../sidebar/Sidebar';
import Navbar from './../navbar/Navbar';
import Movies from './../moviesList/Movies';
import MoviesInclude from './../moviesInclude/MoviesInclude';
import Users from './../users/users';

const DashboardRoutes = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className="App">
      <header className="container">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Navbar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/incluirfilme" element={<MoviesInclude />} />
          <Route path="/usuarios" element={<Users />} />
        </Routes>
      </header>
    </div>
  );
};

export default DashboardRoutes;
