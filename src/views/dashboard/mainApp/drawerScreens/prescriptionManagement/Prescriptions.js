import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Spacer from '../../../../../components/Spacer';
import PrescriptionsCard from './components/prescriptionCard';
import {Mixins} from '../../../../../styles';

const Prescriptions = props => {
  return (
    <View style={{paddingHorizontal: 16, width: '100%'}}>
      <Spacer height={Mixins.scaleSize(35)} />
      <FlatList
        data={props?.item}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <PrescriptionsCard item={item} />;
        }}
      />
    </View>
  );
};

export default Prescriptions;
