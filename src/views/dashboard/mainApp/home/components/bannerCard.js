import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {IMAGES} from '../../../../../utils/asset';
import {Mixins} from '../../../../../styles';

const BannerCard = ({item, index}) => {
  return (
    <View>
      <Image
        source={IMAGES.bannerImage}
        resizeMode="cover"
        style={styles.mainWrap}
      />
    </View>
  );
};

export default BannerCard;

const styles = StyleSheet.create({
  mainWrap: {
    width: Mixins.scaleSize(340),
    backgroundColor: 'blue',
    marginLeft: 16,
    borderRadius: 8,
  },
});
