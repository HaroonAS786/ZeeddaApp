import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';

const MyZeeddaOrdersScreen = props => {
  return (
    <SafeAreaView>
      <Text onPress={() => props.navigation.goBack()}>index</Text>
    </SafeAreaView>
  );
};

export default MyZeeddaOrdersScreen;
