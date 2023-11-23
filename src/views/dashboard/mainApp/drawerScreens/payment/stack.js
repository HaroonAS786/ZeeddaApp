import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenAnimation} from '../../../../../utils/helper';
import PaymentScreen from '../../wallet/payment';

const Stack = createNativeStackNavigator();

const PaymentStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'PaymentScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        initialParams={{openFromDrawer: true}}
      />
    </Stack.Navigator>
  );
};

export default PaymentStack;
