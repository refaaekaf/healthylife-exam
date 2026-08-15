import { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../api/axios';
import ContentCard from '../components/ContentCard';

const SavedScreen = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchSaved = async () => {
    try {
      const res = await api.get('/content/user/saved');
      setSaved(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSaved();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Artikel Tersimpan</Text>
        <Text style={styles.subtitle}>{saved.length} konten tersimpan</Text>
      </View>

      {!loading && saved.length === 0 ? (
        <Text style={styles.empty}>Belum ada artikel yang disimpan.</Text>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <ContentCard
                content={item}
                onPress={() => navigation.navigate('Beranda', { screen: 'ContentDetail', params: { id: item._id } })}
              />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontFamily: 'Nunito_800ExtraBold', fontSize: 22, color: '#111827' },
  subtitle: { fontFamily: 'Nunito_400Regular', fontSize: 13, color: '#6b7280', marginTop: 2 },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  empty: { fontFamily: 'Nunito_400Regular', textAlign: 'center', color: '#9ca3af', marginTop: 40 }
});

export default SavedScreen;