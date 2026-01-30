import React, { useEffect, useState } from 'react';
import { View, Image, useColorScheme, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileCardStyles } from '@/config/appStyles';
import ProfileCard from '../../components/ProfileCard';
import BalanceBar from '../../components/BalanceBar';
import { getAuthToken } from '@/config/authContext';
import { getUserFromBackend } from '@/config/api';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getProfileCardStyles(isDark);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const token = await getAuthToken();
      if (!token) return;
      try {
        const userData = await getUserFromBackend(token);
        setUser(userData);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/system-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        {user && <ProfileCard user={user} />}
        <BalanceBar
          label="Balance"
          value={user?.balance ?? 0}
          maxValue={100}
          color="#4F8EF7"
        />
      </View>
    </SafeAreaView>
  );
}

