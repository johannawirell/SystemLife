import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  darkBg: '#181A20',
  lightBg: '#fff',
  cardDark: '#23243a',
  cardLight: '#f5f5f5',
  accent: '#4F8EF7',
  accentRed: '#FF5252',
  textDark: '#fff',
  textLight: '#181A20',
  textSecondaryDark: '#aaa',
  textSecondaryLight: '#666',
  dividerDark: '#333',
  dividerLight: '#ddd',
  barBgDark: '#333',
  barBgLight: '#e0e0e0',
};

export const FONT = Platform.select({ ios: 'System', android: 'sans-serif' });

export function getProfileCardStyles(isDark: boolean) {
  return StyleSheet.create({
    card: {
      backgroundColor: isDark ? COLORS.cardDark : COLORS.cardLight,
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
      color: COLORS.accent,
      letterSpacing: 2,
      marginBottom: 16,
      textAlign: 'center',
      fontFamily: FONT,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      color: isDark ? COLORS.textSecondaryDark : COLORS.textLight,
      fontWeight: 'bold',
      fontSize: 15,
      letterSpacing: 1,
      fontFamily: FONT,
    },
    value: {
      color: isDark ? COLORS.textDark : COLORS.textLight,
      fontSize: 15,
      fontWeight: '600',
      fontFamily: FONT,
    },
    titleValue: {
      color: COLORS.accentRed,
      fontWeight: 'bold',
    },
    levelValue: {
      color: COLORS.accent,
      fontWeight: 'bold',
      fontSize: 22,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: isDark ? COLORS.dividerDark : COLORS.dividerLight,
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
      color: COLORS.textSecondaryDark,
      marginBottom: 2,
      letterSpacing: 1,
      fontFamily: FONT,
    },
    statValue: {
      fontSize: 16,
      color: isDark ? COLORS.textDark : COLORS.textLight,
      fontWeight: 'bold',
      fontFamily: FONT,
    },
  });
}

export function getBalanceBarStyles(isDark: boolean) {
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
      color: COLORS.accent,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      fontFamily: FONT,
    },
    value: {
      color: isDark ? COLORS.textDark : COLORS.textLight,
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: FONT,
    },
    barBackground: {
      height: 14,
      backgroundColor: isDark ? COLORS.barBgDark : COLORS.barBgLight,
      borderRadius: 7,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      borderRadius: 7,
    },
  });
}

export function getProfileScreenStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: 16,
    },
  });
}