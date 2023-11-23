import React from 'react';
import {screenAnimation} from '../../../../../utils/helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingCartScreen from '../shoopingCart';
import AddToCartScreen from '../shoopingCart/addToCart';
import OrderCompleteScreen from '../shoopingCart/orderComplete';
import ProceedOrderScreen from '../shoopingCart/ProceedOrder';
import ReviewOrderScreen from '../shoopingCart/reviewOrder';

const Stack = createNativeStackNavigator();

const ShoppingCartStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={'ProceedOrderScreen'}
      screenOptions={{
        headerShown: false,
        animations: screenAnimation,
      }}>
      <Stack.Screen name="ShoppingCartScreen" component={ShoppingCartScreen} />
      <Stack.Screen name="AddToCartScreen" component={AddToCartScreen} />
      <Stack.Screen
        name="OrderCompleteScreen"
        component={OrderCompleteScreen}
      />
      <Stack.Screen name="ProceedOrderScreen" component={ProceedOrderScreen} />
      <Stack.Screen name="ReviewOrderScreen" component={ReviewOrderScreen} />
    </Stack.Navigator>
  );
};

export default ShoppingCartStack;
