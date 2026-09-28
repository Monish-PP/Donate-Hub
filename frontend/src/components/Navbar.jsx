import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, PackageSearch, HeartHandshake, Users } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="brand">
        <HeartHandshake size={32} color="var(--primary-color)" style={{ flexShrink: 0 }} />
        <span>DonateHub</span>
      </Link>
      
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} style={{ flexShrink: 0 }} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/drives" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <CalendarDays size={20} style={{ flexShrink: 0 }} />
          <span>Donation Drives</span>
        </NavLink>
        
        <NavLink to="/items" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PackageSearch size={20} style={{ flexShrink: 0 }} />
          <span>Items Log</span>
        </NavLink>
        
        <NavLink to="/people" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} style={{ flexShrink: 0 }} />
          <span>People & Orgs</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
