import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import AuthForm from '@/components/AuthForm';

export default function RegisterScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleOAuthRegister(authentication?.accessToken);
    }
  }, [response]);

  const handleOAuthRegister = async (accessToken: string | undefined) => {
    if (!accessToken) return;

    setIsLoading(true);
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const userInfo = await userInfoResponse.json();
      setName(userInfo.name);
      
      // TODO: Skicka till backend
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('OAuth registrering misslyckades', 'Försök igen');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    if (!name.trim()) {
      Alert.alert('Fel', 'Ange ditt namn');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implementera registrering
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)/home');
    } catch (error) {
      Alert.alert('Registrering misslyckades', 'Försök igen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Registrera dig</Text>
        <Text style={styles.subtitle}>Börja din SystemLife-resa</Text>

        <TextInput
          style={styles.input}
          placeholder="Namn"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />

        <AuthForm 
          onSubmit={handleRegister}
          isLoading={isLoading}
          buttonText="Registrera"
        />

        <TouchableOpacity 
          style={styles.oauthButton}
          onPress={() => promptAsync()}
          disabled={!request || isLoading}
        >
          <Text style={styles.oauthText}>🔐 Registrera med Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.back()}
        >
          <Text style={styles.loginText}>Har du redan konto? Logga in</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
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
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#007AFF',
    fontSize: 14,
  },
});