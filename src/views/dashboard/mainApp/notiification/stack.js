import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NotificationScreen from '.';
import {screenAnimation} from '../../../../utils/helper';

const Stack = createNativeStackNavigator();

const NotificationStackNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName={'NotificationScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStackNavigator;
