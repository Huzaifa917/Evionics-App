import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { firebase } from '../Config';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const profile = firebase.firestore().collection('table');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cnicNo, setCnicNo] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [evBikeNo, setEvBikeNo] = useState('');
  const [cnicImage, setCnicImage] = useState(null);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCnicImage(result.uri);
    }
  };

  const handleCameraUpload = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
       const fileExtension = result.uri.split('.').pop();
      const fileName = `${Date.now()}.${fileExtension}`;
      const imageRef = storageRef.child(`cnicImages/${fileName}`);
      await imageRef.putFile(result.uri);
      const downloadURL = await imageRef.getDownloadURL();
      setCnicImage(result.uri);
      setCnicImageURL(downloadURL);
    }
  };

const handleSubmit = () => {
  if (!firstName || !lastName || !cnicNo || !phoneNo || !evBikeNo || !cnicImage) {
    Alert.alert('Error', 'Please complete all fields.');
    return;
  }

  profile
    .add({ name: firstName, cnicno: cnicNo, phoneno: phoneNo, bikeno: evBikeNo , Image: cnicImage})
    .then(() => {
      console.log('Done');
      Alert.alert('Your profile has been submitted.');
    })
    .catch((err) => {
      console.log('Error');
      Alert.alert('Error', 'Something went wrong. Please try again.');
    });
};

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="CNIC No."
          value={cnicNo}
          onChangeText={setCnicNo}
        />
        <TextInput
          style={styles.input}
          placeholder="EV Bike No."
          value={evBikeNo}
          onChangeText={setEvBikeNo}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone No."
          value={phoneNo}
          onChangeText={setphoneNo}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
          <Text style={styles.uploadButtonText}>Upload CNIC Image</Text>
        </TouchableOpacity>
        {cnicImage && (
          <Image style={styles.cnicImage} source={{ uri: cnicImage }} />
        )}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
},
inputContainer: {
width: '80%',
},
input: {
borderWidth: 1,
borderColor: '#777',
padding: 8,
marginVertical: 10,
borderRadius: 5,
},
uploadButton: {
backgroundColor: '#3498db',
padding: 10,
marginVertical: 10,
borderRadius: 5,
},
uploadButtonText: {
color: '#fff',
textAlign: 'center',
},
cnicImage: {
width: '100%',
height: 200,
resizeMode: 'contain',
marginVertical: 10,
},
submitButton: {
backgroundColor: '#27ae60',
padding: 10,
marginVertical: 10,
borderRadius: 5,
},
submitButtonText: {
color: '#fff',
textAlign: 'center',
},
});

export default ProfileScreen;
