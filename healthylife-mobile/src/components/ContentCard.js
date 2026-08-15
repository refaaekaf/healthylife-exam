import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const typeLabel = { artikel: 'Artikel', video: 'Video', infografis: 'Infografis' };

const ContentCard = ({ content, onPress, width }) => {
  
  const imageSource = content?.thumbnailUrl
    ? { uri: content.thumbnailUrl }
    : require('../../assets/icon.png'); 

  return (
    <TouchableOpacity style={[styles.card, width && { width }]} onPress={onPress}>
      <View>
        <Image source={imageSource} style={styles.thumbnail} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{typeLabel[content?.type] || 'Konten'}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.category}>
          {content?.category ? content.category.replace(/_/g, ' ') : ''}
        </Text>
        <Text style={styles.title} numberOfLines={2}>{content?.title || 'Tanpa Judul'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden',
    borderWidth: 1, borderColor: '#f0f0f0', marginBottom: 12
  },
  thumbnail: { width: '100%', height: 110, backgroundColor: '#e5e7eb' },
  badge: {
    position: 'absolute', top: 8, left: 8, backgroundColor: '#d1fae5',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8
  },
  badgeText: { fontFamily: 'Nunito_700Bold', fontSize: 11, color: '#059669' },
  body: { padding: 10 },
  category: { fontFamily: 'Nunito_600SemiBold', fontSize: 12, color: '#059669', marginBottom: 2, textTransform: 'capitalize' },
  title: { fontFamily: 'Nunito_700Bold', fontSize: 14, color: '#111827' }
});

export default ContentCard;