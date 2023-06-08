import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LogoutButton() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform any logout actions here (e.g. clearing user data, etc.)
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
     setIsLoggedIn(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLogout}>
      <Icon name="sign-out" size={20} color="#013220" />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: '#013220',
  },
});
