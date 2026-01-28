import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from '../types/user.js';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <View style={styles.card}>
      {user.avatar && (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.title}>{user.title}</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={styles.statValue}>{user.level}/50</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={styles.statValue}>{user.balance}/100</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Mynt</Text>
          <Text style={styles.statValue}>{user.coins}</Text>
        </View>
      </View>

      {user.xpToNextLevel !== 'N/A' && (
        <Text style={styles.xpText}>{user.xpToNextLevel}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  xpText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 10,
  },
});