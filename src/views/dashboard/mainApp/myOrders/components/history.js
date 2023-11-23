import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import HistoryCard from './historyCard';
import {Colors, Mixins} from '../../../../../styles';
import Spacer from '../../../../../components/Spacer';

const History = props => {
  return (
    <View style={styles.mainTop}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props?.item}
        renderItem={({item, index}) => <HistoryCard key={index} item={item} />}
      />
      <Spacer height={Mixins.scaleSize(20)} />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  mainTop: {
    paddingHorizontal: 18,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
