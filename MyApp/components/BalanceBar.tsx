import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

interface BalanceBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}

export default function BalanceBar({ label, value, maxValue = 100, color }: BalanceBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value} / {maxValue}</Text>
      </View>
      <View style={styles.barBackground}>
        <View 
          style={[
            styles.barFill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
}

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    label: {
      color: isDark ? '#4F8EF7' : '#222',
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
    },
    value: {
      color: isDark ? '#fff' : '#181A20',
      fontSize: 14,
      fontWeight: 'bold',
    },
    barBackground: {
      height: 14,
      backgroundColor: isDark ? '#333' : '#e0e0e0',
      borderRadius: 7,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: 7,
    },
  });
}