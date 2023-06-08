import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import Background from '../components/Background';
import Btn from '../components/Button';
import Field from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { darkGreen } from '../Constant/Constant';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../Config';
const backgroundImg = require('../assets/leaves.jpg');

const Login = ( onlogin) => {
  const users = firebase.firestore().collection('users');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};



  useEffect(() => {
    const unsubscribe = users.onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const heading = doc.data()?.heading;
        if (doc.data()?.email && doc.data()?.password) {
  users.push({
    email: doc.data().email,
    password: doc.data().password,
  });
}
      });
      setUsersData(users);
      console.log(users);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = () => {
        setIsEmailValid(validateEmail(email));
setIsPasswordValid(password !== '');


    // Check if email and password are valid
    if (isEmailValid && isPasswordValid) {
      setIsLoggingIn(true);

      // Check if user exists in the database
      const user = usersData.find((user) => user.email === email && user.password === password);
      if (user) {
        
        navigation.navigate('AppDrawer');
      } else {
        setIsLoggingIn(false);
        Alert.alert('Error', 'Invalid email or password');
      }
    }
  };

  return (
  <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <View style={styles.card}>
          <Text style={styles.heading}>EVIONICS</Text>
          <Text style={styles.subheading}>Login to your account</Text>
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
          />
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={login}
            style={styles.button}
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}>
            <View style={styles.line}></View>
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.line}></View>
          </View>
          <Btn
            title="Sign in with Google"
            icon={<MaterialIcons name="google" size={24}  />}
            style={styles.googleButton}
          />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#90EE90',
    fontSize: 55,
    fontWeight: 'bold',
    fontStyle: 'italic', // add fontStyle property
    marginBottom: 50,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
 // add margin top to move the card downwards
  },
  heading: {
    color: darkGreen,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {


color: '#444444',
fontSize: 16,
marginBottom: 30,
},
input: {
width: '100%',
marginBottom: 20,

},
forgotButton: {
alignSelf: 'flex-end',
marginBottom: 20,
},
forgotText: {
color: darkGreen,
fontWeight: 'bold',
fontSize: 16,
},
button: {
width: '100%',
marginTop: 20,
},
signupContainer: {
flexDirection: 'row',
marginTop: 20,
},
signupText: {
color: '#444444',
fontSize: 16,
},
signupLink: {
color: darkGreen,
fontWeight: 'bold',
marginLeft: 5,
fontSize: 16,
},
divider: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 30,
},
line: {
height: 1,
flex: 1,
backgroundColor: '#CCCCCC',
},
dividerText: {
marginHorizontal: 10,
color: '#CCCCCC',
fontSize: 16,
},
googleButton: {
width: '100%',
marginTop: 20,
backgroundColor: '#DB4437',
},
});

export default Login;