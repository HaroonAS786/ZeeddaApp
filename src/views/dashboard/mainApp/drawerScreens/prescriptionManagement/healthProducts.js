import {View, Text, FlatList} from 'react-native';
import React from 'react';
import HealthHubCard from './components/healthhubCard';
import Spacer from '../../../../../components/Spacer';
import {Mixins} from '../../../../../styles';

const HealthProducts = ({item}) => {
  return (
    <View style={{paddingHorizontal: 16, width: '100%'}}>
      <Spacer height={Mixins.scaleSize(30)} />
      <FlatList
        data={item}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <HealthHubCard item={item} />;
        }}
      />
    </View>
  );
};

export default HealthProducts;
