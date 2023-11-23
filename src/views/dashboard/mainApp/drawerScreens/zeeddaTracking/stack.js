import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screenAnimation} from '../../../../../utils/helper';
import TrackOrderScreen from '../../myOrders/trackOrder';
import OrderTrackerScreen from '../../myOrders/OrderTrackerScreen';

const Stack = createNativeStackNavigator();

const ZeeddaTrackingStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'OrderTrackerScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="OrderTrackerScreen" component={OrderTrackerScreen} />
    </Stack.Navigator>
  );
};

export default ZeeddaTrackingStack;
