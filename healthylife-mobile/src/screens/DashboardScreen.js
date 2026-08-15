import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LineChart } from 'react-native-chart-kit';
import api from '../api/axios';

const screenWidth = Dimensions.get('window').width;

const activityOptions = [
  { value: 'olahraga', label: 'Olahraga (menit)' },
  { value: 'minum_air', label: 'Minum Air (gelas)' },
  { value: 'tidur', label: 'Tidur (jam)' }
];

const DashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [activityType, setActivityType] = useState('olahraga');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await api.get('/activity/dashboard');
      setDashboardData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  const handleLogSubmit = async () => {
    if (!value) return;
    setSubmitting(true);
    try {
      await api.post('/activity', { activityType, value: Number(value) });
      setValue('');
      fetchDashboard();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.loadingText}>Memuat dashboard...</Text>
      </SafeAreaView>
    );
  }

  const { dailyGoals, streak, weeklyData } = dashboardData;

  const dateMap = {};
  weeklyData.forEach((item) => {
    const date = item._id.date;
    if (!dateMap[date]) dateMap[date] = { olahraga: 0, minum_air: 0, tidur: 0 };
    dateMap[date][item._id.activityType] = item.total;
  });
  const labels = Object.keys(dateMap).sort().map((d) => d.slice(5));
  const olahragaData = Object.keys(dateMap).sort().map((d) => dateMap[d].olahraga);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Dashboard Aktivitas</Text>
        <Text style={styles.subtitle}>Pantau perjalanan kesehatanmu</Text>

        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.streakLabel}>STREAK AKTIF</Text>
            <Text style={styles.streakValue}>{streak.current} hari</Text>
            <Text style={styles.streakSub}>Pertahankan semangatmu 💪</Text>
          </View>
        </View>

        <View style={styles.goalsRow}>
          <View style={styles.goalBox}>
            <Text style={styles.goalEmoji}>🏃</Text>
            <Text style={styles.goalLabel}>Olahraga</Text>
            <Text style={styles.goalValue}>{dailyGoals.exercise} mnt</Text>
          </View>
          <View style={styles.goalBox}>
            <Text style={styles.goalEmoji}>💧</Text>
            <Text style={styles.goalLabel}>Air</Text>
            <Text style={styles.goalValue}>{dailyGoals.water} gelas</Text>
          </View>
          <View style={styles.goalBox}>
            <Text style={styles.goalEmoji}>😴</Text>
            <Text style={styles.goalLabel}>Tidur</Text>
            <Text style={styles.goalValue}>{dailyGoals.sleep} jam</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Catat Aktivitas</Text>
          <Text style={styles.label}>Jenis Aktivitas</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={activityType} onValueChange={setActivityType}>
              {activityOptions.map((opt) => (
                <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Jumlah</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan angka"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogSubmit} disabled={submitting}>
            <Text style={styles.buttonText}>{submitting ? 'Menyimpan...' : 'Catat Aktivitas'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Progres 7 Hari</Text>
          {labels.length > 0 ? (
            <LineChart
              data={{ labels, datasets: [{ data: olahragaData.length ? olahragaData : [0] }] }}
              width={screenWidth - 64}
              height={200}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                labelColor: () => '#6b7280',
                propsForDots: { r: '4', strokeWidth: '2', stroke: '#10b981' }
              }}
              bezier
              style={{ borderRadius: 16 }}
            />
          ) : (
            <Text style={styles.emptyChart}>Belum ada data minggu ini.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontFamily: 'Nunito_400Regular', color: '#6b7280' },
  container: { padding: 20 },
  title: { fontFamily: 'Nunito_800ExtraBold', fontSize: 22, color: '#111827' },
  subtitle: { fontFamily: 'Nunito_400Regular', fontSize: 14, color: '#6b7280', marginBottom: 20 },
  streakCard: {
    backgroundColor: '#10b981', borderRadius: 16, padding: 18,
    flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16
  },
  streakEmoji: { fontSize: 32 },
  streakLabel: { fontFamily: 'Nunito_700Bold', color: '#d1fae5', fontSize: 12 },
  streakValue: { fontFamily: 'Nunito_800ExtraBold', color: '#fff', fontSize: 24 },
  streakSub: { fontFamily: 'Nunito_400Regular', color: '#d1fae5', fontSize: 12 },
  goalsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  goalBox: { flex: 1, backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, alignItems: 'center' },
  goalEmoji: { fontSize: 20 },
  goalLabel: { fontFamily: 'Nunito_400Regular', fontSize: 12, color: '#6b7280', marginTop: 4 },
  goalValue: { fontFamily: 'Nunito_700Bold', fontSize: 14, marginTop: 2, color: '#111827' },
  card: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f0f0f0', padding: 16, marginBottom: 16 },
  cardTitle: { fontFamily: 'Nunito_700Bold', fontSize: 15, marginBottom: 12, color: '#111827' },
  label: { fontFamily: 'Nunito_600SemiBold', fontSize: 13, color: '#374151', marginBottom: 6, marginTop: 8 },
  pickerWrapper: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12, overflow: 'hidden' },
  input: {
    borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: 15, fontFamily: 'Nunito_400Regular'
  },
  button: { backgroundColor: '#10b981', borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 16 },
  buttonText: { fontFamily: 'Nunito_700Bold', color: '#fff', fontSize: 15 },
  emptyChart: { fontFamily: 'Nunito_400Regular', color: '#9ca3af' }
});

export default DashboardScreen;