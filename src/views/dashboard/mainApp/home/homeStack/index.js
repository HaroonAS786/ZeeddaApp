import {View, Text} from 'react-native';
import React from 'react';
import HomeScreen from '..';
import {screenAnimation} from '../../../../../utils/helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../../profile';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
