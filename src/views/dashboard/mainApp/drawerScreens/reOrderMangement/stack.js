import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ReOrderManagementScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';

const Stack = createNativeStackNavigator();

const ReOrderManagementStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ReOrderManagementScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="ReOrderManagementScreen"
        component={ReOrderManagementScreen}
      />
    </Stack.Navigator>
  );
};

export default ReOrderManagementStack;
