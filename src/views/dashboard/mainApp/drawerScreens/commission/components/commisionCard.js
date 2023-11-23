import {View, Image, StyleSheet, Platform, Animated} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import {TextElement} from '../../../../../../components/TextElement';
import Spacer from '../../../../../../components/Spacer';
import {LeftArrowSVGComponent} from '../../../../../../assets/svgs';
import moment from 'moment';

const CommissionCard = ({item}) => {
  return (
    <View style={styles.mainWrap}>
      <View style={styles.leftView}>
        <Spacer width={Mixins.scaleSize(12)} />
        <View>
          <Spacer height={Mixins.scaleSize(6)} />
          <TextElement fontType={'h9'} textStyle={styles.orderIdLabel}>
            Order ID : {item.order_id}
          </TextElement>
          <Spacer height={Mixins.scaleSize(6)} />
          <TextElement fontType={'h9'} textStyle={styles.orderIdLabel}>
            User ID : {item.user_id}
          </TextElement>
          <Spacer height={Mixins.scaleSize(6)} />
          <TextElement fontType={'h9'} textStyle={styles.orderIdLabel}>
            Payment ID: {item.id}
          </TextElement>
          <Spacer height={Mixins.scaleSize(6)} />
          <TextElement fontType={'h9'} textStyle={styles.orderIdLabel}>
            Date : {moment(item.created_at).format('DD MMM, YYYY')}
          </TextElement>
          <Spacer height={Mixins.scaleSize(6)} />
          <TextElement fontType={'h9'} textStyle={styles.orderIdLabel}>
            Zeedda Commission: {item.zeedda_commission}
          </TextElement>
          <Spacer height={Mixins.scaleSize(6)} />
          <TextElement fontType={'h9'} textStyle={styles.orderIdLabel}>
            Amount Due To Seller:{' '}
            {item?.payment_amount - item.zeedda_commission - item?.order?.vat}
          </TextElement>
        </View>
      </View>

      <View style={styles.rightView}>
        <TextElement fontType={'h8'} textStyle={styles.amountLabel}>
          N {item.payment_amount}
        </TextElement>
        <Spacer width={Mixins.scaleSize(6)} />
        <LeftArrowSVGComponent />
      </View>
    </View>
  );
};

export default CommissionCard;

const styles = StyleSheet.create({
  mainWrap: {
    // width: Mixins.WINDOW_WIDTH / 1.1,
    // height: Mixins.scaleSize(56),
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    marginBottom: 20,
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },

  orderIdLabel: {
    color: 'grey',
  },
  amountLabel: {
    color: Colors.PRIMARY,
    fontWeight: '500',
  },

  leftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
