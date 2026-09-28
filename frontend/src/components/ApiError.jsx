import React from 'react';
import { ServerCrash, RotateCcw } from 'lucide-react';

const ApiError = ({ message, onRetry }) => {
  return (
    <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '50vh' }}>
      <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', marginBottom: '1.5rem' }}>
        <ServerCrash size={48} />
      </div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Oops! Something went wrong</h2>
      <p style={{ maxWidth: '450px', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        {message || "We couldn't connect to the server or encountered an unexpected error. Please try again."}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          <RotateCcw size={18} /> Try Again
        </button>
      )}
    </div>
  );
};

export default ApiError;
