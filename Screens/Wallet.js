import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Card, Avatar, Button } from 'react-native-paper';

const Wallet = () => {
  const [balance, setBalance] = useState(10000);
  const [coins, setCoins] = useState(0);

  const handleSwap = () => {
    if (balance >= 100) {
      setBalance(balance - 100);
      setCoins(coins + 1);
    } else {
      alert('Insufficient funds');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              source={{
                uri: 'https://picsum.photos/200/200',
              }}
              size={72}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Huzaifa Sarfraz</Text>
              <Text style={styles.email}>huzaifasarfraz291@gmail.com</Text>
            </View>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceTitle}>Wallet Balance</Text>
            <Text style={styles.balance}>Rs{balance}</Text>
            <Text style={styles.coinTitle}>Coins</Text>
            <Text style={styles.coin}>{coins}</Text>
          </View>
          <Button style={styles.button} mode="contained" onPress={handleSwap}>
            Swap (100 Rs)
          </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 16,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  balanceContainer: {
    marginTop: 32,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#42A5F5',
  },
  coinTitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 16,
    marginBottom: 8,
  },
  coin: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#42A5F5',
  },
button: {
  marginTop: 32,
  backgroundColor: '#006400', // dark green color code
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 6,
},
});

export default Wallet;
