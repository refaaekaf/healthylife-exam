import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Refa Eka Febriana' };
  const [savedCount, setSavedCount] = useState(0);

  const fetchSavedCount = async () => {
    try {
      const res = await api.get('/content/saved');
      setSavedCount(res.data.length || 0);
    } catch (err) {

      const localSaved = JSON.parse(localStorage.getItem('saved_contents')) || [];
      setSavedCount(localSaved.length);
    }
  };

  useEffect(() => {
    fetchSavedCount();

    window.addEventListener('storage', fetchSavedCount);
    return () => window.removeEventListener('storage', fetchSavedCount);
  }, []);

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 32px', background: '#fff', borderBottom: '1px solid #e2e8f0', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ background: '#10b981', color: '#fff', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
          HL
        </div>
        <Link to="/" style={{ fontWeight: '800', fontSize: '18px', color: '#0f172a', textDecoration: 'none' }}>
          Healthy Life
        </Link>
      </div>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px' }}>
        <Link to="/" style={{ fontWeight: '600', color: '#334155', textDecoration: 'none' }}>🏠 Beranda</Link>
        <Link to="/dashboard" style={{ fontWeight: '600', color: '#64748b', textDecoration: 'none' }}>📊 Dashboard</Link>
        <Link to="/saved" style={{ fontWeight: '600', color: '#64748b', textDecoration: 'none' }}>🔖 Tersimpan</Link>
        <Link to="/profile" style={{ fontWeight: '600', color: '#64748b', textDecoration: 'none' }}>👤 Profil</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: '12px', fontSize: '13px', color: '#94a3b8' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Cari konten kesehatan..." 
            style={{ padding: '8px 14px 8px 36px', borderRadius: '20px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '13px', width: '220px', outline: 'none' }}
          />
        </div>

        <Link to="/saved" style={{ position: 'relative', fontSize: '18px', textDecoration: 'none', color: '#334155', display: 'flex', alignItems: 'center' }}>
          🔖
          {savedCount > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#10b981', color: '#fff', fontSize: '10px', fontWeight: '750', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {savedCount}
            </span>
          )}
        </Link>

        <div title={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '750', fontSize: '13px', cursor: 'pointer' }}>
          {user.name ? user.name.charAt(0).toUpperCase() : 'R'}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;