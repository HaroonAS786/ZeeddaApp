import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import OrderSummaryContext from '../../../home/components/orderSummaryContext';
import {DeleteSVGComponent} from '../../../../../../assets/svgs';
import RippleEffect from '../../../../../../components/rippleEffect';
import moment from 'moment';

const DiscountCard = ({item, setDeletePopUp, setDeleteId}) => {
  return (
    <View style={styles.mainWrap}>
      <Spacer height={Mixins.scaleSize(14)} />
      <OrderSummaryContext
        leftLabel={'ID:'}
        rightLabel={item.id}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Promo title:'}
        rightLabel={item.promo_title}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: Colors.PRIMARY}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Promo Code:'}
        rightLabel={item.promo_code}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Product Name:'}
        rightLabel={item.product_names}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Discount:'}
        rightLabel={`${item.amount_percent} %`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: Colors.YELLOW_PRIMARY}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Start Date:'}
        rightLabel={moment(item?.start_date).format('DD MMM, YYYY')}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'End Date:'}
        rightLabel={moment(item?.end_date).format('DD MMM, YYYY')}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Hub:'}
        rightLabel={'Zeedda Hub'}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Created By:'}
        rightLabel={item.user_id}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(8)} />
      <View style={styles.footerView}>
        <OrderSummaryContext
          leftLabel={'Created At:'}
          rightLabel={moment(item?.created_at).format('DD MMM, YYYY')}
          leftLabelStyle={{color: Colors.BLACK}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: 'grey'}}
          rightFontSize={'h6'}
        />
      </View>

      <RippleEffect
        style={styles.deleteView}
        onPress={() => {
          setDeletePopUp(true);
          setDeleteId(item.id);
        }}>
        <DeleteSVGComponent width={24} height={22} />
      </RippleEffect>
    </View>
  );
};

export default DiscountCard;

const styles = StyleSheet.create({
  mainWrap: {
    // height:
    //   Platform.OS === 'ios' ? Mixins.scaleSize(310) : Mixins.scaleSize(360),
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  deleteView: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
