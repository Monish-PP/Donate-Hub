import React, { useState, useEffect } from 'react';
import { Users, Building2, Plus, X } from 'lucide-react';
import ApiError from '../components/ApiError';

const PeoplePage = () => {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Modals state
  const [isDonorModalOpen, setIsDonorModalOpen] = useState(false);
  const [isRecipientModalOpen, setIsRecipientModalOpen] = useState(false);

  // Form states
  const [donorForm, setDonorForm] = useState({ name: '', email: '', phoneNumber: '' });
  const [recipientForm, setRecipientForm] = useState({ organizationName: '', contactPerson: '', contactEmail: '', phone: '', address: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const [donorsRes, recipientsRes] = await Promise.all([
        fetch('/api/donors'),
        fetch('/api/recipients')
      ]);
      
      if (!donorsRes.ok || !recipientsRes.ok) throw new Error("Failed to fetch");
      
      const donorsData = await donorsRes.json();
      const recipientsData = await recipientsRes.json();
      
      setDonors(donorsData);
      setRecipients(recipientsData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donorForm)
    });
    if(res.ok) {
      setIsDonorModalOpen(false);
      setDonorForm({ name: '', email: '', phoneNumber: '' });
      fetchData();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  const handleRecipientSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/recipients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipientForm)
    });
    if(res.ok) {
      setIsRecipientModalOpen(false);
      setRecipientForm({ organizationName: '', contactPerson: '', contactEmail: '', phone: '', address: '' });
      fetchData();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  if (error) return <ApiError message="Failed to load people data. Server might be down." onRetry={fetchData} />;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">People & Organizations</h1>
          <p className="page-subtitle">Manage your donors and recipient organizations</p>
        </div>
      </div>

      <div className="flex gap-4" style={{ marginBottom: '2.5rem' }}>
        <button className="btn btn-primary" onClick={() => setIsDonorModalOpen(true)}>
          <Plus size={18} /> Add Donor
        </button>
        <button className="btn btn-outline" onClick={() => setIsRecipientModalOpen(true)} style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>
          <Plus size={18} /> Add Recipient Org
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Donors Table */}
        <div>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={24} color="var(--primary-color)" /> Donors
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan="3">Loading...</td></tr> : 
                 donors.length === 0 ? <tr><td colSpan="3" className="text-muted text-center">No donors found.</td></tr> :
                 donors.map(donor => (
                   <tr key={donor.id}>
                     <td>#{donor.id}</td>
                     <td style={{fontWeight: 500}}>{donor.name}</td>
                     <td>{donor.email}</td>
                   </tr>
                 ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Recipients Table */}
        <div>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={24} color="var(--success)" /> Recipients
          </h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Organization</th>
                  <th>Contact Person</th>
                </tr>
              </thead>
              <tbody>
                {loading ? <tr><td colSpan="3">Loading...</td></tr> : 
                 recipients.length === 0 ? <tr><td colSpan="3" className="text-muted text-center">No recipients found.</td></tr> :
                 recipients.map(org => (
                   <tr key={org.id}>
                     <td>#{org.id}</td>
                     <td style={{fontWeight: 500}}>{org.organizationName}</td>
                     <td>{org.contactPerson}</td>
                   </tr>
                 ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Donor Modal */}
      {isDonorModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create Donor</h2>
              <button className="btn-icon" onClick={() => setIsDonorModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleDonorSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input required className="form-control" type="text" value={donorForm.name} onChange={e => setDonorForm({...donorForm, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input required className="form-control" type="email" value={donorForm.email} onChange={e => setDonorForm({...donorForm, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number (Optional)</label>
                <input className="form-control" type="text" value={donorForm.phoneNumber} onChange={e => setDonorForm({...donorForm, phoneNumber: e.target.value})} />
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="btn btn-primary">Save Donor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recipient Modal */}
      {isRecipientModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create Recipient Org</h2>
              <button className="btn-icon" onClick={() => setIsRecipientModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleRecipientSubmit}>
              <div className="form-group">
                <label className="form-label">Organization Name</label>
                <input required className="form-control" type="text" value={recipientForm.organizationName} onChange={e => setRecipientForm({...recipientForm, organizationName: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="form-group w-full">
                  <label className="form-label">Contact Person</label>
                  <input required className="form-control" type="text" value={recipientForm.contactPerson} onChange={e => setRecipientForm({...recipientForm, contactPerson: e.target.value})} />
                </div>
                <div className="form-group w-full">
                  <label className="form-label">Contact Email</label>
                  <input required className="form-control" type="email" value={recipientForm.contactEmail} onChange={e => setRecipientForm({...recipientForm, contactEmail: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="btn btn-primary" style={{ background: 'var(--success)' }}>Save Recipient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeoplePage;
