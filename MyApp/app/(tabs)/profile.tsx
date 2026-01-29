import React from 'react';
import { View, StyleSheet, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from '../../components/ProfileCard';
import BalanceBar from '../../components/BalanceBar';
import { user } from '../../types/user';


export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/system-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <ProfileCard user={user} />
        <BalanceBar
          label="Balance"
          value={user.balance}
          maxValue={100}
          color="#4F8EF7"
        />
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
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 28,
      paddingTop: 40,
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: 8,
    },
  });
}