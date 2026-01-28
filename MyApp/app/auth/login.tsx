import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AuthForm from '@/components/AuthForm';
import { GOOGLE_OAUTH_CONFIG } from '@/config/oauth';

WebBrowser.maybeCompleteAuthSession();

interface UserInfo {
  name: string;
  email: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_OAUTH_CONFIG.clientId,
    iosClientId: GOOGLE_OAUTH_CONFIG.iosClientId,
    androidClientId: GOOGLE_OAUTH_CONFIG.androidClientId,
  });

  React.useEffect(() => {
    const handleOAuthSuccess = async (accessToken: string | undefined) => {
      if (!accessToken) return;

      setIsLoading(true);
      try {
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const userInfo = await userInfoResponse.json();
        
        console.log('Google login success:', userInfo);
        setUserInfo(userInfo);

        router.replace('/(tabs)/home');
      } catch (error) {
        Alert.alert('OAuth inloggning misslyckades', 'Försök igen');
        console.error('OAuth error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (response?.type === 'success') {
      const { authentication } = response;
      handleOAuthSuccess(authentication?.accessToken);
    }
  }, [response, router]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Email login:', email, password);
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Inloggning misslyckades', 'Försök igen');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterPress = () => {
    router.push('/auth/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SystemLife</Text>
        <Text style={styles.subtitle}>Skapa balans i ditt liv</Text>

        <AuthForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
          buttonText="Logga in"
        />

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={handleRegisterPress}
        >
          <Text style={styles.registerText}>Ingen konto? Registrera dig här</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.oauthButton}
          onPress={() => promptAsync()}
          disabled={!request || isLoading}
        >
          <Text style={styles.oauthText}>🔐 Logga in med Google</Text>
        </TouchableOpacity>

        {userInfo && (
          <Text style={styles.welcomeText}>Välkommen {userInfo.name}!</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#007AFF',
    fontSize: 14,
  },
  oauthButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  oauthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  welcomeText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#4CAF50',
  },
});