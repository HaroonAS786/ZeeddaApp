import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';

const SellingProductsCard = ({item, index}) => {
  return (
    <View style={styles.mainWrap}>
      <View style={styles.viewleft}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1410538853/photo/young-man-in-the-public-park.webp?b=1&s=170667a&w=0&k=20&c=pGdjFVdK-_BhTa6PMy5VNcXdbxVNngzg-OPzMfJKrG8=',
          }}
          resizeMode={'cover'}
          style={styles.imageCon}
        />
        <Spacer width={Mixins.scaleSize(14)} />
        <View>
          <Spacer height={Mixins.scaleSize(8)} />
          <TextElement style={styles.itemLabel}>Lorem ipsum</TextElement>

          <TextElement style={styles.decripLabel}>
            lorem ipsum dolor sit
          </TextElement>
        </View>
      </View>

      <TextElement style={styles.decripLabel}>2 Hrs</TextElement>
    </View>
  );
};

export default SellingProductsCard;

const styles = StyleSheet.create({
  mainWrap: {
    width: '100%',
    height: Mixins.scaleSize(70),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',

    justifyContent: 'space-between',
    borderColor: 'lightgrey',
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  discountTextLabel: {
    fontSize: 7,
    position: 'absolute',
    top: Platform.OS == 'android' ? 1 : 2,
    left: 2,
    fontWeight: Platform.OS == 'android' ? '800' : '400',
  },

  viewleft: {
    flexDirection: 'row',
  },

  imageCon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
  },

  decripLabel: {
    color: 'grey',
  },

  itemLabel: {
    color: Colors.BLACK,
    fontWeight: '500',
  },
});
