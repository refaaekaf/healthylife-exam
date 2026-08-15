import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      console.log('Mengirim data register ke backend...', form);
      const res = await api.post('/auth/register', form);
      console.log('Register berhasil:', res.data);
      await login(res.data.user, res.data.token);
    } catch (err) {
      console.log('ERROR DETAIL:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Registrasi gagal, periksa koneksi!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>🌿</Text>
        <Text style={styles.appName}>Healthy Life</Text>

        <Text style={styles.title}>Daftar Akun</Text>
        <Text style={styles.subtitle}>Mulai perjalanan hidup sehatmu hari ini</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama lengkap"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="nama@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Minimal 6 karakter"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Daftar'}</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>atau</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sudah punya akun? Masuk sekarang</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  logo: { fontSize: 48, textAlign: 'center' },
  appName: { fontSize: 18, textAlign: 'center', marginBottom: 32, color: '#059669', fontWeight: 'bold' },
  title: { fontSize: 26, marginBottom: 4, color: '#111827', fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#6b7280', marginBottom: 24 },
  label: { fontSize: 14, marginBottom: 6, marginTop: 12, color: '#374151', fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15
  },
  button: { backgroundColor: '#10b981', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  orText: { textAlign: 'center', color: '#9ca3af', marginVertical: 16 },
  link: { textAlign: 'center', color: '#059669', fontWeight: '600' },
  error: { color: '#ef4444', marginBottom: 12, textAlign: 'center' }
});

export default RegisterScreen;