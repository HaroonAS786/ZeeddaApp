import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ZeeddaSupportTicketScreen from '.';

import {screenAnimation} from '../../../../../utils/helper';
import NewSupportTicket from './newBranch';

const Stack = createNativeStackNavigator();

const SupportTicketStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ZeeddaSupportTicketScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="NewSupportTicket" component={NewSupportTicket} />

      <Stack.Screen
        name="ZeeddaSupportTicketScreen"
        component={ZeeddaSupportTicketScreen}
      />
    </Stack.Navigator>
  );
};

export default SupportTicketStack;
