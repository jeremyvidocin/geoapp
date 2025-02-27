// app/(tabs)/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [destination, setDestination] = useState(null);
  const [reports, setReports] = useState([]);
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission de localisation refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleReport = (type) => {
    if (location) {
      const newReport = {
        id: Date.now().toString(),
        type,
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      };
      setReports([...reports, newReport]);
    }
  };

  const handleSearch = async () => {
    if (searchText.length > 2) {
      try {
        // Utiliser l'API de géocodage OpenStreetMap (totalement gratuite)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchText)}&format=json&limit=1`,
          {
            headers: {
              'User-Agent': 'WazeCloneApp/1.0'  // OSM demande un User-Agent
            }
          }
        );
        const json = await response.json();
        
        if (json.length > 0) {
          const result = json[0];
          const newDestination = {
            latitude: parseFloat(result.lat),
            longitude: parseFloat(result.lon),
            name: result.display_name,
          };
          
          setDestination(newDestination);
          
          // Animer la carte vers la nouvelle destination
          mapRef.current?.animateToRegion({
            latitude: newDestination.latitude,
            longitude: newDestination.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'accident':
        return 'warning';
      case 'police':
        return 'shield';
      case 'traffic':
        return 'car';
      default:
        return 'alert-circle';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une destination..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Carte */}
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_DEFAULT} // Utilise la carte par défaut (OpenStreetMap sur Android)
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsMyLocationButton
          // Pour utiliser OpenStreetMap, on peut ajouter la customisation suivante:
          customMapStyle={[]}
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          userAgentString="WazeCloneApp/1.0"
        >
          {destination && (
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title={destination.name}
              pinColor="blue"
            />
          )}

          {/* Affichage des signalements */}
          {reports.map((report) => (
            <Marker
              key={report.id}
              coordinate={report.coordinate}
              title={`Signalement: ${report.type}`}
            >
              <View style={[styles.reportMarker, { 
                backgroundColor: 
                  report.type === 'accident' ? '#FF4C4C' : 
                  report.type === 'police' ? '#4C6CFF' : '#FF8C4C' 
              }]}>
                <Ionicons name={getReportIcon(report.type)} size={20} color="white" />
              </View>
            </Marker>
          ))}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>{errorMsg || 'Chargement de la carte...'}</Text>
        </View>
      )}

      {/* Boutons de signalement */}
      <View style={styles.reportButtons}>
        <TouchableOpacity
          style={[styles.reportButton, { backgroundColor: '#FF4C4C' }]}
          onPress={() => handleReport('accident')}
        >
          <Ionicons name="warning" size={24} color="white" />
          <Text style={styles.reportButtonText}>Accident</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.reportButton, { backgroundColor: '#4C6CFF' }]}
          onPress={() => handleReport('police')}
        >
          <Ionicons name="shield" size={24} color="white" />
          <Text style={styles.reportButtonText}>Police</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.reportButton, { backgroundColor: '#FF8C4C' }]}
          onPress={() => handleReport('traffic')}
        >
          <Ionicons name="car" size={24} color="white" />
          <Text style={styles.reportButtonText}>Trafic</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reportButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportButtonText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
  reportMarker: {
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});