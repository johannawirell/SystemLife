import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { clearAuthToken } from '@/config/authContext';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const handleLogout = async () => {
    await clearAuthToken();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/system-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to SystemLife</Text>
        <Text style={styles.subtitle}>Create balance in your life</Text>
        
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Home screen – Upcoming features</Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#181A20' : '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 28,
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      color: isDark ? '#fff' : '#181A20',
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#aaa' : '#666',
      textAlign: 'center',
      marginBottom: 32,
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    },
    placeholder: {
      backgroundColor: isDark ? '#23262F' : '#f5f5f5',
      paddingVertical: 60,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 40,
      width: '100%',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 16,
      color: isDark ? '#888' : '#999',
    },
    logoutButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 10,
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
}