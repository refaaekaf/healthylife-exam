import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ContentCard from '../components/ContentCard';

const categories = [
  { value: '', label: 'Semua' },
  { value: 'pola_hidup_sehat', label: 'Pola Hidup' },
  { value: 'gizi_seimbang', label: 'Nutrisi' },
  { value: 'olahraga', label: 'Olahraga' },
  { value: 'kesehatan_mental', label: 'Mental' },
  { value: 'pencegahan_penyakit', label: 'Tidur' }
];

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [contents, setContents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      const res = await api.get('/content', { params });
      setContents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const res = await api.get('/content/user/recommendations');
      setRecommendations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchRecommendations(); }, []);
  useEffect(() => {
    const timeout = setTimeout(fetchContents, 300);
    return () => clearTimeout(timeout);
  }, [search, category]);

  const goToDetail = (id) => navigation.navigate('ContentDetail', { id });

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={contents}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.greeting}>Selamat pagi 👋</Text>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Apa yang ingin kamu pelajari?</Text>
              <View style={styles.avatar}>
                <Ionicons name="person" size={18} color="#059669" />
              </View>
            </View>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#9ca3af" />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari artikel, tips, video..."
                value={search}
                onChangeText={setSearch}
              />
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item.value}
              contentContainerStyle={{ gap: 8, marginVertical: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.chip, category === item.value && styles.chipActive]}
                  onPress={() => setCategory(item.value)}
                >
                  <Text style={[styles.chipText, category === item.value && styles.chipTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {recommendations.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.sectionTitle}>✨ Rekomendasi untuk Kamu</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={recommendations}
                  keyExtractor={(item) => item._id}
                  contentContainerStyle={{ gap: 12 }}
                  renderItem={({ item }) => (
                    <ContentCard content={item} width={160} onPress={() => goToDetail(item._id)} />
                  )}
                />
              </View>
            )}

            <Text style={styles.sectionTitle}>Semua Konten ({contents.length})</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ContentCard content={item} onPress={() => goToDetail(item._id)} />
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={styles.empty}>Tidak ada konten ditemukan.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 20, gap: 12 },
  greeting: { fontFamily: 'Nunito_400Regular', fontSize: 14, color: '#6b7280' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  title: { fontFamily: 'Nunito_800ExtraBold', fontSize: 22, flex: 1, marginRight: 12, color: '#111827' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#d1fae5', justifyContent: 'center', alignItems: 'center' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6',
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginTop: 16, gap: 8
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Nunito_400Regular' },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f3f4f6' },
  chipActive: { backgroundColor: '#10b981' },
  chipText: { fontFamily: 'Nunito_600SemiBold', fontSize: 13, color: '#374151' },
  chipTextActive: { color: '#fff' },
  sectionTitle: { fontFamily: 'Nunito_700Bold', fontSize: 16, marginBottom: 10, color: '#111827' },
  empty: { fontFamily: 'Nunito_400Regular', textAlign: 'center', color: '#9ca3af', marginTop: 40 }
});

export default HomeScreen;