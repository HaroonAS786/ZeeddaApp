import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CustomOrdersScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';
import ViewCustomerOrders from './viewCustomerOrder';

const Stack = createNativeStackNavigator();

const CustomOrdersStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'CustomOrdersScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="CustomOrdersScreen" component={CustomOrdersScreen} />
      <Stack.Screen name="ViewCustomerOrders" component={ViewCustomerOrders} />
    </Stack.Navigator>
  );
};

export default CustomOrdersStack;
