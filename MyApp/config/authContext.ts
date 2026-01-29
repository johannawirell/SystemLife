import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  isLoading: true,
});

export async function saveAuthToken(token: string) {
  await AsyncStorage.setItem('authToken', token);
}

export async function getAuthToken() {
  return await AsyncStorage.getItem('authToken');
}

export async function clearAuthToken() {
  await AsyncStorage.removeItem('authToken');
}