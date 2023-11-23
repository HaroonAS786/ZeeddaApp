import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import {TextElement} from '../../../../../../components/TextElement';
import Spacer from '../../../../../../components/Spacer';
import moment from 'moment';
import {baseURL} from '../../../../../../utils/asset';

const InventoryCard = ({item}) => {
  return (
    <View style={styles.mainWrap}>
      <View style={styles.topHeader}>
        <Spacer />
        <TextElement fontType={'h9'} textStyle={styles.label}>
          {moment(item?.created_at).format('DD MMM, YYYY')}
        </TextElement>
      </View>
      <Spacer height={Mixins.scaleSize(8)} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.contentCont}>
          <Spacer width={Mixins.scaleSize(20)} />
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={{uri: baseURL + item.product_picture}}
          />
          <Spacer width={Mixins.scaleSize(12)} />
          <View>
            <TextElement fontType={'h7'} textStyle={styles.title}>
              {item?.product_name}
            </TextElement>
            <Spacer height={Mixins.scaleSize(2)} />
            <TextElement fontType={'h9'} textStyle={{color: 'grey'}}>
              Item ID : {item?.id}
            </TextElement>
            <Spacer height={Mixins.scaleSize(2)} />
            <TextElement fontType={'h9'} textStyle={styles.amount}>
              Total Quantity : {item?.opening_stock_quantity} pcs
            </TextElement>

            <Spacer height={Mixins.scaleSize(2)} />
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <TextElement fontType={'h9'} textStyle={{color: 'grey'}}>
                  Available Quality :
                </TextElement>
                <TextElement fontType={'h9'} textStyle={{color: '#00C52B'}}>
                  {item?.quantity} pcs
                </TextElement>
              </View>
              <Spacer width={Mixins.scaleSize(6)} />
              <View style={{flexDirection: 'row'}}>
                <TextElement fontType={'h9'} textStyle={{color: 'grey'}}>
                  Re-order Level :
                </TextElement>
                <TextElement fontType={'h9'} textStyle={{color: 'red'}}>
                  {item?.re_order_level}
                </TextElement>
              </View>
            </View>
          </View>
        </View>

        <Spacer />
      </View>
    </View>
  );
};

export default InventoryCard;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.WHITE,

    width: '100%',
    height: Mixins.scaleSize(120),

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
    width: 50,
    height: 50,
    borderRadius: 100,
  },

  contentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },

  leftView: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
