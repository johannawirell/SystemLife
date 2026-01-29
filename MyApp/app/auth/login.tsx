import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, useColorScheme, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GOOGLE_OAUTH_CONFIG } from '@/config/oauth';
import { saveAuthToken } from '@/config/authContext';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleAvailable);
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_OAUTH_CONFIG.clientId,
  });

  useEffect(() => {
    const handleOAuthSuccess = async (accessToken: string | undefined) => {
      if (!accessToken) return;
      setIsLoading(true);
      try {
        await saveAuthToken(accessToken);
        router.replace('/(tabs)/home');
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        Alert.alert('OAuth login error', message);
      } finally {
        setIsLoading(false);
      }
    };

    if (response?.type === 'success') {
      const { authentication } = response;
      handleOAuthSuccess(authentication?.accessToken);
    }
  }, [response, router]);

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      await saveAuthToken(credential.identityToken || '');
      router.replace('/(tabs)/home');
    } catch (e: any) {
      if (e.code !== 'ERR_CANCELED') {
        Alert.alert('Apple login failed', 'Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Byt ut textloggan mot bildlogga */}
        <Image
          source={require('../../assets/system-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.whiteButton}
            onPress={() => promptAsync()}
            disabled={!request || isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#222" />
            ) : (
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../assets/google-logo.png')}
                  style={styles.googleLogo}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Sign in with Google</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {isAppleAvailable && (
          <View style={styles.buttonWrapper}>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
              cornerRadius={12}
              style={styles.appleButton}
              onPress={handleAppleLogin}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

function getStyles(isDark: boolean) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#181A20' : '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 28,
    },
    logoImage: {
      width: 200,
      height: 200,
    },
    subtitle: {
      fontSize: 15,
      color: isDark ? '#b0b0b0' : '#666',
      textAlign: 'center',
      marginBottom: 48,
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
      fontWeight: '400',
    },
    buttonWrapper: {
      width: '100%',
      marginBottom: 14,
    },
    whiteButton: {
      backgroundColor: '#fff',
      height: 48,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row',
      shadowColor: isDark ? '#000' : '#ccc',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    googleLogo: {
      width: 24,
      height: 24,
      marginRight: 14,
    },
    buttonText: {
      fontSize: 17,
      fontWeight: '600',
      color: '#222',
      letterSpacing: 0.2,
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    },
    appleButton: {
      width: '100%',
      height: 48,
      borderRadius: 12,
    },
  });
}