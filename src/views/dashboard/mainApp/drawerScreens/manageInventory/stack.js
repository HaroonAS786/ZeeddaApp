import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ManageInventoryScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';
import NewInventoryScreen from './components/newInventory';

const Stack = createNativeStackNavigator();

const ManageInventoryStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ManageInventoryScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="ManageInventoryScreen"
        component={ManageInventoryScreen}
      />
      <Stack.Screen name="NewInventoryScreen" component={NewInventoryScreen} />
    </Stack.Navigator>
  );
};

export default ManageInventoryStack;
