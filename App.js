// import React, {useEffect} from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import {LogBox} from 'react-native';

// import Root from './src/rootStack';
// LogBox.ignoreLogs(['new NativeEventEmitter']);
// LogBox.ignoreAllLogs();
// LogBox.ignoreLogs([
//   'ViewPropTypes will be removed',
//   'ColorPropType will be removed',
// ]);

// function App() {
//   useEffect(() => {
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 3000);
//   }, []);
//   return <Root />;
// }

// export default App;

import React from 'react';
import {LogBox} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {Provider, useSelector} from 'react-redux';

import CustomSidebarMenu from './src/CustomSideBarMenu';
import store from './src/redux/store/store';
import {screenAnimation} from './src/utils/helper';
import ForgotPasswordScreen from './src/views/authentication/forgotPassword';
import LoginScreen from './src/views/authentication/login';
import OtpScreen from './src/views/authentication/Otp';
import ResetPasswordScreen from './src/views/authentication/resetPassword';
import SignUpScreen from './src/views/authentication/signUp';
import MyBottomTabs from './src/views/dashboard/bottomTab';
import AdminStack from './src/views/dashboard/mainApp/drawerScreens/admin/stack';
import B2BHubStack from './src/views/dashboard/mainApp/drawerScreens/b2bHub/stack';
import BranchManagementStack from './src/views/dashboard/mainApp/drawerScreens/branchMangemnet/stack';
import CommissionScreen from './src/views/dashboard/mainApp/drawerScreens/commission';
import CustomOrdersStack from './src/views/dashboard/mainApp/drawerScreens/customOrders/stack';
import DeliveryConfirmationScreen from './src/views/dashboard/mainApp/drawerScreens/deliveryconfirmation';
import DiscountAndLoyaltyScreen from './src/views/dashboard/mainApp/drawerScreens/discountAndLoyality';
import DiscountStack from './src/views/dashboard/mainApp/drawerScreens/discountAndLoyality/stack';
import HealthHubScreen from './src/views/dashboard/mainApp/drawerScreens/healthHub';
import HealthHubStack from './src/views/dashboard/mainApp/drawerScreens/healthHub/stack';
import ManageInventoryStack from './src/views/dashboard/mainApp/drawerScreens/manageInventory/stack';
import MyShopStack from './src/views/dashboard/mainApp/drawerScreens/myShop/stack';
import RegisteredProductStack from './src/views/dashboard/mainApp/drawerScreens/registeredProduct/stack';
import ReOrderManagementStack from './src/views/dashboard/mainApp/drawerScreens/reOrderMangement/stack';
import StockTransferStack from './src/views/dashboard/mainApp/drawerScreens/stockTransfer/stack';
import {
  default as SupplierManagementStack,
  default as SuppliersStack,
} from './src/views/dashboard/mainApp/drawerScreens/suppliers/stack';
import TradeHubScreen from './src/views/dashboard/mainApp/drawerScreens/tradeHub';
import TradeHubStack from './src/views/dashboard/mainApp/drawerScreens/tradeHub/stack';
import SupportTicketStack from './src/views/dashboard/mainApp/drawerScreens/zeeddaSupport/stack';
import ZeeddaWalletStackNavigator from './src/views/dashboard/mainApp/drawerScreens/zeeddaWallet/stack';
import ShoppingCartStack from './src/views/dashboard/mainApp/home/cartStack';
import MyOrderStackNavigator from './src/views/dashboard/mainApp/myOrders/myOrderStack';
import TrackOrderScreen from './src/views/dashboard/mainApp/myOrders/trackOrder';
import ProfileScreen from './src/views/dashboard/mainApp/profile';
import ChangePasswordScreen from './src/views/dashboard/mainApp/profile/profileStack/changePassword';
import EditProfileScreen from './src/views/dashboard/mainApp/profile/profileStack/editProfile';
import PaymentScreen from './src/views/dashboard/mainApp/wallet/payment';
import SendCashScreen from './src/views/dashboard/mainApp/wallet/sendCash';
import OnBoarding from './src/views/onBoard';
import InitialOnboard from './src/views/onBoard/initialOnboard';
import ZeeddaTrackingStack from './src/views/dashboard/mainApp/drawerScreens/zeeddaTracking/stack';
import CommissionStack from './src/views/dashboard/mainApp/drawerScreens/commission/stack';
import PaymentStack from './src/views/dashboard/mainApp/drawerScreens/payment/stack';
import PrescriptionManagementStack from './src/views/dashboard/mainApp/drawerScreens/prescriptionManagement/stack';
import ProceedOrderScreen from './src/views/dashboard/mainApp/home/shoopingCart/ProceedOrder';
import ShoppingCartScreen from './src/views/dashboard/mainApp/home/shoopingCart';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export const DrawerStack = () => {
  const authState = useSelector(state => state.auth);

  return (
    <>
      <Stack.Navigator
        initialRouteName={'MyBottomTabs'}
        screenOptions={{
          headerShown: false,
          animations: screenAnimation,
        }}>
        {authState.isLoggedIn ? (
          <Stack.Screen name="MyBottomTabs" component={MyBottomTabs} />
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </>
  );
};

function AuthNavigator() {
  const authState = useSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName={authState.isOnBoard ? 'InitialOnboard' : 'LoginScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen
        name="InitialOnboard"
        component={InitialOnboard}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
        options={{gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}

function App() {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {padding: 0},
            headerShown: false,
          }}
          drawerContent={props => <CustomSidebarMenu {...props} />}>
          <Drawer.Screen
            name="DrawerStack"
            component={DrawerStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="loginScreen"
            component={LoginScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="MyOrderStackNavigator"
            component={MyOrderStackNavigator}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen
            name="ProceedOrderScreen"
            component={ProceedOrderScreen}
          />
          <Drawer.Screen
            name="DiscountStack"
            component={DiscountStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="AdminStack"
            component={AdminStack}
            options={{swipeEnabled: false}}
          />

          <Drawer.Screen
            name="BranchManagementStack"
            component={BranchManagementStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="CommissionScreen"
            component={CommissionScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="CustomOrdersStack"
            component={CustomOrdersStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="DeliveryConfirmationScreen"
            component={DeliveryConfirmationScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ShoppingCartScreen"
            component={ShoppingCartScreen}
            options={{gestureEnabled: false}}
          />
          <Drawer.Screen
            name="DiscountAndLoyaltyScreen"
            component={DiscountAndLoyaltyScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="HealthHubScreen"
            component={HealthHubScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ManageInventoryStack"
            component={ManageInventoryStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="MyShopStack"
            component={MyShopStack}
            options={{swipeEnabled: false}}
          />

          <Drawer.Screen
            name="PrescriptionManagementStack"
            component={PrescriptionManagementStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="RegisteredProductStack"
            component={RegisteredProductStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ReOrderManagementStack"
            component={ReOrderManagementStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="StockTransferStack"
            component={StockTransferStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="SuppliersStack"
            component={SuppliersStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="TradeHubScreen"
            component={TradeHubScreen}
            options={{swipeEnabled: false}}
          />

          <Drawer.Screen
            name="SupplierManagementStack"
            component={SupplierManagementStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="SupportTicketStack"
            component={SupportTicketStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ZeeddaWalletStackNavigator"
            component={ZeeddaWalletStackNavigator}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ZeeddaTrackingStack"
            component={ZeeddaTrackingStack}
            options={{swipeEnabled: false}}
          />

          <Drawer.Screen
            name="CommissionStack"
            component={CommissionStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="TrackOrderScreen"
            component={TrackOrderScreen}
            options={{swipeEnabled: false}}
          />

          <Drawer.Screen
            name="SendCashScreen"
            component={SendCashScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="PaymentStack"
            component={PaymentStack}
            options={{swipeEnabled: false}}
          />

          <Drawer.Screen
            name="ChangePasswordScreen"
            component={ChangePasswordScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="ShoppingCartStack"
            component={ShoppingCartStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="HealthHubStack"
            component={HealthHubStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="TradeHubStack"
            component={TradeHubStack}
            options={{swipeEnabled: false}}
          />
          <Drawer.Screen
            name="B2BHubStack"
            component={B2BHubStack}
            options={{swipeEnabled: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
