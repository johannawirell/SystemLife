// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import * as Google from 'expo-auth-session/providers/google';
// import AuthForm from '@/components/AuthForm';
// import { GOOGLE_OAUTH_CONFIG } from '@/config/oauth';
// import { saveAuthToken } from '@/config/authContext';

// export default function RegisterScreen() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [name, setName] = useState('');
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: GOOGLE_OAUTH_CONFIG.clientId,
//     iosClientId: GOOGLE_OAUTH_CONFIG.iosClientId,
//     androidClientId: GOOGLE_OAUTH_CONFIG.androidClientId,
//   });

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       handleOAuthRegister(authentication?.accessToken);
//     }
//   }, [response]);

//   const handleOAuthRegister = async (accessToken: string | undefined) => {
//     if (!accessToken) return;

//     setIsLoading(true);
//     try {
//       const userInfoResponse = await fetch(
//         'https://www.googleapis.com/oauth2/v2/userinfo',
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );
//       const userInfo = await userInfoResponse.json();
//       setName(userInfo.name);

//       // TODO: Skicka userInfo till backend för att skapa/logga in användare
//       await saveAuthToken(accessToken); // Spara token lokalt
//       router.replace('/(tabs)/home');
//     } catch (error) {
//       Alert.alert('OAuth registrering misslyckades', 'Försök igen');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegister = async (email: string, password: string) => {
//     if (!name.trim()) {
//       Alert.alert('Fel', 'Ange ditt namn');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // TODO: Skicka namn, email och lösenord till backend för registrering
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       await saveAuthToken('email-' + email);
//       router.replace('/(tabs)/home');
//     } catch (error) {
//       Alert.alert('Registrering misslyckades', 'Försök igen');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const styles = getStyles(isDark);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Registrera dig</Text>
//         <Text style={styles.subtitle}>Börja din SystemLife-resa</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Namn"
//           placeholderTextColor={isDark ? '#aaa' : '#888'}
//           value={name}
//           onChangeText={setName}
//           editable={!isLoading}
//         />

//         <AuthForm 
//           onSubmit={handleRegister}
//           isLoading={isLoading}
//           buttonText="Registrera"
//           inputStyle={styles.input}
//           textStyle={styles.inputText}
//         />

//         <TouchableOpacity 
//           style={styles.oauthButton}
//           onPress={() => promptAsync()}
//           disabled={!request || isLoading}
//         >
//           <Text style={styles.oauthText}>🔐 Registrera med Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.loginButton}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.loginText}>Har du redan konto? Logga in</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// function getStyles(isDark: boolean) {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: isDark ? '#181A20' : '#fff',
//     },
//     content: {
//       flex: 1,
//       justifyContent: 'center',
//       paddingHorizontal: 20,
//     },
//     title: {
//       fontSize: 32,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: 8,
//       color: isDark ? '#fff' : '#181A20',
//       letterSpacing: 1,
//     },
//     subtitle: {
//       fontSize: 16,
//       color: isDark ? '#aaa' : '#666',
//       textAlign: 'center',
//       marginBottom: 30,
//     },
//     input: {
//       backgroundColor: isDark ? '#23262F' : '#f2f2f2',
//       color: isDark ? '#fff' : '#181A20',
//       borderRadius: 8,
//       paddingHorizontal: 16,
//       paddingVertical: 12,
//       marginBottom: 16,
//       fontSize: 16,
//       borderWidth: 1,
//       borderColor: isDark ? '#333' : '#e0e0e0',
//     },
//     inputText: {
//       color: isDark ? '#fff' : '#181A20',
//     },
//     oauthButton: {
//       backgroundColor: '#4285F4',
//       paddingVertical: 14,
//       borderRadius: 10,
//       alignItems: 'center',
//       marginTop: 28,
//       shadowColor: isDark ? '#000' : '#4285F4',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.2,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     oauthText: {
//       fontSize: 16,
//       fontWeight: '600',
//       color: '#fff',
//       letterSpacing: 0.5,
//     },
//     loginButton: {
//       marginTop: 20,
//       alignItems: 'center',
//     },
//     loginText: {
//       color: isDark ? '#4F8EF7' : '#007AFF',
//       fontSize: 15,
//       fontWeight: '500',
//     },
//   });
// }