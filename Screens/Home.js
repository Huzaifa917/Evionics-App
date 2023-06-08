import React from 'react';
import { View, Text, Image, StyleSheet , TextInput} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

const items = [
  {
    title: 'Calendar',
    subtitle: 'March, Wednesday',
    event: '3 Events',
 
  },
  {
    title: 'EV STATIONS',
    subtitle: 'ISLAMABAD',
 
  
  },
  {
    title: 'Locations',
    subtitle: '',
    event: '',
  
  },
  {
    title: 'ABOUT US',
    subtitle: 'EVIONICS',
   
   
  },
 
  
];

export default function GridDashboard() {
  const color = '#006400';

  return (
    <View style={styles.container}>
     
    
         <Text style={styles.title}>EVIONICS </Text>
          <View style={styles.boxInput}>
        <TextInput style={styles.input} placeholder="EV SWAPPING STATIONS" />
        <Icon name="search" size={15} />
      </View>
      <FlatGrid
        itemDimension={130}
        data={items}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: color }]}>
            <Image source={item.img} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            <Text style={styles.itemEvent}>{item.event}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
    title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 10,
    fontStyle: 'italic', color: '#006400',
     textAlign: 'center',
   
  },
  itemImage: {
    width: 42,
  },
  itemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 14,
  },
    boxInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#D0D0D0',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 17,
    marginRight: 15,
    marginLeft: 15,
    paddingRight: 10,
  }, input: {
    height: 36,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    flex: 1,
  },
  itemSubtitle: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 8,
  },
  itemEvent: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 14,
  },
});
