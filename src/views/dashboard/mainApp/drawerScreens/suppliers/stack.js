import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SupplierManagementScreen from '.';

import {screenAnimation} from '../../../../../utils/helper';
import CreateNewSupplierManagementScreen from './newSuppliers';

const Stack = createNativeStackNavigator();

const SupplierManagementStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'SupplierManagementScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="SupplierManagementScreen"
        component={SupplierManagementScreen}
      />

      <Stack.Screen
        name="CreateNewSupplierManagementScreen"
        component={CreateNewSupplierManagementScreen}
      />
    </Stack.Navigator>
  );
};

export default SupplierManagementStack;
