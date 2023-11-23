import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../styles';
import {TextElement} from '../../../../../components/TextElement';
import {PaymentHistorySVGComponent} from '../../../../../assets/svgs';
import Spacer from '../../../../../components/Spacer';
import RippleEffect from '../../../../../components/rippleEffect';
import moment from 'moment';

const HistoryCardItem = ({item}) => {
  return (
    <RippleEffect style={styles.mainWrap}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.rectangleView}>
          <PaymentHistorySVGComponent />
        </View>
        <Spacer width={Mixins.scaleSize(15)} />
        <View>
          <TextElement fontType={'h6'} textStyle={{color: Colors.BLACK}}>
            {item?.transaction_type}
          </TextElement>
          <Spacer height={Mixins.scaleSize(2)} />
          <TextElement fontType={'h8'} textStyle={{color: 'grey'}}>
            {item?.status}
          </TextElement>
        </View>
      </View>
      <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
        <TextElement fontType={'h7'} textStyle={{color: '#25B900'}}>
          ₦ {item?.amount ? item?.amount : 0}
        </TextElement>
        <Spacer height={Mixins.scaleSize(2)} />
        <TextElement fontType={'h8'} textStyle={{color: 'grey'}}>
          {moment(item?.created_at).format('DD MMM, YYYY')}
        </TextElement>
      </View>
    </RippleEffect>
  );
};

export default HistoryCardItem;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.WHITE,
    width: Mixins.WINDOW_WIDTH / 1.1,
    height: Mixins.scaleSize(58),
    marginTop: Mixins.scaleSize(10),
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.2,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },

  rectangleView: {
    width: Mixins.scaleSize(35),
    height: Mixins.scaleSize(29),
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
