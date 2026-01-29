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
        Alert.alert('Inloggning misslyckades', 'Försök igen');
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
        Alert.alert('Apple-inloggning misslyckades', 'Försök igen');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SystemLife</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TouchableOpacity
          style={styles.whiteButton}
          onPress={() => promptAsync()}
          disabled={!request || isLoading}
          activeOpacity={0.8}
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

        {isAppleAvailable && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={8}
            style={styles.appleButton}
            onPress={handleAppleLogin}
          />
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
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: isDark ? '#fff' : '#181A20',
      letterSpacing: 1,
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#aaa' : '#666',
      textAlign: 'center',
      marginBottom: 40,
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
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
      fontFamily: Platform.select({ ios: 'System', android: 'sans-serif' }),
    },
    appleButton: {
      width: '100%',
      height: 44,
      marginTop: 8,
    },
  });
}