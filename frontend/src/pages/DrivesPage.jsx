import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import ApiError from '../components/ApiError';

const DrivesPage = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', startDate: '', endDate: '' });

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/drives');
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setDrives(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ApiError message="Failed to load donation drives. Please check if the server is running." onRetry={fetchDrives} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/drives', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    if(res.ok) {
      setIsModalOpen(false);
      setFormData({ name: '', description: '', startDate: '', endDate: '' });
      fetchDrives();
    } else {
      const error = await res.json();
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Donation Drives</h1>
          <p className="page-subtitle">Manage campus campaigns</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> New Drive
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : drives.length === 0 ? (
              <tr><td colSpan="5" className="text-center text-muted">No drives found.</td></tr>
            ) : (
              drives.map(drive => (
                <tr key={drive.id}>
                  <td>#{drive.id}</td>
                  <td style={{fontWeight: 500}}>{drive.name}</td>
                  <td className="text-muted">{drive.description || '-'}</td>
                  <td>{drive.startDate}</td>
                  <td>{drive.endDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create New Drive</h2>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Drive Name</label>
                <input required className="form-control" type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
              </div>
              <div className="flex gap-4">
                <div className="form-group w-full">
                  <label className="form-label">Start Date</label>
                  <input required className="form-control" type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div className="form-group w-full">
                  <label className="form-label">End Date</label>
                  <input required className="form-control" type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="btn btn-primary">Create Drive</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivesPage;
