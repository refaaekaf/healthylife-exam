import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Rina Sari', email: 'rina.sari@email.com' };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start', width: '100%' }}>
        
        <div style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', paddingBottom: '24px' }}>
          <div style={{ background: '#059669', padding: '40px 20px', textAlign: 'center', color: '#fff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', margin: '0 auto 16px auto', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              {user.name ? user.name.charAt(0) : 'R'}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>{user.name}</h2>
            <p style={{ fontSize: '13px', opacity: 0.9, margin: '0 0 12px 0' }}>{user.email}</p>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '700' }}>Member Aktif ✨</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', textAlign: 'center', padding: '20px 10px', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>24</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Dibaca</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>12</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Streak</div>
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>2</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Simpan</div>
            </div>
          </div>

          <div style={{ padding: '20px' }}>
            <button 
              onClick={handleLogout}
              style={{ width: '100%', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', padding: '12px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              Keluar dari Akun
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Pengaturan Akun</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: '👤', title: 'Edit Profil', desc: 'Ubah nama, foto, dan bio' },
                { icon: '🔒', title: 'Ubah Password', desc: 'Perbarui kata sandi kamu' },
                { icon: '🔔', title: 'Notifikasi', desc: 'Kelola preferensi notifikasi' },
                { icon: '🎯', title: 'Target Kesehatan', desc: 'Atur goal kesehatan harian' },
                { icon: '🌐', title: 'Bahasa & Wilayah', desc: 'Bahasa Indonesia · WIB' },
                { icon: '❓', title: 'Bantuan & FAQ', desc: 'Pusat bantuan Healthy Life' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#f8fafc', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', margin: 0 }}>{item.title}</h4>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Target Minggu Ini</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>🏃‍♂️ Olahraga</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0' }}>5x / minggu</p>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: '#10b981' }}></div>
                </div>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>💧 Hidrasi</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0' }}>8 gelas / hari</p>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0284c7' }}></div>
                </div>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>😴 Tidur</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 8px 0' }}>7-9 jam / malam</p>
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: '#7c3aed' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;