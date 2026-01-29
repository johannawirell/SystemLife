import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getAuthToken } from '@/config/authContext';
import { ActivityIndicator, View, Text } from 'react-native';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAuthToken();
        setIsLoggedIn(!!token);
        if (token) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, [router]);
    
 
  return <Stack screenOptions={{ headerShown: false }} />;
}