import { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/axios';

const ContentDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [content, setContent] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/content/${id}`);
        setContent(res.data);
        const savedRes = await api.get('/content/user/saved');
        setSaved(savedRes.data.some((a) => a._id === id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleToggleSave = async () => {
    try {
      const res = await api.post(`/content/${id}/save`);
      setSaved(res.data.saved);
    } catch (err) {
      console.error(err);
    }
  };

  const openYouTubeVideo = (embedUrl) => {
    if (embedUrl) {
      const videoId = embedUrl.split('/embed/')[1]?.split('?')[0];
      const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : embedUrl;
      Linking.openURL(watchUrl).catch((err) => console.log(err));
    }
  };

  const getCleanDescription = (content) => {
    return content.description || content.body;
  };

  if (loading) return <SafeAreaView style={styles.center}><Text>Memuat...</Text></SafeAreaView>;
  if (!content) return <SafeAreaView style={styles.center}><Text>Konten tidak ditemukan.</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.mediaWrapper}>
          {content.type === 'video' ? (
            <TouchableOpacity style={styles.videoContainer} onPress={() => openYouTubeVideo(content.body)}>
              <Image source={{ uri: content.thumbnailUrl }} style={styles.media} />
              <View style={styles.playButtonOverlay}>
                <View style={styles.playIconCircle}>
                  <Ionicons name="play" size={28} color="#fff" style={{ marginLeft: 3 }} />
                </View>
                <Text style={styles.playText}>Tonton Video di YouTube</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Image source={{ uri: content.thumbnailUrl }} style={styles.media} />
          )}

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentBody}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{content.title}</Text>
            <TouchableOpacity onPress={handleToggleSave}>
              <Ionicons name={saved ? 'star' : 'star-outline'} size={26} color={saved ? '#f59e0b' : '#9ca3af'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.category}>{content.category?.replace(/_/g, ' ')}</Text>

          <Text style={styles.bodyText}>{getCleanDescription(content)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mediaWrapper: { position: 'relative', height: 220, backgroundColor: '#000' },
  media: { width: '100%', height: 220, backgroundColor: '#e5e7eb' },
  videoContainer: { width: '100%', height: 220, justifyContent: 'center', alignItems: 'center' },
  playButtonOverlay: { position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', width: '100%', height: '100%' },
  playIconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  playText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  backButton: {
    position: 'absolute', top: 16, left: 16, backgroundColor: '#fff',
    width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', zIndex: 99
  },
  contentBody: { padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  title: { fontFamily: 'Nunito_800ExtraBold', fontSize: 20, flex: 1, color: '#111827' },
  category: { fontFamily: 'Nunito_600SemiBold', fontSize: 13, color: '#059669', marginTop: 4, marginBottom: 16, textTransform: 'capitalize' },
  bodyText: { fontFamily: 'Nunito_400Regular', fontSize: 15, lineHeight: 24, color: '#374151' }
});

export default ContentDetailScreen;