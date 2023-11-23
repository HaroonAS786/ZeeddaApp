import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyShopScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';

const Stack = createNativeStackNavigator();

const MyShopStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'MyShopScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="MyShopScreen" component={MyShopScreen} />
    </Stack.Navigator>
  );
};

export default MyShopStack;
