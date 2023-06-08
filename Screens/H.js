import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
     
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>EVionics</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          
        </View>
           <View style={styles.evConceptContainer}>
      <Text style={styles.evConceptTitle}>EV Swapping Concept</Text>
      <Text style={styles.evConceptText}>The concept of EV swapping involves replacing the depleted battery of an electric vehicle with a fully charged one in a matter of minutes. This can be done by visiting an EV swapping station, which typically has multiple batteries available for swapping. EV swapping offers an alternative to traditional charging, which can take several hours to fully charge an EV battery.</Text>
    </View>
     
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerOption}>
            <FontAwesome name="user" size={24} color="#fff" />
            <Text style={styles.footerOptionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerOption}>
            <FontAwesome name="battery-half" size={24} color="#fff" />
            <Text style={styles.footerOptionText}>Battery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerOption}>
            <FontAwesome name="map" size={24} color="#fff" />
            <Text style={styles.footerOptionText}>Go Green</Text>
          </TouchableOpacity>
        </View>
         
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#0f3d23',
},
background: {
position: 'absolute',
width: '100%',
height: '100%',
resizeMode: 'cover',
opacity: 0.5,
},
content: {
flex: 1,
padding: 20,
},
titleContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 20,
},
titleText: {
fontSize: 48,
fontWeight: 'bold',
color: '#fff',
textShadowColor: 'rgba(0, 0, 0, 0.25)',
textShadowOffset: { width: 2, height: 2 },
textShadowRadius: 5,
},
searchContainer: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
backgroundColor: '#fff',
padding: 10,
borderRadius: 10,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
marginBottom: 20,
},
searchInput: {
flex: 1,
height: 40,
paddingHorizontal: 10,
},
searchButton: {
marginLeft: 10,
backgroundColor: '#0f3d23',
paddingHorizontal: 20,
paddingVertical: 10,
borderRadius: 10,
},
searchButtonText: {
color: '#fff',
fontWeight: 'bold',
},
header: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
marginBottom: 20,
},
optionsContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 20,
},
option: {
flex: 1,
backgroundColor: '#fff',
padding: 20,
marginHorizontal: 5,
borderRadius: 10,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
alignItems: 'center',
},
optionText: {
marginTop: 10,
fontSize: 18,
fontWeight: 'bold',
color: '#0f3d23',
},
footer: {
flexDirection: 'row',
justifyContent: 'space-between',
},
footerOption: {
flex: 1,
backgroundColor: '#0f3d23',
padding: 20,
marginHorizontal: 5,
borderRadius: 10,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
alignItems: 'center',
},
footerOptionText: {
marginTop: 10,
fontSize: 18,
fontWeight: 'bold',
color: '#fff',
},
evConceptContainer: {
backgroundColor: '#fff',
padding: 20,
borderRadius: 10,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 3.84,
elevation: 5,
},
evConceptTitle: {
fontSize: 24,
fontWeight: 'bold',
color: '#0f3d23',
marginBottom: 10,
},
evConceptText: {
fontSize: 16,
color: '#0f3d23',
},
});

export default HomeScreen;



