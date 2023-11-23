import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import {TextElement} from '../../../../../../components/TextElement';
import Spacer from '../../../../../../components/Spacer';
import moment from 'moment';

const CustomerHistoryCard = ({item}) => {
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';
  return (
    <View style={styles.mainWrap}>
      <View style={styles.topHeader}>
        <TextElement fontType={'h9'} textStyle={styles.label}>
          {`Order ID #${item.id}`}
        </TextElement>
        <TextElement fontType={'h9'} textStyle={styles.label}>
          {moment(item.created_at).format('DD MMM, YYYY')}
        </TextElement>
      </View>
      <Spacer height={Mixins.scaleSize(12)} />

      <View style={styles.contentCont}>
        <Spacer width={Mixins.scaleSize(10)} />
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={{uri: baseUrl + item?.product_picture}}
        />
        <Spacer width={Mixins.scaleSize(10)} />
        <View>
          <TextElement fontType={'h7'} textStyle={styles.title}>
            {item.product_name}
          </TextElement>
          <Spacer height={Mixins.scaleSize(10)} />
          <TextElement fontType={'h8'} textStyle={styles.amount}>
            ₦ {item.product_price}
          </TextElement>
        </View>

        <Spacer width={Mixins.scaleSize(8)} />
      </View>
    </View>
  );
};

export default CustomerHistoryCard;

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
    alignItems: 'center',
  },

  leftView: {
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
