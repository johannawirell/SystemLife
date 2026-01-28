import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AuthForm from '@/components/AuthForm';

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrera OAuth 2.0 här
      // För nu, simulera login
      console.log('Login attempt:', email, password);
      
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigera till home skärm
      router.replace('/home');
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

        <TouchableOpacity style={styles.oauthButton}>
          <Text style={styles.oauthText}>Logga in med Google (OAuth 2.0)</Text>
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
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  oauthText: {
    fontSize: 14,
    fontWeight: '600',
  },
});