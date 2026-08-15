import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);

  const fetchSaved = () => {
    const localSaved = JSON.parse(localStorage.getItem('saved_contents')) || [];
    setSavedItems(localSaved);
  };

  useEffect(() => {
    fetchSaved();
    window.addEventListener('storage', fetchSaved);
    return () => window.removeEventListener('storage', fetchSaved);
  }, []);

  const handleRemove = (id) => {
    const localSaved = JSON.parse(localStorage.getItem('saved_contents')) || [];
    const updated = localSaved.filter(item => item._id !== id);
    localStorage.setItem('saved_contents', JSON.stringify(updated));
    setSavedItems(updated);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="saved-page">
      <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '20px', color: '#0f172a' }}>Artikel Tersimpan</h1>
      
      {savedItems.length === 0 ? (
        <p style={{ color: '#64748b' }}>Belum ada konten yang disimpan.</p>
      ) : (
        <div className="content-grid">
          {savedItems.map(item => (
            <div key={item._id} className="content-card" style={{ position: 'relative' }}>
              <Link to={`/content/${item._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <img src={item.thumbnailUrl} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                <div className="content-card-body">
                  <span className="badge">{item.type}</span>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', margin: '4px 0' }}>{item.title}</h3>
                  <span style={{ fontSize: '12px', color: '#059669' }}>{item.category ? item.category.replace(/_/g, ' ') : ''}</span>
                </div>
              </Link>
              <div style={{ padding: '0 14px 14px 14px', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => handleRemove(item._id)}
                  style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Hapus dari Simpanan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;