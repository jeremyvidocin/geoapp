// app/login.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Mon App Navigation</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.loginButtonText}>Commencer la navigation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C6CFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#4C6CFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});