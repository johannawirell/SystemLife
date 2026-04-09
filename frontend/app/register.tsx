import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { registerWithOnboarding } from '@/lib/api';

const AREA_OPTIONS = [
  { key: 'halsa', label: 'Hälsa' },
  { key: 'studier', label: 'Studier' },
  { key: 'karriar', label: 'Karriär' },
] as const;

const AMBITION_OPTIONS = [
  { key: 'low', label: 'Lugn start' },
  { key: 'medium', label: 'Balanserad' },
  { key: 'high', label: 'Hög ambition' },
] as const;

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>(['halsa']);
  const [ambition, setAmbition] = useState('medium');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleArea(area: string) {
    setAreas((current) =>
      current.includes(area) ? current.filter((item) => item !== area) : [...current, area]
    );
  }

  function addGoal() {
    const trimmedGoal = goalInput.trim();

    if (!trimmedGoal) {
      return;
    }

    setGoals((current) => [...current, trimmedGoal]);
    setGoalInput('');
  }

  async function handleRegister() {
    setError('');

    if (areas.length === 0) {
      setError('Välj minst ett livsområde.');
      return;
    }

    if (goals.length === 0) {
      setError('Lägg till minst ett mål.');
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithOnboarding(name, email, password, areas, ambition, goals);
      router.replace('/home');
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'Kunde inte skapa konto');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>SystemLife</Text>
        <Text style={styles.title}>Skapa konto</Text>

        <View style={styles.form}>
          <TextInput
            onChangeText={setName}
            placeholder="Namn"
            placeholderTextColor="#8b7e70"
            style={styles.input}
            value={name}
          />
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Välj livsområden</Text>
          <View style={styles.chipRow}>
            {AREA_OPTIONS.map((area) => (
              <Pressable
                key={area.key}
                onPress={() => toggleArea(area.key)}
                style={[styles.chip, areas.includes(area.key) && styles.chipActive]}>
                <Text style={[styles.chipText, areas.includes(area.key) && styles.chipTextActive]}>
                  {area.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sätt mål</Text>
          <View style={styles.goalComposer}>
            <TextInput
              onChangeText={setGoalInput}
              onSubmitEditing={addGoal}
              placeholder="Exempel: Träna 3 gånger i veckan"
              placeholderTextColor="#8b7e70"
              style={[styles.input, styles.goalInput]}
              value={goalInput}
            />
            <Pressable onPress={addGoal} style={styles.goalButton}>
              <Text style={styles.goalButtonText}>Lägg till</Text>
            </Pressable>
          </View>
          <View style={styles.goalList}>
            {goals.map((goal) => (
              <Text key={goal} style={styles.goalItem}>
                • {goal}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Välj ambitionsnivå</Text>
          <View style={styles.chipRow}>
            {AMBITION_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => setAmbition(option.key)}
                style={[styles.chip, ambition === option.key && styles.chipActive]}>
                <Text style={[styles.chipText, ambition === option.key && styles.chipTextActive]}>
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable onPress={handleRegister} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? 'Skapar konto...' : 'Skapa konto'}
          </Text>
        </Pressable>

        <Link href="/" style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Har du redan ett konto?</Text>
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
  section: {
    gap: 10,
  },
  sectionTitle: {
    color: '#2d241b',
    fontSize: 18,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#f1e7d8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#2d241b',
    fontSize: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderColor: '#cab79e',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: '#2d241b',
    borderColor: '#2d241b',
  },
  chipText: {
    color: '#4f4338',
    fontSize: 15,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#fffaf2',
  },
  goalComposer: {
    gap: 10,
  },
  goalInput: {
    width: '100%',
  },
  goalButton: {
    backgroundColor: '#eadfce',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  goalButtonText: {
    color: '#2d241b',
    fontSize: 15,
    fontWeight: '700',
  },
  goalList: {
    gap: 6,
  },
  goalItem: {
    color: '#4f4338',
    fontSize: 15,
    lineHeight: 22,
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
  errorText: {
    color: '#b2412f',
    fontSize: 14,
    fontWeight: '600',
  },
});
