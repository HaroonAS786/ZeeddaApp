import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DiscountAndLoyalityScreen from '.';

import {screenAnimation} from '../../../../../utils/helper';
import CreateNewDiscountScreen from './newDiscoount';

const Stack = createNativeStackNavigator();

const DiscountStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'DiscountAndLoyalityScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="DiscountAndLoyalityScreen"
        component={DiscountAndLoyalityScreen}
      />

      <Stack.Screen
        name="CreateNewDiscountScreen"
        component={CreateNewDiscountScreen}
      />
    </Stack.Navigator>
  );
};

export default DiscountStack;
