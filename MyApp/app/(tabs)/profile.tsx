import React, { useEffect, useState } from 'react';
import { View, Text, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfileScreenStyles } from '../../config/appStyles';
import ProfileCard from '../../components/ProfileCard';
import BalanceBar from '../../components/BalanceBar';
import { getUserFromBackend } from '../../config/api';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getProfileScreenStyles(isDark);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUserFromBackend(''); // Replace '' with actual token when available
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
        {!user && <Text style={styles.noUser}>No user.</Text>}
        
      </View>
    </SafeAreaView>
  );
}

