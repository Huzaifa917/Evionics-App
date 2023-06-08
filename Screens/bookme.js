import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Battery } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const backgroundImg = require('../assets/leaves.jpg');

const BookMe = () => {
  const [cabinets, setCabinets] = useState([
    { id: 1, batteries: [{ id: 1, health: 'Good', percentage: 80 }] },
    { id: 2, batteries: [{ id: 2, health: 'Good', percentage: 90 }] },
    { id: 3, batteries: [{ id: 3, health: 'Good', percentage: 0 }] },
  ]);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [pin, setPin] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const navigation = useNavigation();

  const handleSelectCabinet = (cabinetId) => {
    setSelectedCabinet(cabinets.find((cabinet) => cabinet.id === cabinetId));
    setSelectedBattery(null);
  };

  const handleSubmit = () => {
    const minutes = parseInt(bookingTime);
    if (!Number.isNaN(minutes)) {
      const totalSeconds = minutes * 60;
      navigation.navigate('TimerScreen', { totalSeconds });
    }
  };

  const handleBookBattery = (battery) => {
    setSelectedBattery(battery);
  };

  const handleConfirmBooking = () => {
    if (pin === '2134') {
      if (!bookingTime) {
        Alert.alert('Invalid Time', 'Please enter a valid time to proceed');
        return;
      }

      const selectedCabinetBatteries = selectedCabinet.batteries;
      const updatedCabinetBatteries = selectedCabinetBatteries.filter((battery) => battery.id !== selectedBattery.id);
      const updatedCabinets = cabinets.map((cabinet) => {
        if (cabinet.id === selectedCabinet.id) {
          return {
            ...cabinet,
            batteries: updatedCabinetBatteries,
          };
        }
        return cabinet;
      });
      setCabinets(updatedCabinets);

      Alert.alert('Battery Booked', 'Battery has been booked successfully!');
    } else {
      Alert.alert('Invalid PIN', 'Please enter a correct PIN to proceed');
    }
  };

  const getSelectedCabinet = () => {
    if (cabinets[0].batteries.length === 1 && cabinets[1].batteries.length === 1) {
      if (cabinets[0].batteries[0].percentage > cabinets[1].batteries[0].percentage) {
        return cabinets[0];
      } else {
        return cabinets[1];
      }

    }

    if (cabinets[0].batteries.length === 1) {
      return cabinets[1];
    }

    if (cabinets[1].batteries.length === 1) {
      return cabinets[0];
    }

    if (selectedCabinet) {
      return selectedCabinet;
    }

    if (cabinets[0].batteries[0].percentage > cabinets[1].batteries[0].percentage) {
      return cabinets[0];
    }

    return cabinets[1];
  };

  const selectedCab = getSelectedCabinet();
  const batteries = selectedCab.batteries;

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>GO GREEN</Text>
        <Text style={styles.title}>Select a cabinet:</Text>
        <View style={styles.cabinetContainer}>
          {cabinets.map((cabinet) => (
            <TouchableOpacity
              key={cabinet.id}
                  onPress={() => handleSelectCabinet(cabinet.id)}>
<View style={[styles.cabinet, selectedCabinet && selectedCabinet.id === cabinet.id && styles.selectedCabinet]}>
<Text style={styles.cabinetText}>Cabinet {cabinet.id}</Text>
</View>
</TouchableOpacity>
))}
</View>
{selectedCabinet && (
<>
<Text style={styles.title}>Select a battery:</Text>
<View style={styles.batteryContainer}>
{batteries.map((battery) => (
<TouchableOpacity
key={battery.id}
onPress={() => handleBookBattery(battery)}
style={[styles.battery, selectedBattery && selectedBattery.id === battery.id && styles.selectedBattery]}>
<View style={styles.batteryInfo}>
<Text style={styles.batteryText}>Battery {battery.id}</Text>
<Text style={styles.batteryHealth}>{battery.health}</Text>
</View>
<View style={styles.batteryPercentage}>
<Text style={styles.batteryText}>{battery.percentage}%</Text>
<Ionicons name="battery-half-outline" size={24} color="#fff" />
</View>
</TouchableOpacity>
))}
</View>
<Text style={styles.title}>Booking Details:</Text>
<View style={styles.bookingDetailsContainer}>
<Text style={styles.bookingDetailsText}>Cabinet: {selectedCab.id}</Text>
<Text style={styles.bookingDetailsText}>Battery: {selectedBattery ? selectedBattery.id : '-'}</Text>
<Text style={styles.bookingDetailsText}>PIN:</Text>
<TextInput
style={styles.pinInput}
keyboardType="number-pad"
maxLength={4}
onChangeText={(text) => setPin(text)}

/>
<Text style={styles.bookingDetailsText}>Time:</Text>
<TextInput
style={styles.timeInput}
value={bookingTime}
maxLength={2}
placeholder="Booking time (0-30 mins)"
onChangeText={(text) => setBookingTime(text)}
/>
</View>
<TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
<Text style={styles.confirmButtonText}>CONFIRM BOOKING</Text>
</TouchableOpacity>
</>
)}
</View>
</ImageBackground>
);
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
  cabinetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
  },
  cabinet: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  selectedCabinet: {
    backgroundColor: 'lightblue',
  },
  cabinetText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  batteryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  battery: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedBattery: {
    backgroundColor: 'lightblue',
  },
  batteryInfo: {
    flex: 1,
  },
  batteryPercentage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  batteryHealth: {
    fontSize: 14,
    color: 'gray',
  },
  bookingDetailsContainer: {
    marginTop: 20,
  },
  bookingDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  pinInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  timeInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

});

export default BookMe;