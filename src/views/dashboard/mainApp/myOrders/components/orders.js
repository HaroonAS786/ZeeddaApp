import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import OrderCard from './orderCard';
import {Colors, Mixins} from '../../../../../styles';
import Spacer from '../../../../../components/Spacer';

const Orders = props => {
  return (
    <View style={styles.mainTop}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props?.list}
        renderItem={({item, index}) => (
          <OrderCard
            key={index}
            item={item}
            trackOrderPress={props.trackOrderPress}
          />
        )}
      />

      <Spacer height={Mixins.scaleSize(20)} />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  mainTop: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
