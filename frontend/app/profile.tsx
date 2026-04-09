import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JW</Text>
        </View>
        <Text style={styles.name}>Johanna Wirell</Text>
        <Text style={styles.role}>SystemLife-anvandare</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Profil</Text>
        <Text style={styles.row}>E-post: johanna@example.com</Text>
        <Text style={styles.row}>Telefon: +46 70 123 45 67</Text>
        <Text style={styles.row}>Status: Aktiv</Text>
      </View>

      <View style={styles.actions}>
        <Link href="/home" style={styles.primaryLink}>
          <Text style={styles.primaryLinkText}>Till home</Text>
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
});
