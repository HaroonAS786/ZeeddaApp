import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BranchManagementScreen from '.';

import {screenAnimation} from '../../../../../utils/helper';
import CreateNewBranchManagementScreen from './newBranch';

const Stack = createNativeStackNavigator();

const BranchManagementStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'BranchManagementScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="BranchManagementScreen"
        component={BranchManagementScreen}
      />

      <Stack.Screen
        name="CreateNewBranchManagementScreen"
        component={CreateNewBranchManagementScreen}
      />
    </Stack.Navigator>
  );
};

export default BranchManagementStack;
