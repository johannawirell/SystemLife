import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import Constants from 'expo-constants';

import { oauthLogin, registerWithOnboarding } from '@/lib/api';

WebBrowser.maybeCompleteAuthSession();

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
  const [oauthSubmitting, setOauthSubmitting] = useState(false);
  const projectNameForProxy =
    Constants.expoConfig?.originalFullName ??
    (Constants.expoConfig?.owner && Constants.expoConfig?.slug
      ? `@${Constants.expoConfig.owner}/${Constants.expoConfig.slug}`
      : undefined);

  const [, googleResponse, promptGoogleAuth] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    responseType: ResponseType.IdToken,
    scopes: ['openid', 'profile', 'email'],
    selectAccount: true,
  });

  useEffect(() => {
    async function finishGoogleRegister() {
      const idToken =
        googleResponse &&
        googleResponse.type === 'success' &&
        'params' in googleResponse
          ? googleResponse.params.id_token
          : undefined;

      if (googleResponse?.type !== 'success' || !idToken) {
        if (googleResponse?.type === 'error') {
          setError('Google-registreringen misslyckades');
          setOauthSubmitting(false);
        }
        if (googleResponse?.type === 'success' && !idToken) {
          setError('Google svarade utan id_token');
          setOauthSubmitting(false);
        }
        return;
      }

      try {
        await oauthLogin(Platform.OS === 'android' ? 'android' : 'google', {
          idToken,
          platform: Platform.OS === 'android' ? 'android' : Platform.OS === 'ios' ? 'ios' : 'web',
          intent: 'register',
        });
        router.replace('/home');
      } catch (oauthError) {
        setError(
          oauthError instanceof Error
            ? oauthError.message
            : 'Kunde inte registrera med Google'
        );
      } finally {
        setOauthSubmitting(false);
      }
    }

    void finishGoogleRegister();
  }, [googleResponse, router]);

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

  async function handleGoogleRegister() {
    setError('');

    if (!projectNameForProxy) {
      setError('Expo proxy saknar projektnamn. Kontrollera owner och slug i app.json.');
      return;
    }

    setOauthSubmitting(true);
    const result = await promptGoogleAuth({
      projectNameForProxy,
    } as never);

    if (result.type !== 'success' && result.type !== 'opened') {
      setOauthSubmitting(false);
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
          <Text style={styles.sectionTitle}>Registrera med Google</Text>
          <Pressable onPress={handleGoogleRegister} style={styles.googleButton}>
            <Text style={styles.googleButtonText}>
              {oauthSubmitting ? 'Kontrollerar Google-konto...' : 'Registrera med Google'}
            </Text>
          </Pressable>
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
  helperText: {
    color: '#6f6256',
    fontSize: 13,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#f1e7d8',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#2d241b',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#eadfce',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#2d241b',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
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
