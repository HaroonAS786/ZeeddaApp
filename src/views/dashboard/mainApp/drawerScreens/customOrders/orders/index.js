import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import CustomerCard from '../components/customerCard';

const CustomerOrders = props => {
  return (
    <View style={styles.mainTop}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.orders}
        renderItem={({item, index}) => (
          <CustomerCard
            key={index}
            item={item}
            viewOrderPress={props.viewOrderPress}
          />
        )}
      />

      <Spacer height={Mixins.scaleSize(20)} />
    </View>
  );
};

export default CustomerOrders;

const styles = StyleSheet.create({
  mainTop: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
