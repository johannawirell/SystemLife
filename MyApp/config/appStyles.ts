import { Platform, StyleSheet } from 'react-native';

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
    container: {
      flex: 1,
      backgroundColor: isDark ? '#000' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: 24,
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

export function getLoginScreenStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 28,
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      color: isDark ? COLORS.textDark : COLORS.textLight,
      fontFamily: FONT,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondaryLight,
      textAlign: 'center',
      marginBottom: 32,
      fontFamily: FONT,
    },
    whiteButton: {
      backgroundColor: '#fff',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      shadowColor: isDark ? '#000' : '#ccc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#eee',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    googleLogo: {
      width: 22,
      height: 22,
      marginRight: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#222',
      letterSpacing: 0.5,
      fontFamily: FONT,
    },
    appleButton: {
      width: '100%',
      height: 44,
      marginTop: 8,
    },
  });
}

export function getHomeScreenStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? COLORS.darkBg : COLORS.lightBg,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 28,
    },
    logoImage: {
      width: 120,
      height: 120,
      marginBottom: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      color: isDark ? COLORS.textDark : COLORS.textLight,
      fontFamily: FONT,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondaryLight,
      textAlign: 'center',
      marginBottom: 32,
      fontFamily: FONT,
    },
    placeholder: {
      backgroundColor: isDark ? '#23262F' : '#f5f5f5',
      paddingVertical: 60,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginBottom: 40,
      width: '100%',
      alignItems: 'center',
    },
    placeholderText: {
      fontSize: 16,
      color: isDark ? '#888' : '#999',
    },
    logoutButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 8,
      marginTop: 10,
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
}