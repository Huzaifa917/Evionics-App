import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const swapStations = [
  { id: 1, name: 'Nust Battery Swap Station', latitude: 33.6425, longitude: 72.9930, batteryAvailable: true },
  { id: 2, name: 'Battery Swap Station F7 ', latitude: 33.6479, longitude: 73.03214, batteryAvailable: false },
  { id: 3, name: 'Swap Station 3', latitude: 33.7244, longitude: 73.0479, batteryAvailable: false },
  { id: 4, name: 'Swap Station 4', latitude: 33.7444, longitude: 73.0479, batteryAvailable: false },
];

const EV = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);
  const [region, setRegion] = useState(null);
  const [nearestStation, setNearestStation] = useState(null);
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // Filter the swap stations array to include only those within the 40 km buffer zone
      let nearbyStations = swapStations.filter((station) => {
        let distance = calculateDistance(location.coords, station);
        return distance <= 40000; // 40 km in meters
      });

      if (nearbyStations.length > 0) {
        // Find the nearest swap station
        let nearestStation = null;
        let nearestDistance = Infinity;
        for (let i = 0; i < nearbyStations.length; i++) {
          let distance = calculateDistance(location.coords, nearbyStations[i]);
          if (distance < nearestDistance) {
            nearestStation = nearbyStations[i];
            nearestDistance = distance;
          }
        }
        setNearestStation({ station: nearestStation, distance: nearestDistance });
      } else {
        // No swap stations within 40 km
        setNearbyStations([]);
        setNearestStation(null);
        setErrorMsg('No swap stations within 40 km');
      }

      setNearbyStations(nearbyStations);
    })();
  },

[]);

const calculateDistance = (coords1, coords2) => {
const lat1 = coords1.latitude;
const lon1 = coords1.longitude;
const lat2 = coords2.latitude;
const lon2 = coords2.longitude;
const R = 6371e3; // metres
const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
const φ2 = lat2 * Math.PI / 180;
const Δφ = (lat2 - lat1) * Math.PI / 180;
const Δλ = (lon2 - lon1) * Math.PI / 180;
const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
Math.cos(φ1) * Math.cos(φ2) *
Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
const d = R * c; // in metres
return d;
};

const handleSearch = () => {
// Handle search functionality
};

const handleStationPress = (station) => {
setSelectedStation(station);
};

return (
<View style={styles.container}>
<MapView style={styles.map} region={region}>
{nearbyStations.map((station) => (
<Marker
key={station.id}
coordinate={{ latitude: station.latitude, longitude: station.longitude }}
onPress={() => handleStationPress(station)}
/>
))}
{nearestStation && (
<Marker
coordinate={{ latitude: nearestStation.station.latitude, longitude: nearestStation.station.longitude }}
pinColor={'green'}
/>
)}
</MapView>

<View style={styles.searchBarContainer}>
<SearchBar
platform={'ios'}
placeholder={'Search for swap stations...'}
value={searchText}
onChangeText={(text) => setSearchText(text)}
onSubmitEditing={handleSearch}
containerStyle={styles.searchBar}
/>
<MaterialIcons name="my-location" size={24} color="black" />
</View>
<ScrollView style={styles.scroll}>
<View style={styles.infoContainer}>
{selectedStation ? (
<>
<Text style={styles.stationName}>{selectedStation.name}</Text>
<Text style={styles.stationAvailability}>
Battery availability: {selectedStation.batteryAvailable ? 'Available' : 'Not available'}
</Text>
</>
) : nearestStation ? (
<>
<Text style={styles.nearestStation}>Nearest Swap Station:</Text>
<Text style={styles.stationName}>{nearestStation.station.name}</Text>
<Text style={styles.stationAvailability}>
Distance: {Math.round(nearestStation.distance)} meters
</Text>
</>
) : (
<Text style={styles.errorMsg}>{errorMsg}</Text>
)}
<Button
  title={'BOOK NOW'}
  onPress={() => {
    // Navigate to the BookNow screen
    navigation.navigate('BookMe');
  }}
/>

</View>
</ScrollView>

</View>

);
};

export default EV;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '55%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 5,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 6,
    margin: 6,
    padding: 10,
    elevation: 2,
    width: '90%',
      height: 200,
  },
  stationName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  stationAvailability: {
    fontSize: 16,
    marginVertical: 5,
  },
  nearestStation: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: '90%',
  }

});