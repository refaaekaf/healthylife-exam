import { Link } from 'react-router-dom';
import api from '../api/axios';

const ContentCard = ({ content }) => {
  const handleSave = async (e) => {
    e.preventDefault(); 
    try {
      await api.post(`/content/${content._id}/save`);
      alert('Konten berhasil disimpan!');
    } catch (err) {
      alert('Gagal menyimpan konten');
    }
  };

  return (
    <Link to={`/content/${content._id}`} className="content-card-item" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card-image-wrapper" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '160px', background: '#eee' }}>
        <img src={content.thumbnailUrl} alt={content.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span className="badge" style={{ position: 'absolute', top: '10px', left: '10px', background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', textTransform: 'capitalize' }}>
          {content.type}
        </span>
      </div>
      <div className="card-body" style={{ padding: '12px 4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: '#059669', fontWeight: '700', textTransform: 'capitalize' }}>
            {content.category ? content.category.replace(/_/g, ' ') : ''}
          </span>
          <span onClick={handleSave} style={{ cursor: 'pointer', fontSize: '16px', padding: '4px' }} title="Simpan Konten">
            ☆
          </span>
        </div>
        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 6px 0', lineHeight: '1.4' }}>
          {content.title}
        </h4>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>
          {content.type === 'video' ? '12 menit video' : '5 menit baca'}
        </span>
      </div>
    </Link>
  );
};

export default ContentCard;