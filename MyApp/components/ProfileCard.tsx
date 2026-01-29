import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { User } from '../types/user';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

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
          <Text style={styles.statValue}>{user.iq}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>PERSONALITY</Text>
          <Text style={styles.statValue}>{user.personality}</Text>
        </View>
        <View style={styles.statCol}>
          <Text style={styles.statLabel}>CLASS</Text>
          <Text style={styles.statValue}>{user.class}</Text>
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

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    card: {
      backgroundColor: isDark ? '#23243a' : '#f5f5f5',
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
      marginBottom: 20,
    },
    statusHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4F8EF7',
      letterSpacing: 2,
      marginBottom: 16,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      color: isDark ? '#aaa' : '#333',
      fontWeight: 'bold',
      fontSize: 15,
      letterSpacing: 1,
    },
    value: {
      color: isDark ? '#fff' : '#181A20',
      fontSize: 15,
      fontWeight: '600',
    },
    titleValue: {
      color: '#FF5252',
      fontWeight: 'bold',
    },
    levelValue: {
      color: '#4F8EF7',
      fontWeight: 'bold',
      fontSize: 22,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333' : '#ddd',
      marginVertical: 12,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    statCol: {
      width: '30%',
      marginBottom: 12,
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 12,
      color: '#aaa',
      marginBottom: 2,
      letterSpacing: 1,
    },
    statValue: {
      fontSize: 16,
      color: isDark ? '#fff' : '#181A20',
      fontWeight: 'bold',
    },
  });
}