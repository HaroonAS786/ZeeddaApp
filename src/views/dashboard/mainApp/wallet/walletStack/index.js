import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import WalletScreen from '..';
import {screenAnimation} from '../../../../../utils/helper';
import PaymentScreen from '../payment';
import SendCashScreen from '../sendCash';

const Stack = createNativeStackNavigator();

const WalletStackNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName={'WalletScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      {/* <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="SendCashScreen" component={SendCashScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
    </Stack.Navigator>
  );
};

export default WalletStackNavigator;
