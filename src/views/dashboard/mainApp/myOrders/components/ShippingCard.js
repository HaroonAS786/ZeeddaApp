import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../styles';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import RippleEffect from '../../../../../components/rippleEffect';
import moment from 'moment';

const ShippingCard = ({item, trackOrderPress}) => {
  return (
    <View style={styles.mainWrap}>
      <View style={styles.topHeader}>
        <TextElement fontType={'h9'} textStyle={styles.label}>
          {`Shipping ID #${item?.id}`}
        </TextElement>
        <TextElement fontType={'h9'} textStyle={styles.label}>
          {moment(item?.created_at).format('DD MMM, YYYY')}
        </TextElement>
      </View>
      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.contentCont}>
        <View style={{paddingLeft: 10}}>
          <TextElement fontType={'h7'} textStyle={styles.title}>
            {item?.product_title}
          </TextElement>
          <Spacer width={Mixins.scaleSize(4)} />
          <TextElement fontType={'h8'} textStyle={styles.amount}>
            {item?.product_description}
          </TextElement>
          <Spacer width={Mixins.scaleSize(4)} />
          <TextElement fontType={'h8'} textStyle={styles.desc}>
            {`Product weight : ${item?.product_weight}`}
          </TextElement>
        </View>

        <View style={styles.leftView}>
          <Spacer height={Mixins.scaleSize(20)} />
          <TextElement
            fontType={'h6'}
            textStyle={{...styles.desc, color: 'orange', fontSize: 12}}>
            Pending
          </TextElement>
          <Spacer height={Mixins.scaleSize(8)} />
          <RippleEffect style={styles.viewOrder} onPress={trackOrderPress}>
            <TextElement fontType={'h9'} textStyle={styles.trackLabel}>
              Track order
            </TextElement>
          </RippleEffect>
        </View>
        <Spacer width={Mixins.scaleSize(8)} />
      </View>
    </View>
  );
};

export default ShippingCard;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.WHITE,

    width: '100%',
    height: Mixins.scaleSize(116),

    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.07)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  quantityLabel: {
    color: 'black',
    fontWeight: '400',
  },

  label: {
    color: 'lightgrey',
    fontWeight: '400',
  },
  trackLabel: {
    color: 'white',
    fontWeight: '400',
  },
  title: {
    color: Colors.BLACK,
    fontWeight: '400',
    width: 170,
  },
  desc: {
    color: '#25B900',
    fontWeight: '400',
  },
  amount: {
    color: Colors.PRIMARY,
    fontWeight: '400',
  },
  topHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 6,
    justifyContent: 'space-between',
  },

  viewOrder: {
    width: Mixins.scaleSize(68),
    height: Mixins.scaleSize(22),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: Mixins.scaleSize(70),
    height: Mixins.scaleSize(60),
    borderRadius: 10,
  },

  contentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftView: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
