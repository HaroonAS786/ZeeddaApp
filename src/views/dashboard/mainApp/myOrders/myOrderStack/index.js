import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyOrdersScreen from '..';
import {screenAnimation} from '../../../../../utils/helper';
import CheckHubView from '../checkHubView';
import SellAllProductHubs from '../checkHubView/seeAllHub';
import OrderHubsScreen from '../hubs';
import TrackOrderScreen from '../trackOrder';
import ViewHubsScreen from '../viewHubs';

const Stack = createNativeStackNavigator();

const MyOrderStackNavigator = props => {
  const {fromDrawer} = props.route.params ?? {};

  return (
    <Stack.Navigator
      initialRouteName={'MyOrdersScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
        initialParams={{fromDrawer: fromDrawer}}
      />
      <Stack.Screen name="OrderHubsScreen" component={OrderHubsScreen} />
      <Stack.Screen name="ViewHubsScreen" component={ViewHubsScreen} />
      <Stack.Screen name="CheckHubView" component={CheckHubView} />
      <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
      <Stack.Screen name="SellAllProductHubs" component={SellAllProductHubs} />
    </Stack.Navigator>
  );
};

export default MyOrderStackNavigator;
