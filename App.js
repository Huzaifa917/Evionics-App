import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookMe from './Screens/bookme';
import Signup from './Screens/Signup'
import LogoutButton from './Constant/Logout'
import {firebase} from './Config';

import ProfileScreen from './Screens/Profile'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import OnboardingScreen from './components/Onboarding'
import TimerScreen from './Screens/Timer'


// You can import from local files
import Login from './Screens/Login'
import EV from './Screens/GeoMaps'
import HomeScreen from './Screens/H'
import EVCalculatorScreen from './Screens/Cost'
import Wallet from './Screens/Wallet'


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function HomeStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#013220',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="bars" size={25} color="#fff" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function WalletStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          title: 'Wallet',
          headerStyle: {
            backgroundColor: '#013220',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="bars" size={25} color="#fff" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function CostStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cost Comparison"
        component={EVCalculatorScreen}
        options={{
          title: 'Cost',
          headerStyle: {
            backgroundColor: '#013220',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="bars" size={25} color="#fff" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function EVStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EV"
        component={EV}
        options={{
          title: 'EV Stations',
          headerStyle: {
            backgroundColor: '#013220',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="bars" size={25} color="#fff" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EV"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#013220',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="bars" size={25} color="#fff" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function BookStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookMe"
        component={BookMe}
        options={{
          title: 'Book Now',
          headerStyle: {
            backgroundColor: '#013220',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="bars" size={25} color="#fff" style={{ marginLeft: 20 }} />
            </TouchableOpacity>
          ),
           
        }}
      />
    </Stack.Navigator>
  );
}



function AppDrawer() {
 

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeStack} options={{
drawerIcon: ({ focused, size }) => (
<Icon name="home" size={size} color={focused ? '#fff' : '#013220'} />
),
}}/>
      <Drawer.Screen
name="EV Stations"
component={EVStack}
options={{
drawerIcon: ({ focused, size }) => (
<Icon name="map" size={size} color={focused ? '#fff' : '#013220'} />
),
}}
/>
      <Drawer.Screen name="Cost Comparison" component={CostStack} options={{
drawerIcon: ({ focused, size }) => (
<Icon name="calculator" size={size} color={focused ? '#fff' : '#013220'} />
),
}}/>
      <Drawer.Screen name="Book me" component={BookStack} options={{
drawerIcon: ({ focused, size }) => (
<Icon name="battery-full" size={size} color={focused ? '#fff' : '#013220'} />
)
}} />
<Drawer.Screen
  name="Profile"
  component={ProfileStack}
  options={{
    drawerIcon: ({ focused, size }) => (
      <MaterialCommunityIcons
        name="account-circle"
        size={size}
        color={focused ? '#fff' : '#013220'}
      />
    ),
  }}
/>


 <Drawer.Screen name="Wallet" component={WalletStack} options={{
drawerIcon: ({ focused, size }) => (
<Icon name="credit-card" size={size} color={focused ? '#fff' : '#013220'} />
),
}} />
      <Drawer.Screen name="Logout" component={Login} />
      
    
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
 

       <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      
         <Stack.Screen name="Login">
          {(props) => <Login {...props} handleLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="AppDrawer">
          {(props) => <AppDrawer {...props} handleLogout={handleLogout} />}
        </Stack.Screen>
        
          <Stack.Screen name="BookMe" component={BookMe} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="TimerScreen" component={TimerScreen} />
     
          
          <Stack.Screen name = 'Signup' component = {Signup}/>

          
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
