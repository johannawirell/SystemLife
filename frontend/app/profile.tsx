import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fetchCurrentUser } from '@/lib/api';
import { clearSession, SessionUser } from '@/lib/session';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      try {
        const result = await fetchCurrentUser();
        setUser(result);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Kunde inte ladda profil');
      }
    }

    void loadUser();
  }, []);

  function handleLogout() {
    clearSession();
    router.replace('/');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name
              ?.split(' ')
              .map((part) => part[0])
              .join('')
              .slice(0, 2)
              .toUpperCase() ?? 'SL'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Ingen användare laddad'}</Text>
        <Text style={styles.role}>SystemLife-användare</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profil</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.row}>E-post: {user?.email ?? '-'}</Text>
        <Text style={styles.row}>
          Livsområden: {user?.preferences.areas.length ? user.preferences.areas.join(', ') : '-'}
        </Text>
        <Text style={styles.row}>Ambitionsnivå: {user?.preferences.ambition ?? '-'}</Text>
        <Text style={styles.row}>Status: Aktiv</Text>
      </View>

      <View style={styles.actions}>
        <Link href="/home" style={styles.primaryLink}>
          <Text style={styles.primaryLinkText}>Till home</Text>
        </Link>
        <Pressable onPress={handleLogout} style={styles.secondaryLink}>
          <Text style={styles.secondaryLinkText}>Logga ut</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4efe6',
    padding: 24,
    paddingTop: 72,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#2d241b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fffaf2',
    fontSize: 28,
    fontWeight: '800',
  },
  name: {
    color: '#2d241b',
    fontSize: 30,
    fontWeight: '800',
  },
  role: {
    color: '#6f6256',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fffaf2',
    borderRadius: 28,
    padding: 24,
    gap: 12,
  },
  sectionTitle: {
    color: '#2d241b',
    fontSize: 22,
    fontWeight: '700',
  },
  row: {
    color: '#4f4338',
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    gap: 14,
    marginTop: 'auto',
  },
  primaryLink: {
    backgroundColor: '#2d241b',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryLinkText: {
    color: '#fffaf2',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondaryLink: {
    backgroundColor: '#eadfce',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryLinkText: {
    color: '#2d241b',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorText: {
    color: '#b2412f',
    fontSize: 14,
    fontWeight: '600',
  },
});
