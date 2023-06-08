import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements';

const EVCalculatorScreen = () => {
  const [petrolPrice, setPetrolPrice] = useState('');
  const [pPrice, setpPrice] = useState('');

  const [evPrice, setEVPrice] = useState('');
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [range, setRange] = useState('');
  const [energyConsumption, setEnergyConsumption] = useState('');

  const handleCalculate = () => {
    const petrolCost = (distance / mileage) * parseInt(pPrice);
    const evCost = (distance / range) * (energyConsumption * 14);
    setEVPrice(`${evCost.toFixed(3)} rs`);
    setPetrolPrice(`${petrolCost.toFixed(3)} rs`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label="Petrol Price (per liter)"
        placeholder="Enter the petrol price"
        value={pPrice}
        onChangeText={(text) => setpPrice(text)}
      />
      <Input
        label="Distance (in km)"
        placeholder="Enter the distance"
        value={distance}
        onChangeText={(text) => setDistance(text)}
      />
      <Input
        label="Mileage (per liter)"
        placeholder="Enter the mileage"
        value={mileage}
        onChangeText={(text) => setMileage(text)}
      />
      <Input
        label="Range (in km)"
        placeholder="Enter the range/ EV AVERAGE"
        value={range}
        onChangeText={(text) => setRange(text)}
      />
      <Input
        label="Energy Consumption (per km) - KWH"
        placeholder="Enter the energy consumption -EV"
        value={energyConsumption}
        onChangeText={(text) => setEnergyConsumption(text)}
      />
      <Button
        title="Calculate"
        onPress={handleCalculate}
        buttonStyle={styles.button}
      />
      {evPrice !== '' && petrolPrice !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Note : For Ev maintenance cost is included </Text>
          <Text style={styles.resultText}>For EV Your Travel cost: {evPrice} </Text>
          <Text style={styles.resultText}>For Petrol bike your Travel cost: {petrolPrice} </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#006400',
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default EVCalculatorScreen;
