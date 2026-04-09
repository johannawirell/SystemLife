import { Link } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>SystemLife</Text>
        <Text style={styles.title}>Registrera ny anvandare</Text>
        <Text style={styles.subtitle}>Skapa ett konto for att komma vidare till home och profil.</Text>

        <View style={styles.form}>
          <TextInput placeholder="Namn" placeholderTextColor="#8b7e70" style={styles.input} />
          <TextInput placeholder="E-post" placeholderTextColor="#8b7e70" style={styles.input} />
          <TextInput
            placeholder="Losenord"
            placeholderTextColor="#8b7e70"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Link href="/home" style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Skapa konto</Text>
        </Link>

        <Link href="/" style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Tillbaka till inloggning</Text>
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
  subtitle: {
    color: '#6f6256',
    fontSize: 16,
    lineHeight: 24,
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
});
