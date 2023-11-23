import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import StockTransferScreen from '.';
import {screenAnimation} from '../../../../../utils/helper';
import AddTransferStock from './addTransferStock';

const Stack = createNativeStackNavigator();

const StockTransferStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'StockTransferScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen
        name="StockTransferScreen"
        component={StockTransferScreen}
      />
      <Stack.Screen name="AddTransferStock" component={AddTransferStock} />
    </Stack.Navigator>
  );
};

export default StockTransferStack;
