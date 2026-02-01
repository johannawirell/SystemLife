import React, { useState } from 'react';
import { Alert, View, Text, ActivityIndicator, useColorScheme, TouchableOpacity, Linking } from 'react-native';
import { User } from '../types/user';
import { getProfileCardStyles } from '../config/appStyles';
import { initHealth, getSteps, getActiveEnergy, getExerciseMinutes } from './HealthService';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getProfileCardStyles(isDark);

  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<{ steps?: number; kcal?: number; minutes?: number } | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);

  const fetchHealthData = async () => {
    setLoading(true);
    setHealthError(null);
    try {
      await initHealth();
      const [steps, kcal, minutes] = await Promise.all([
        getSteps(),
        getActiveEnergy(),
        getExerciseMinutes(),
      ]);
      setHealthData({ steps, kcal, minutes });
    } catch {
      setHealthError('Kunde inte hämta hälsodata. Kontrollera behörigheter i Inställningar.');
      // Visa en alert med möjlighet att öppna inställningar
      Alert.alert(
        'Behörighet krävs',
        'Appen har inte tillgång till Hälsa. Vill du öppna Inställningar?',
        [
          { text: 'Avbryt', style: 'cancel' },
          { text: 'Öppna Inställningar', onPress: () => Linking.openURL('app-settings:') },
        ]
      );
      setHealthData(null);
    }
    setLoading(false);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.statusHeader}>STATUS</Text>
      <View style={styles.row}>
        <Text style={styles.label}>NAME:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>TITLE:</Text>
        <Text style={[styles.value, styles.titleValue]}>{user.title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>LEVEL:</Text>
        <Text style={styles.levelValue}>{user.level}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>XP to next level:</Text>
        <Text style={styles.value}>{user.xpToNextLevel}</Text>
      </View>
      <View style={styles.divider} />

      <View style={styles.statsGrid}>
        <TouchableOpacity
          style={styles.statCol}
          onPress={fetchHealthData}
          disabled={loading}
          activeOpacity={0.7}
        >
          <Text style={styles.statLabel}>HEALTH</Text>
          <Text style={styles.statValue}>{user.health}</Text>
          {loading && <ActivityIndicator size="small" style={{ marginTop: 4 }} />}
          {healthError && (
            <Text style={{ color: 'red', fontSize: 12, marginTop: 4, textAlign: 'center' }}>
              {healthError}
            </Text>
          )}
          {healthData && (
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 12 }}>Steps: {healthData.steps ?? '-'}</Text>
              <Text style={{ fontSize: 12 }}>Min: {healthData.minutes ?? '-'}</Text>
              <Text style={{ fontSize: 12 }}>Kcal: {healthData.kcal ?? '-'}</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>ECONOMY</Text>
          <Text style={styles.statValue}>{user.economy}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>SOCIAL</Text>
          <Text style={styles.statValue}>{user.social}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>IQ</Text>
          <Text style={styles.statValue}>{user.iq === 0 ? 'N/A' : user.iq}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>PERSONALITY</Text>
          <Text style={styles.statValue}>{user.personality}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>CLASS</Text>
          <Text style={styles.statValue}>{user.class === 0 ? 'N/A' : user.class}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>COINS:</Text>
        <Text style={styles.value}>{user.coins}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>EMAIL:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
    </View>
  );
}