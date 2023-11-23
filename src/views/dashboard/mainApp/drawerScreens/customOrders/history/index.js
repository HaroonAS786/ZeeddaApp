import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import CustomerHistoryCard from '../components/historyCard';

const CustomerOrdersHistory = props => {
  return (
    <View style={styles.mainTop}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.ordersHistory}
        renderItem={({item, index}) => (
          <CustomerHistoryCard item={item} key={index} />
        )}
      />
      <Spacer height={Mixins.scaleSize(20)} />
    </View>
  );
};

export default CustomerOrdersHistory;

const styles = StyleSheet.create({
  mainTop: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
