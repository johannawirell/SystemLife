import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AuthForm from '@/components/AuthForm';

export default function RegisterScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const handleRegister = async (email: string, password: string) => {
    if (!name.trim()) {
      Alert.alert('Fel', 'Ange ditt namn');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Integrera OAuth 2.0 här
      console.log('Register attempt:', name, email, password);
      
      // Simulera API-anrop
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigera till home skärm
      router.replace('/tabs/home');
    } catch (error) {
      Alert.alert('Registrering misslyckades', 'Försök igen');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginPress = () => {
    router.back();
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
          style={styles.loginButton}
          onPress={handleLoginPress}
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
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#007AFF',
    fontSize: 14,
  },
});