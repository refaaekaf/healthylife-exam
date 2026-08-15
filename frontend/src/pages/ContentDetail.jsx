import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const ContentDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/content/${id}`);
        setContent(res.data);
        
        const allRes = await api.get('/content');
        setRelated(allRes.data.filter(item => item._id !== id).slice(0, 3));
      } catch (err) {
        console.error('Gagal memuat detail konten');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('saved_contents')) || [];
    const exists = savedList.some(item => item._id === id);
    setIsSaved(exists);
  }, [id]);

  const handleToggleSave = () => {
    if (!content) return;
    
    let savedList = JSON.parse(localStorage.getItem('saved_contents')) || [];
    const exists = savedList.some(item => item._id === id);

    if (exists) {
      savedList = savedList.filter(item => item._id !== id);
      setIsSaved(false);
      alert('Konten dihapus dari tersimpan');
    } else {
      savedList.push(content);
      setIsSaved(true);
      alert('Konten berhasil disimpan!');
    }

    localStorage.setItem('saved_contents', JSON.stringify(savedList));
    window.dispatchEvent(new Event('storage'));
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Memuat konten...</div>;
  if (!content) return <div style={{ padding: '40px', textAlign: 'center' }}>Konten tidak ditemukan.</div>;

  return (
    <div className="detail-page">
      <Link to="/" style={{ display: 'inline-block', marginBottom: '20px', color: '#4b5563', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
        ← Kembali
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'start', width: '100%' }}>
        
        <div style={{ background: '#fff', borderRadius: '24px', padding: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '24px', background: '#000', width: '100%', height: '400px' }}>
            {content.type === 'video' ? (
              <iframe 
                src={content.videoUrl || content.body} 
                title={content.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allowFullScreen
              />
            ) : (
              <img 
                src={content.thumbnailUrl} 
                alt={content.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#d1fae5', color: '#065f46', padding: '5px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', textTransform: 'capitalize' }}>
                {content.category ? content.category.replace(/_/g, ' ') : ''}
              </span>
              <span style={{ background: '#f1f5f9', color: '#475569', padding: '5px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>
                {content.type === 'video' ? '12 menit video' : '5 menit baca'}
              </span>
            </div>
            <button 
              onClick={handleToggleSave}
              style={{ 
                border: '1px solid #cbd5e1', 
                background: isSaved ? '#fef3c7' : '#fff', 
                color: isSaved ? '#b45309' : '#334155',
                padding: '6px 16px', 
                borderRadius: '8px', 
                fontSize: '13px', 
                cursor: 'pointer', 
                fontWeight: '600' 
              }}
            >
              {isSaved ? '★ Tersimpan' : '☆ Simpan'}
            </button>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '0 0 20px 0', lineHeight: '1.2' }}>
            {content.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
              HL
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Tim Healthy Life</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>12 Agustus 2026</p>
            </div>
          </div>

          <div style={{ fontSize: '16px', color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
            {content.description || content.body}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Konten Terkait</h3>
            {related.map(item => (
              <Link to={`/content/${item._id}`} key={item._id} style={{ display: 'flex', gap: '12px', marginBottom: '16px', textDecoration: 'none', alignItems: 'center' }}>
                <img src={item.thumbnailUrl} alt={item.title} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '10px', color: '#059669', fontWeight: '700', textTransform: 'capitalize' }}>{item.type}</span>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a', margin: '2px 0 0 0', lineHeight: '1.3' }}>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContentDetail;