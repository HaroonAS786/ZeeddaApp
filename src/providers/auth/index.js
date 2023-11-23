import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {createContext} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {useDispatch, useSelector} from 'react-redux';
import CustomSidebarMenu from '../../CustomSideBarMenu';

import {screenAnimation} from '../../utils/helper';
import LoginScreen from '../../views/authentication/login';
import MyBottomTabs from '../../views/dashboard/bottomTab';
import OnBoarding from '../../views/onBoard';
// import {SocketContextProvider} from '../../utils/SocketContext';

export const AuthContext = createContext();

const AuthProvider = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  return (
    <AuthContext.Provider value={authState}>
      {true ? <AppStackNavigator /> : <AuthStackNavigator />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  const BottomStack = () => {
    return (
      <Stack.Navigator
        initialRouteName={'MyBottomTabs'}
        screenOptions={{
          headerShown: false,
          animations: screenAnimation,
        }}>
        <Stack.Screen name="MyBottomTabs" component={MyBottomTabs} />
      </Stack.Navigator>
    );
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
        headerShown: false,
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="LoginScreen" component={<LoginScreen />} />
      <Drawer.Screen name="BottomStack" component={BottomStack} />
    </Drawer.Navigator>
  );
};

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'LoginScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="LoginScreen" component={<LoginScreen />} />

      {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="AppStackNavigator" component={AppStackNavigator} /> */}
    </Stack.Navigator>
  );
}
