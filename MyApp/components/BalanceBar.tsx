import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { getBalanceBarStyles } from '../config/appStyles';

interface BalanceBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}

export default function BalanceBar({ label, value, maxValue = 100, color }: BalanceBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getBalanceBarStyles(isDark);

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