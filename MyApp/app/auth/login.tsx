import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GOOGLE_OAUTH_CONFIG } from '@/config/oauth';
import { saveAuthToken } from '@/config/authContext';
import * as AppleAuthentication from 'expo-apple-authentication';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  React.useEffect(() => {
    let mounted = true;
    AppleAuthentication.isAvailableAsync()
      .then((available) => {
        if (mounted) setIsAppleAvailable(available);
      })
      .catch(() => {
        if (mounted) setIsAppleAvailable(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_OAUTH_CONFIG.clientId, // Web client ID
    // Ta bort iosClientId och androidClientId om du bara kör i Expo Go!
  });

  React.useEffect(() => {
    const handleOAuthSuccess = async (accessToken: string | undefined) => {
      if (!accessToken) return;
      setIsLoading(true);
      try {
        // Hämta användarinfo om du vill, eller skicka token till backend
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

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>SystemLife</Text>
        <Text style={styles.subtitle}>Logga in med Google för att fortsätta</Text>
        <TouchableOpacity
          style={styles.oauthButton}
          onPress={() => promptAsync()}
          disabled={!request || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.oauthText}>Logga in med Google</Text>
          )}
        </TouchableOpacity>
        {isAppleAvailable && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={isDark
              ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={8}
            style={{ width: '100%', height: 44, marginTop: 16 }}
            onPress={async () => {
              try {
                setIsLoading(true);
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                // Hantera credential, t.ex. spara token och navigera vidare
                await saveAuthToken(credential.identityToken || '');
                router.replace('/(tabs)/home');
              } catch (e: any) {
                if (e.code !== 'ERR_CANCELED') {
                  Alert.alert('Apple-inloggning misslyckades', 'Försök igen');
                }
              } finally {
                setIsLoading(false);
              }
            }}
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
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: isDark ? '#fff' : '#181A20',
      letterSpacing: 1,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#aaa' : '#666',
      textAlign: 'center',
      marginBottom: 40,
    },
    oauthButton: {
      backgroundColor: '#4285F4',
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 28,
      shadowColor: isDark ? '#000' : '#4285F4',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    oauthText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
      letterSpacing: 0.5,
    },
  });
}