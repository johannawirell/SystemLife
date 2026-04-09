import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.label}>Home</Text>
        <Text style={styles.title}>Din startsida</Text>
        <Text style={styles.copy}>
          Har finns plats for det viktigaste innehallet utan npx-mallens demosektioner.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Snabbval</Text>
        <Link href="/profile" style={styles.primaryLink}>
          <Text style={styles.primaryLinkText}>Oppna profil</Text>
        </Link>
        <Link href="/" style={styles.secondaryLink}>
          <Text style={styles.secondaryLinkText}>Logga ut</Text>
        </Link>
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
});
