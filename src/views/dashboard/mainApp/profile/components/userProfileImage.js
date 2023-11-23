import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {CameraSVGComponent} from '../../../../../assets/svgs';
import {Colors, Mixins} from '../../../../../styles';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';

const UserProfileImage = ({url, cameraPress}) => {
  return (
    <View style={styles.mainWrap}>
      <TextElement fontType={'h5'} textStyle={styles.editLabel}>
        Edit Profile
      </TextElement>
      <Spacer height={Mixins.scaleSize(10)} />
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScXCBbVDN3wRRCYE-vU2dr5oaTOHIRQGKIIXIH2JCi9e4JbLKwwDRaFUattUqWNZdp0I8&usqp=CAU',
        }}
        style={styles.image}
        borderRadius={100}
      />
      <TouchableOpacity style={styles.cameraStyle} onPress={cameraPress}>
        <CameraSVGComponent />
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileImage;

const styles = StyleSheet.create({
  cameraStyle: {
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backgroundColor: Colors.PRIMARY,
    width: 30,
    height: 30,
    borderRadius: 30,
  },

  mainWrap: {
    alignItems: 'center',
  },

  image: {
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  editLabel: {
    color: Colors.BLACK,
  },
});
