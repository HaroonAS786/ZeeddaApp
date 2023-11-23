import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ViewPrescriptionManagement from '.';
import {screenAnimation} from '../../../../../utils/helper';

const Stack = createNativeStackNavigator();

const PrescriptionManagementStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ViewPrescriptionManagement'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="ViewPrescriptionManagement"
        component={ViewPrescriptionManagement}
      />
    </Stack.Navigator>
  );
};

export default PrescriptionManagementStack;
