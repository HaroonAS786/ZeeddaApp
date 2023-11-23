import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../styles';
import {IMAGES} from '../../../../../utils/asset';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import RippleEffect from '../../../../../components/rippleEffect';

const UserProfileLabel = props => {
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';

  return (
    <TouchableOpacity
      style={styles.imageViewCont}
      onPress={props.onPress}
      activeOpacity={1}>
      <TextElement fontType={'h5'} textStyle={styles.label}>
        My Profile
      </TextElement>
      <Spacer height={Mixins.scaleSize(10)} />
      <Image
        style={styles.image}
        source={{uri: baseUrl + props?.profile}}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default UserProfileLabel;

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130,
    borderRadius: 65,

    alignSelf: 'center',
  },

  imageViewCont: {
    height: Mixins.WINDOW_HEIGHT * 0.2,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'android' ? 16 : 0,
  },
  label: {
    color: Colors.WHITE,
    fontWeight: '500',
  },
});
