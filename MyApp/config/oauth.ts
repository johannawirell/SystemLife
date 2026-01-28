import Constants from 'expo-constants';

export const GOOGLE_OAUTH_CONFIG = {
  clientId: Constants.expoConfig?.extra?.googleClientId || '',
  iosClientId: Constants.expoConfig?.extra?.googleIosClientId || '',
  androidClientId: Constants.expoConfig?.extra?.googleAndroidClientId || '',
};
