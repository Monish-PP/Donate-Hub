import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ padding: '2rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', marginBottom: '2rem' }}>
        <AlertCircle size={64} />
      </div>
      <h1 className="page-title" style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--text-main)' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>Page Not Found</h2>
      <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', color: 'var(--text-muted)' }}>
        Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps you mistyped the URL.
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
        <Home size={20} /> Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
