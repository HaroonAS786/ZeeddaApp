import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {screenAnimation} from '../../../../../utils/helper';
import WalletScreen from '../../wallet';
import PaymentScreen from '../../wallet/payment';
import SendCashScreen from '../../wallet/sendCash';

const Stack = createNativeStackNavigator();

const ZeeddaWalletStackNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName={'WalletScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="SendCashScreen" component={SendCashScreen} />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        initialParams={{openFromDrawer: false}}
      />
    </Stack.Navigator>
  );
};

export default ZeeddaWalletStackNavigator;
