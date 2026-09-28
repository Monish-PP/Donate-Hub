import React, { useState, useEffect } from 'react';
import { Truck, Search, Plus, X, Trash2 } from 'lucide-react';
import ApiError from '../components/ApiError';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterCat, setFilterCat] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isDistributeModalOpen, setIsDistributeModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [recipientId, setRecipientId] = useState('');

  // Log Form state
  const [formData, setFormData] = useState({
    description: '', category: 'CLOTHES', condition: 'GOOD', collectedDate: '', donorId: '', driveId: ''
  });

  useEffect(() => {
    fetchItems();
  }, [filterCat, filterDate]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(false);
      let url = '/api/items?';
      if(filterCat) url += `category=${filterCat}&`;
      if(filterDate) url += `date=${filterDate}&`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ApiError message="Failed to load items. The server might be down or unreachable." onRetry={fetchItems} />;

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        donorId: parseInt(formData.donorId),
        driveId: parseInt(formData.driveId)
      })
    });
    
    if(res.ok) {
      setIsLogModalOpen(false);
      fetchItems();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  const handleDistributeSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/items/${selectedItemId}/distribute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipientId: parseInt(recipientId) })
    });
    
    if(res.ok) {
      setIsDistributeModalOpen(false);
      fetchItems();
    } else {
      const err = await res.json();
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      if(res.ok) {
        fetchItems();
      } else {
        alert("Failed to delete item.");
      }
    } catch(err) {
      console.error(err);
      alert("Failed to delete item.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Items Log</h1>
          <p className="page-subtitle">Track all collected and distributed items</p>
        </div>
        <div className="flex gap-4 items-center">
          <input 
            type="date"
            className="form-control"
            style={{width: 'auto', marginBottom: 0}}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select 
            className="form-control" 
            style={{width: 'auto', marginBottom: 0}}
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="CLOTHES">Clothes</option>
            <option value="BOOKS">Books</option>
          </select>
          <button className="btn btn-primary" onClick={() => setIsLogModalOpen(true)}>
            <Plus size={18} /> Log Item
          </button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Date Collected</th>
              <th>Category</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="7">Loading...</td></tr> : 
             items.length === 0 ? <tr><td colSpan="7" className="text-center text-muted">No items found.</td></tr> :
             items.map(item => (
              <tr key={item.id}>
                <td>#{item.id}</td>
                <td style={{fontWeight: 500}}>{item.description}</td>
                <td style={{color: 'var(--text-muted)'}}>{item.collectedDate}</td>
                <td>
                  <span className={`badge ${item.category.toLowerCase()}`}>{item.category}</span>
                </td>
                <td>
                  <span className={`badge ${item.itemCondition.toLowerCase()}`}>{item.itemCondition.replace('_', ' ')}</span>
                </td>
                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {item.status === 'COLLECTED' ? (
                      <button 
                        className="btn btn-outline" 
                        style={{padding: '0.25rem 0.75rem', fontSize: '0.75rem'}}
                        onClick={() => { setSelectedItemId(item.id); setIsDistributeModalOpen(true); }}
                      >
                        <Truck size={14} /> Distribute
                      </button>
                    ) : (
                      <span className="text-muted" style={{fontSize: '0.875rem'}}>Sent to #{item.recipientId}</span>
                    )}
                    <button 
                      className="btn-icon" 
                      style={{ color: 'var(--danger)' }}
                      onClick={() => handleDelete(item.id)}
                      title="Delete Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Item Modal */}
      {isLogModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title mb-4">Log Donated Item</h2>
              <button className="btn-icon" onClick={() => setIsLogModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleLogSubmit}>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input required className="form-control" type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="form-group w-full">
                  <label className="form-label">Category</label>
                  <select className="form-control" value={formData.category} onChange={e => {
                    const newCat = e.target.value;
                    setFormData({...formData, category: newCat, condition: newCat === 'CLOTHES' ? 'GOOD' : 'READABLE'});
                  }}>
                    <option value="CLOTHES">CLOTHES</option>
                    <option value="BOOKS">BOOKS</option>
                  </select>
                </div>
                <div className="form-group w-full">
                  <label className="form-label">Condition</label>
                  <select className="form-control" value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
                    {formData.category === 'CLOTHES' ? (
                      <>
                        <option value="NEW">NEW</option>
                        <option value="GOOD">GOOD</option>
                        <option value="WORN">WORN</option>
                      </>
                    ) : (
                      <>
                        <option value="LIKE_NEW">LIKE NEW</option>
                        <option value="READABLE">READABLE</option>
                        <option value="TORN">TORN</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Collected Date</label>
                <input required className="form-control" type="date" value={formData.collectedDate} onChange={e => setFormData({...formData, collectedDate: e.target.value})} />
              </div>
              <div className="flex gap-4">
                <div className="form-group w-full">
                  <label className="form-label">Donor ID</label>
                  <input required className="form-control" type="number" value={formData.donorId} onChange={e => setFormData({...formData, donorId: e.target.value})} />
                </div>
                <div className="form-group w-full">
                  <label className="form-label">Drive ID</label>
                  <input required className="form-control" type="number" value={formData.driveId} onChange={e => setFormData({...formData, driveId: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="btn btn-primary">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Distribute Modal */}
      {isDistributeModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title mb-4">Distribute Item #{selectedItemId}</h2>
              <button className="btn-icon" onClick={() => setIsDistributeModalOpen(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleDistributeSubmit}>
              <div className="form-group">
                <label className="form-label">Recipient ID</label>
                <input required className="form-control" type="number" value={recipientId} onChange={e => setRecipientId(e.target.value)} />
              </div>
              <div className="flex justify-end mt-6">
                <button type="submit" className="btn btn-primary">Confirm Distribution</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
