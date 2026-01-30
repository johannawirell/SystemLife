import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { User } from '../types/user';
import { getProfileCardStyles } from '../config/appStyles';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getProfileCardStyles(isDark);

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
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>HEALTH</Text>
          <Text style={styles.statValue}>{user.health}</Text>
        </View>
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