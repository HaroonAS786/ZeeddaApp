import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CommissionScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';

const Stack = createNativeStackNavigator();

const CommissionStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ManageInventoryScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="CommissionScreen" component={CommissionScreen} />
    </Stack.Navigator>
  );
};

export default CommissionStack;
