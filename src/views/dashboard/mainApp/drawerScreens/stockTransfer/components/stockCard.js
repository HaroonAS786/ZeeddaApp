import {View, Text, StyleSheet, Platform} from 'react-native';
import React, {useState} from 'react';
import LayoutContainer from '../../../../../../components/layoutContainer';
import {TextElement} from '../../../../../../components/TextElement';
import Spacer from '../../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../../styles';
import moment from 'moment';

const StockTransferCard = ({item, index}) => {
  return (
    <View style={styles.mainWrap}>
      <View>
        <Spacer height={Mixins.scaleSize(10)} />
        <TextElement fontType={'h6'} textStyle={styles.titleLabel}>
          {item.product_name}
        </TextElement>
        <TextElement fontType={'h9'} textStyle={{color: 'grey'}}>
          Item ID : {item?.id}
        </TextElement>
        <Spacer height={Mixins.scaleSize(6)} />
        <TextElement fontType={'h9'} textStyle={styles.labelDesc}>
          Source Branch : {item.source_branch}
        </TextElement>
        <Spacer height={Mixins.scaleSize(6)} />
        <TextElement fontType={'h9'} textStyle={styles.labelDesc}>
          Destination Branch : {item.destination_branch}
        </TextElement>
        <Spacer height={Mixins.scaleSize(6)} />
        <TextElement fontType={'h9'} textStyle={styles.labelDesc}>
          Select Shipping Method
        </TextElement>
        <TextElement fontType={'h9'} textStyle={styles.labelDesc}>
          Status
        </TextElement>
      </View>
      <View>
        <Spacer height={Mixins.scaleSize(6)} />
        <TextElement fontType={'h9'} textStyle={styles.labelDesc}>
          {moment(item.created_at).format('DD MMM, YYYY')}
        </TextElement>
        <Spacer height={Mixins.scaleSize(12)} />
        <TextElement fontType={'h9'} textStyle={styles.labelDesc}>
          Qty : {item.quantity}
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />

        <TextElement fontType={'h5'} textStyle={styles.activeLabel}>
          {item.shipping_method != 'zeedda' ? 'Self-Shipping' : 'Zeedda'}
        </TextElement>
        <TextElement fontType={'h5'} textStyle={styles.activeLabel}>
          {item.status}
        </TextElement>
      </View>
    </View>
  );
};

export default StockTransferCard;

const styles = StyleSheet.create({
  activeLabel: {
    color: Colors.PRIMARY,
  },
  mainWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: Mixins.scaleSize(120),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgrey',
    marginBottom: 20,
  },
  labelDesc: {
    color: 'grey',
  },

  titleLabel: {
    color: Colors.BLACK,
  },
});
