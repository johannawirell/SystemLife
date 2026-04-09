import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { login } from '@/lib/api';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.replace('/home');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Kunde inte logga in');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>SystemLife</Text>
        <Text style={styles.title}>Logga in</Text>

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="E-post"
            placeholderTextColor="#8b7e70"
            style={styles.input}
            value={email}
          />
          <TextInput
            onChangeText={setPassword}
            placeholder="Lösenord"
            placeholderTextColor="#8b7e70"
            secureTextEntry
            style={styles.input}
            value={password}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={handleLogin} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? 'Loggar in...' : 'Logga in'}
          </Text>
        </Pressable>

        <Link href="/profile" style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Testläge</Text>
        </Link>

        <Link href="/register" style={styles.textLink}>
          <Text style={styles.textLinkText}>Registrera ny användare</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4efe6',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fffaf2',
    borderRadius: 28,
    padding: 24,
    gap: 18,
    shadowColor: '#7b5e3b',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  eyebrow: {
    color: '#9a6b32',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#2d241b',
    fontSize: 34,
    fontWeight: '800',
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: '#f1e7d8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#2d241b',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#2d241b',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fffaf2',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryButton: {
    borderColor: '#2d241b',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2d241b',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  textLink: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  textLinkText: {
    color: '#9a6b32',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: '#b2412f',
    fontSize: 14,
    fontWeight: '600',
  },
});
