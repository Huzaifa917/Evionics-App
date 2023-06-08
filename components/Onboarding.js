import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {

   let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 3, 0, 1.2)' : 'rgba(0, 3, 0, 1.2)';

 

    return (
        <View 
            style={{
                width:8,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
              
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16} }>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#ffff',
            image: <Image source={require('../assets/onboarding-img1.png')} />,
            title: 'Dont have time to charge',
            subtitle: 'Book and Swap battery anytime',
          },
          {
            backgroundColor: '#ffff',
            image: <Image source={require('../assets/FINAL.PNG')} />,
            title: 'Swap Battery at our Station',
            
           
          },
          {
            backgroundColor: '#ffff',
            image: <Image source={require('../assets/Monitor.PNG')} />,
            title: 'Monitor Battery Health',
            subtitle: "You can monitor full battery health",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});