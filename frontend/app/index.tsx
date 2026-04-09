import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { login, oauthLogin } from '@/lib/api';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oauthSubmitting, setOauthSubmitting] = useState<string | null>(null);

  const [, googleResponse, promptGoogleAuth] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    scopes: ['openid', 'profile', 'email'],
    selectAccount: true,
  });

  useEffect(() => {
    async function finishGoogleLogin() {
      const idToken =
        googleResponse &&
        googleResponse.type === 'success' &&
        'authentication' in googleResponse
          ? googleResponse.authentication?.idToken
          : undefined;

      if (googleResponse?.type !== 'success' || !idToken) {
        if (googleResponse?.type === 'error') {
          setError('Google-inloggningen misslyckades');
          setOauthSubmitting(null);
        }
        return;
      }

      try {
        await oauthLogin(Platform.OS === 'android' ? 'android' : 'google', {
          idToken,
          platform: Platform.OS === 'android' ? 'android' : Platform.OS === 'ios' ? 'ios' : 'web',
        });
        router.replace('/home');
      } catch (oauthError) {
        setError(oauthError instanceof Error ? oauthError.message : 'Kunde inte logga in med Google');
      } finally {
        setOauthSubmitting(null);
      }
    }

    void finishGoogleLogin();
  }, [googleResponse, router]);

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

  async function handleGoogleLogin(provider: 'google' | 'android') {
    setError('');
    setOauthSubmitting(provider);

    const result = await promptGoogleAuth();

    if (result.type !== 'success' && result.type !== 'opened') {
      setOauthSubmitting(null);
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

        <View style={styles.oauthSection}>
          <Text style={styles.oauthTitle}>Google OAuth</Text>

          {Platform.OS !== 'android' ? (
            <Pressable onPress={() => handleGoogleLogin('google')} style={styles.oauthButton}>
              <Text style={styles.oauthButtonText}>
                {oauthSubmitting === 'google' ? 'Ansluter Google...' : 'Fortsätt med Google'}
              </Text>
            </Pressable>
          ) : null}

          <Pressable onPress={() => handleGoogleLogin('android')} style={styles.oauthButton}>
            <Text style={styles.oauthButtonText}>
              {oauthSubmitting === 'android'
                ? 'Ansluter Android...' : 'Fortsätt med Android (Google)'}
            </Text>
          </Pressable>

          <Text style={styles.oauthHint}>
            Apple ID och LinkedIn aktiveras när deras nycklar och verifiering finns i backend.
          </Text>
        </View>

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
  oauthSection: {
    gap: 10,
  },
  oauthTitle: {
    color: '#6f6256',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  oauthButton: {
    backgroundColor: '#eadfce',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  oauthButtonText: {
    color: '#2d241b',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  oauthHint: {
    color: '#6f6256',
    fontSize: 13,
    lineHeight: 20,
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
