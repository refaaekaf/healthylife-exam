import { useState, useEffect } from 'react';
import api from '../api/axios';
import ContentCard from '../components/ContentCard';
import { Link } from 'react-router-dom';

const categories = [
  { value: '', label: 'Semua' },
  { value: 'gizi_seimbang', label: 'Nutrisi' },
  { value: 'olahraga', label: 'Olahraga' },
  { value: 'pencegahan_penyakit', label: 'Tidur' },
  { value: 'kesehatan_mental', label: 'Mental' }
];

const Home = () => {
  const [contents, setContents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const params = category ? { category } : {};
      const res = await api.get('/content', { params });
      setContents(res.data);
      if (recommendations.length === 0) {
        setRecommendations(res.data.slice(1, 5)); 
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.get('/content/user/recommendations')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setRecommendations(res.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => { fetchContents(); }, [category]);

  const featured = contents[0];
  const sideRecs = recommendations.length > 0 ? recommendations.slice(0, 4) : contents.slice(1, 5);

  return (
    <div className="home-page">
      {featured && (
        <div className="hero-section">
          <Link to={`/content/${featured._id}`} className="hero-card">
            <img src={featured.thumbnailUrl} alt={featured.title} />
            <div className="hero-overlay">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span style={{ background: '#10b981', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', textTransform: 'capitalize' }}>{featured.type}</span>
              </div>
              <h2>{featured.title}</h2>
              <span className="read-time">5 menit baca</span>
            </div>
          </Link>

          <div className="hero-sidebar">
            <h3>REKOMENDASI UNTUK KAMU</h3>
            {sideRecs.map(item => (
              <Link to={`/content/${item._id}`} key={item._id} className="side-rec-item">
                <img src={item.thumbnailUrl} alt={item.title} />
                <div>
                  <span className="badge-sm">{item.category ? item.category.replace(/_/g, ' ') : 'Nutrisi'}</span>
                  <p>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="category-pills">
        {categories.map(c => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={category === c.value ? 'pill active' : 'pill'}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="section-heading">Semua Konten ({contents.length})</h2>
        <span style={{ fontSize: '13px', color: '#64748b' }}>{contents.length} konten ditemukan</span>
      </div>

      {loading ? <p>Memuat...</p> : (
        <div className="content-grid">
          {contents.map(c => <ContentCard key={c._id} content={c} />)}
        </div>
      )}
    </div>
  );
};

export default Home;
