import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { fetchProgression } from '@/lib/api';
import { clearSession, getSession } from '@/lib/session';

export default function HomeScreen() {
  const router = useRouter();
  const [progression, setProgression] = useState<{
    xp: number;
    level: number;
    streak: number;
    completedQuests: number;
  } | null>(null);
  const [error, setError] = useState('');
  const user = getSession().user;

  useEffect(() => {
    async function loadProgression() {
      try {
        const result = await fetchProgression();
        setProgression(result);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Kunde inte ladda home');
      }
    }

    void loadProgression();
  }, []);

  function handleLogout() {
    clearSession();
    router.replace('/');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.label}>Home</Text>
        <Text style={styles.title}>Din startsida</Text>
        <Text style={styles.copy}>Inloggad som {user?.name ?? 'okänd användare'}.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Snabbval</Text>
        {progression ? (
          <View style={styles.stats}>
            <Text style={styles.statText}>Level: {progression.level}</Text>
            <Text style={styles.statText}>XP: {progression.xp}</Text>
            <Text style={styles.statText}>Streak: {progression.streak}</Text>
            <Text style={styles.statText}>Klara quests: {progression.completedQuests}</Text>
          </View>
        ) : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Link href="/profile" style={styles.primaryLink}>
          <Text style={styles.primaryLinkText}>Öppna profil</Text>
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
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },
  hero: {
    gap: 12,
  },
  label: {
    color: '#9a6b32',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#2d241b',
    fontSize: 38,
    fontWeight: '800',
  },
  copy: {
    color: '#6f6256',
    fontSize: 18,
    lineHeight: 28,
    maxWidth: 320,
  },
  panel: {
    backgroundColor: '#fffaf2',
    borderRadius: 28,
    padding: 24,
    gap: 14,
  },
  panelTitle: {
    color: '#2d241b',
    fontSize: 22,
    fontWeight: '700',
  },
  stats: {
    gap: 8,
  },
  statText: {
    color: '#4f4338',
    fontSize: 16,
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
