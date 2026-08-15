import { useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [activityType, setActivityType] = useState('olahraga');
  const [amount, setAmount] = useState('');
  
  const [stats, setStats] = useState({ 
    streak: 12, 
    olahraga: 35, 
    air: 8, 
    tidur: 7.5 
  });
  
  const [message, setMessage] = useState('');

  const handleLogActivity = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      setMessage('Masukkan angka jumlah yang valid!');
      return;
    }

    const numericAmount = Number(amount);

    try {

      await api.post('/activity/log', { type: activityType, amount: numericAmount });
    } catch (err) {

    }

    setStats((prev) => {
      const updated = { ...prev };
      if (activityType === 'olahraga') updated.olahraga += numericAmount;
      if (activityType === 'air') updated.air += numericAmount;
      if (activityType === 'tidur') updated.tidur = numericAmount; 
      return updated;
    });

    setMessage(`Berhasil mencatat ${activityType}: ${numericAmount}!`);
    setAmount('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="dashboard-page">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>Dashboard Kesehatan</h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Senin, 12 Agustus 2026 · Pantau progres harianmu</p>
      </div>

      {message && (
        <div style={{ background: '#d1fae5', color: '#065f46', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: '24px', padding: '24px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.2)' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9 }}>STREAK AKTIF</span>
            <div style={{ fontSize: '42px', fontWeight: '800', margin: '4px 0' }}>{stats.streak}</div>
            <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>hari berturut-turut</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.9, marginBottom: '6px' }}>
              <span>Progres ke 30 hari</span>
              <span>40%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: '#fff', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>🏃‍♂️</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: '8px' }}>Olahraga</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats.olahraga} <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>menit</span></div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Total akumulasi</p>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>💧</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284c7', background: '#e0f2fe', padding: '4px 10px', borderRadius: '8px' }}>Air Minum</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats.air} <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>gelas</span></div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Target harian</p>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px' }}>😴</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#7c3aed', background: '#f3e8ff', padding: '4px 10px', borderRadius: '8px' }}>Tidur Malam</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a' }}>{stats.tidur} <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>jam</span></div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>Kualitas: Baik</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', width: '100%' }}>
        
        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: 0 }}>Progres 7 Hari Terakhir</h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>Sen – Min, minggu ini</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: '600', color: '#475569' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Olahraga (mnt)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7' }}></span> Air (gls)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7c3aed' }}></span> Tidur (jam)</span>
            </div>
          </div>

          <div style={{ height: '230px', background: '#fff', position: 'relative', borderLeft: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', paddingLeft: '8px' }}>
            {[0, 15, 30, 45, 60].map((val, idx) => (
              <div key={idx} style={{ position: 'absolute', bottom: `${(val / 60) * 180 + 20}px`, left: 0, right: 0, borderTop: '1px dashed #f1f5f9', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', position: 'absolute', left: '-24px', width: '20px', textAlign: 'right' }}>{val}</span>
              </div>
            ))}

            <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M 40 100 Q 85 60 130 68 Q 175 75 220 115 Q 265 140 310 95 Q 355 20 400 32 Q 445 100 490 75 Q 525 90 560 110" fill="none" stroke="#10b981" strokeWidth="2.5" />
              <path d="M 40 160 Q 130 155 220 158 T 400 150 T 560 155" fill="none" stroke="#0284c7" strokeWidth="2" />
              <path d="M 40 170 Q 130 168 220 172 T 400 165 T 560 168" fill="none" stroke="#7c3aed" strokeWidth="2" />

              {[
                [40, 100], [130, 68], [220, 115], [310, 95], [400, 32], [490, 75], [560, 110]
              ].map((pt, i) => (
                <circle key={i} cx={pt[0]} cy={pt[1]} r="4.5" fill="#10b981" stroke="#fff" strokeWidth="2" />
              ))}
            </svg>

            <div style={{ position: 'absolute', top: '20px', bottom: '20px', left: '400px', borderLeft: '1px dashed #94a3b8' }}>
              <div style={{ position: 'absolute', top: '-10px', left: '10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '11px', zIndex: 10, minWidth: '100px' }}>
                <p style={{ fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0', borderBottom: '1px solid #f1f5f9', paddingBottom: '2px' }}>Jum</p>
                <p style={{ color: '#0284c7', margin: '2px 0' }}>Air Minum : {stats.air}</p>
                <p style={{ color: '#10b981', margin: '2px 0' }}>Olahraga : {stats.olahraga}</p>
                <p style={{ color: '#7c3aed', margin: '2px 0' }}>Tidur : {stats.tidur}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '16px', paddingRight: '16px', marginTop: '8px', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span>Jum</span>
            <span>Sab</span>
            <span>Min</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>Catat Aktivitas</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Tambah catatan aktivitas hari ini</p>

            <form onSubmit={handleLogActivity} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Jenis Aktivitas</label>
                <select 
                  value={activityType} 
                  onChange={(e) => setActivityType(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '14px', outline: 'none' }}
                >
                  <option value="olahraga">Olahraga (menit)</option>
                  <option value="air">Air Minum (gelas)</option>
                  <option value="tidur">Tidur (jam)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Jumlah</label>
                <input 
                  type="number" 
                  placeholder="Masukkan angka..." 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                  required
                />
              </div>

              <button 
                type="submit"
                style={{ width: '100%', background: '#059669', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '8px' }}
              >
                Simpan Aktivitas
              </button>
            </form>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
              {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '22px', height: '22px', background: idx < 5 ? '#10b981' : '#cbd5e1', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</span>
                  <span>{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;