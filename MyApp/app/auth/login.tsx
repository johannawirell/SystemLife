import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, useColorScheme, Image, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GOOGLE_OAUTH_CONFIG } from '@/config/oauth';
import { saveAuthToken } from '@/config/authContext';
import { saveUserToBackend, getJwtFromBackend } from '@/config/api';
import { getLoginScreenStyles } from '../../config/appStyles';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getLoginScreenStyles(isDark);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleAvailable);
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_OAUTH_CONFIG.clientId,
  });


  const handleOAuthSuccess = async (userInfo?: { email?: string, name?: string }) => {
    if (!userInfo?.email) return;
    setIsLoading(true);
    try {
      await saveUserToBackend(userInfo.email, userInfo.name);
      const jwtToken = await getJwtFromBackend(userInfo.email);
      await saveAuthToken(jwtToken);
      router.replace('/(tabs)/home');
    } catch {
      alert('Login failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      (async () => {
        try {
          const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${authentication?.accessToken}` },
          });
          const userInfo = await userInfoRes.json();
          await handleOAuthSuccess({ email: userInfo.email, name: userInfo.name });
        } catch {
          alert('Kunde inte hämta användarinfo från Google');
        }
      })();
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
      if (credential.email) {
        await handleOAuthSuccess({ email: credential.email, name: credential.fullName?.givenName ?? undefined });
      } else {
        alert('Ingen e-post från Apple, kan inte logga in.');
      }
    } catch (e: any) {
      if (e.code !== 'ERR_CANCELED') {
        alert('Apple login failed, please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/system-logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign in to SystemLife</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

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

        {isAppleAvailable && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={12}
            style={styles.appleButton}
            onPress={handleAppleLogin}
          />
        )}
      </View>
    </SafeAreaView>
  );
}