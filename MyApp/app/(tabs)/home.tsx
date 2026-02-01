import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { clearAuthToken } from '../../config/authContext';
import { getHomeScreenStyles } from '../../config/appStyles';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getHomeScreenStyles(isDark);

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