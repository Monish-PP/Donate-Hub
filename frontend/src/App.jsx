import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DrivesPage from './pages/DrivesPage';
import ItemsPage from './pages/ItemsPage';
import PeoplePage from './pages/PeoplePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drives" element={<DrivesPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
