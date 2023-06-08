import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Button';
import Field from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { darkGreen } from '../Constant/Constant';
import { firebase } from '../Config';
const backgroundImg = require('../assets/leaves.jpg');

const Signup = () => {
  const users = firebase.firestore().collection('users')
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const signin = () => {
    users.add({email:email,password:password}).then(()=>{
      console.log("Dome");
       Alert.alert("You have been registered")  
    }).catch(err=>{
      console.log("Asfdas");
    Alert.alert("error","Complete credentials")  

    })
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <Background>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.heading}>Create Account</Text>
            <Field
              placeholder="Full Name"
              onChangeText={(text) => setName(text)}
              style={styles.input}
              leftIcon={<MaterialIcons name="person" size={20} color="#aaa" />}
            />
            <Field
              placeholder="Email"
              keyboardType={'email-address'}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              leftIcon={<MaterialIcons name="email" size={20} color="#aaa" />}
            />
            <Field
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              leftIcon={<MaterialIcons name="lock" size={20} color="#aaa" />}
            />
            <Field
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              style={styles.input}
              leftIcon={<MaterialIcons name="lock" size={20} color="#aaa" />}
            />
            <Btn
              textColor="white"
              bgColor={darkGreen}
              btnLabel="Signup"
              Press={signin}
              style={styles.button}
            />
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupLink}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider}>
              <View style={styles.line}></View>
            </View>
          </View>
        </View>
      </Background>
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
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    marginTop: 50,
  },
 


  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
},
input: {
width: '100%',
marginBottom: 15,
},
button: {
width: '100%',
marginTop: 20,
},
signupContainer: {
flexDirection: 'row',
alignItems: 'center',
marginTop: 20,
},
signupText: {
fontSize: 16,
},
signupLink: {
color: darkGreen,
fontSize: 16,
marginLeft: 5,
},
divider: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 20,
},
line: {
flex: 1,
height: 1,
backgroundColor: '#ccc',
},


});

export default Signup;