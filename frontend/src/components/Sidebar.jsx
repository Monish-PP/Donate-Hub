import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, PackageSearch, HeartHandshake, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="brand">
        <HeartHandshake size={32} color="var(--primary-color)" style={{ flexShrink: 0 }} />
        <span className="nav-text">DonateHub</span>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} style={{ flexShrink: 0 }} />
          <span className="nav-text">Dashboard</span>
        </NavLink>
        
        <NavLink to="/drives" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CalendarDays size={20} style={{ flexShrink: 0 }} />
          <span className="nav-text">Donation Drives</span>
        </NavLink>
        
        <NavLink to="/items" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PackageSearch size={20} style={{ flexShrink: 0 }} />
          <span className="nav-text">Items Log</span>
        </NavLink>
        
        <NavLink to="/people" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} style={{ flexShrink: 0 }} />
          <span className="nav-text">People & Orgs</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
