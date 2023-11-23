import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RegisterProductScreen from '.';

import {screenAnimation} from '../../../../../utils/helper';

const Stack = createNativeStackNavigator();

const RegisteredProductStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'RegisterProductScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="RegisteredProductScreen"
        component={RegisterProductScreen}
      />
    </Stack.Navigator>
  );
};

export default RegisteredProductStack;
