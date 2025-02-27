// app/(tabs)/settings.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Paramètres</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carte</Text>
          
          <TouchableOpacity style={styles.option}>
            <Ionicons name="map-outline" size={24} color="#4C6CFF" />
            <Text style={styles.optionText}>Type de carte</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Ionicons name="navigate-outline" size={24} color="#4C6CFF" />
            <Text style={styles.optionText}>Itinéraires préférés</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Signalements</Text>
          
          <TouchableOpacity style={styles.option}>
            <Ionicons name="warning-outline" size={24} color="#4C6CFF" />
            <Text style={styles.optionText}>Types de signalements visibles</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Ionicons name="notifications-outline" size={24} color="#4C6CFF" />
            <Text style={styles.optionText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          <TouchableOpacity style={styles.option}>
            <Ionicons name="person-outline" size={24} color="#4C6CFF" />
            <Text style={styles.optionText}>Profil</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Ionicons name="log-out-outline" size={24} color="#FF4C4C" />
            <Text style={[styles.optionText, { color: '#FF4C4C' }]}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    color: '#999',
    fontSize: 14,
  },
});