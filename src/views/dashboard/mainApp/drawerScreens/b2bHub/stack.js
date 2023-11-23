import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenAnimation} from '../../../../../utils/helper';
import CheckHubView from '../../myOrders/checkHubView';
import SellAllProductHubs from '../../myOrders/checkHubView/seeAllHub';
import ViewHubsScreen from '../../myOrders/viewHubs';

const Stack = createNativeStackNavigator();

const B2BHubStack = props => {
  const {hubLabel} = props.route.params ?? {};

  return (
    <Stack.Navigator
      initialRouteName={'ViewHubsScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="ViewHubsScreen"
        component={ViewHubsScreen}
        initialParams={{
          hubLabelFromDrawer: hubLabel,
          isHubLabelFromDrawer: true,
          B2BApi: true,
        }}
      />
      <Stack.Screen name="CheckHubView" component={CheckHubView} />
      <Stack.Screen name="SellAllProductHubs" component={SellAllProductHubs} />
    </Stack.Navigator>
  );
};

export default B2BHubStack;
