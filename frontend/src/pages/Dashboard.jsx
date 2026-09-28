import React, { useState, useEffect } from 'react';
import { Package, Users, CalendarDays, Send, Inbox, Search } from 'lucide-react';
import ApiError from '../components/ApiError';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Quick Search state
  const [searchCat, setSearchCat] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setLoading(true);
    setError(false);
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch dashboard stats", err);
        setError(true);
        setLoading(false);
      });
  };

  if (loading) return <div className="page-header"><h1 className="page-title">Loading...</h1></div>;
  if (error || !stats) return <ApiError message="Failed to load dashboard metrics. The backend server might be unreachable." onRetry={fetchDashboardData} />;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">A high-level view of donation drive metrics.</p>
        </div>
      </div>

      <div className="glass-card mb-4" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{marginBottom: '1rem'}}>Quick Item Search</h2>
        <div className="flex gap-4 items-center mb-4">
          <input 
            type="date"
            className="form-control"
            style={{width: 'auto', marginBottom: 0}}
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <select 
            className="form-control" 
            style={{width: 'auto', marginBottom: 0}}
            value={searchCat}
            onChange={(e) => setSearchCat(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="CLOTHES">Clothes</option>
            <option value="BOOKS">Books</option>
          </select>
          <button className="btn btn-primary" onClick={async () => {
            let url = '/api/items?';
            if(searchCat) url += `category=${searchCat}&`;
            if(searchDate) url += `date=${searchDate}&`;
            const res = await fetch(url);
            const data = await res.json();
            setSearchResults(data);
            setHasSearched(true);
          }}>
            <Search size={18} /> Search Items
          </button>
        </div>

        {hasSearched && (
          <div className="table-container mt-6">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-muted">No items found matching criteria.</td></tr>
                ) : (
                  searchResults.slice(0, 5).map(item => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td style={{fontWeight: 500}}>{item.description}</td>
                      <td><span className={`badge ${item.category.toLowerCase()}`}>{item.category}</span></td>
                      <td><span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {searchResults.length > 5 && <p className="text-muted mt-6 text-center" style={{padding: '1rem'}}>Showing first 5 results. Go to Items Log for more.</p>}
          </div>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon primary"><CalendarDays size={20} /></div>
          <div className="stat-details">
            <h3>Total Drives</h3>
            <div className="value">{stats.totalDrives}</div>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon secondary"><Users size={20} /></div>
          <div className="stat-details">
            <h3>Total Donors</h3>
            <div className="value">{stats.totalDonors}</div>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon warning"><Package size={20} /></div>
          <div className="stat-details">
            <h3>Items Collected</h3>
            <div className="value">{stats.totalDonatedItems}</div>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-icon success"><Send size={20} /></div>
          <div className="stat-details">
            <h3>Items Distributed</h3>
            <div className="value">{stats.totalDistributedItems}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon danger"><Inbox size={20} /></div>
          <div className="stat-details">
            <h3>In Stock</h3>
            <div className="value">{stats.totalUndistributedItems}</div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
