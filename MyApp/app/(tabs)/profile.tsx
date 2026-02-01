import { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, useColorScheme, Image, SafeAreaView } from 'react-native';
import { getProfileScreenStyles } from '../../config/appStyles';
import ProfileCard from '../../components/ProfileCard';
import BalanceBar from '../../components/BalanceBar';
import { getUserFromBackend } from '../../config/api';
import { initHealth, getSteps, getActiveEnergy, getExerciseMinutes } from '../../components/HealthService';

export default function ProfileScreen() {
  const [healthData, setHealthData] = useState<{steps?: number, kcal?: number, minutes?: number} | null>(null);
  const [loading, setLoading] = useState(false);
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

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      await initHealth();
      const [steps, kcal, minutes] = await Promise.all([
        getSteps(),
        getActiveEnergy(),
        getExerciseMinutes(),
      ]);
      setHealthData({ steps, kcal, minutes });
    } catch {
      setHealthData({ steps: -1, kcal: -1, minutes: -1 });
    }
    setLoading(false);
  };

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
        <Button title="Show Health-data" onPress={fetchHealthData} />
        {loading && <ActivityIndicator />}
        {healthData && (
          <View style={{ marginTop: 20 }}>
            <Text>Steps: {healthData.steps}</Text>
            <Text>Exercise Minutes: {healthData.minutes}</Text>
            <Text>Burned kcal: {healthData.kcal}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

