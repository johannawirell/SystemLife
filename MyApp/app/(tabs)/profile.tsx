import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import ProfileCard from '@/components/ProfileCard';
import BalanceBar from '@/components/BalanceBar';

interface User {
  id: string;
  name: string;
  level: number;
  title: string;
  balance: number;
  class: number;
  xpToNextLevel: string;
  health: number;
  economy: number;
  social: number;
  iq: number;
  personality: string;
  coins: number;
  email: string;
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Johanna Wirell',
    level: 1,
    title: 'Starter',
    balance: 0,
    class: 0,
    xpToNextLevel: 'N/A',
    health: 0,
    economy: 0,
    social: 0,
    iq: 0,
    personality: 'N/A',
    coins: 0,
    email: 'johanna@example.com',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.screenTitle}>Min Profil</Text>
        
        <ProfileCard user={user} />

        <View style={styles.balanceSection}>
          <Text style={styles.sectionTitle}>Balans</Text>
          <BalanceBar 
            label="Hälsa" 
            value={user.health} 
            color="#4CAF50"
          />
          <BalanceBar 
            label="Ekonomi" 
            value={user.economy} 
            color="#FF9800"
          />
          <BalanceBar 
            label="Socialt" 
            value={user.social} 
            color="#2196F3"
          />
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Detaljer</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>IQ</Text>
            <Text style={styles.detailValue}>{user.iq === 0 ? 'N/A' : user.iq}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Personlighetstyp</Text>
            <Text style={styles.detailValue}>{user.personality}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Klass</Text>
            <Text style={styles.detailValue}>{user.class === 0 ? 'N/A' : user.class}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  detailsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});