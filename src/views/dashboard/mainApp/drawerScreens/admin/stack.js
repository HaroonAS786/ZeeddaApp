import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AdminScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';
import CreateNewAdminScreen from './newAdmin';
import LoginScreen from '../../../../authentication/login';

const Stack = createNativeStackNavigator();

const AdminStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'AdminScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen
        name="CreateNewAdminScreen"
        component={CreateNewAdminScreen}
      />
    </Stack.Navigator>
  );
};

export default AdminStack;
