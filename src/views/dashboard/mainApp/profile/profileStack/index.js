import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen from '..';
import {screenAnimation} from '../../../../../utils/helper';
import ChangePasswordScreen from './changePassword';
import EditProfileScreen from './editProfile';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ProfileScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      {/* <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
