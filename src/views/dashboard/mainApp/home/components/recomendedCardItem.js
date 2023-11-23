import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../styles';
import {
  CurrencySVGComponent,
  DiscountbannerSvg,
} from '../../../../../assets/svgs';
import Spacer from '../../../../../components/Spacer';

const RecommendedCardItem = ({item}) => {
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';
  return (
    <View style={styles.mainWrap}>
      <DiscountbannerSvg />
      <Text style={styles.discountTextLabel}>30 % off</Text>
      <Spacer height={Mixins.scaleSize(8)} />
      <Image
        resizeMode={'contain'}
        style={styles.imageCon}
        source={{uri: baseUrl + item.product_picture}}
      />
      <View style={styles.divider} />
      <Spacer height={Mixins.scaleSize(8)} />
      <Text style={styles.itemLabel}>{item?.product_name}</Text>
      <View style={styles.currencyViewCon}>
        <CurrencySVGComponent />
        <Text style={styles.currencyLabel}>{item?.product_price}</Text>
      </View>
    </View>
  );
};

export default RecommendedCardItem;

const styles = StyleSheet.create({
  mainWrap: {
    width: Mixins.scaleSize(85),
    height: Mixins.scaleSize(120),
    borderRadius: 4,
    backgroundColor: '#FAF7F7',

    marginHorizontal: 20,
    marginVertical: 20,
  },

  discountTextLabel: {
    fontSize: 7,
    position: 'absolute',
    top: Platform.OS == 'android' ? 1 : 2,
    left: 2,
    fontWeight: Platform.OS == 'android' ? '800' : '400',
  },

  imageCon: {
    width: Mixins.scaleSize(68),
    height: Mixins.scaleSize(55),
    alignSelf: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: 'lightgrey',
  },

  currencyViewCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
  },
  currencyLabel: {
    fontSize: 12,
    color: Colors.PRIMARY,
  },

  itemLabel: {
    fontSize: 10,
    color: Colors.BLACK,
    paddingLeft: 8,
  },
});
