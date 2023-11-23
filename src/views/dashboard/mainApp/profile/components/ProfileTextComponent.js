import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../styles';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import RippleEffect from '../../../../../components/rippleEffect';

const ProfileTextComponent = ({leftSvg, label, onPress = null, rightSvg}) => {
  return (
    <RippleEffect style={styles.mainTop} onPress={onPress}>
      <View style={styles.mainWrapContainer}>
        <View style={styles.leftView}>
          <Spacer width={8} />
          {leftSvg}
          <Spacer width={12} />
          <TextElement fontType={'h6'} textStyle={styles.label}>
            {label}
          </TextElement>
        </View>
        {rightSvg ? rightSvg : <Spacer />}
        <Spacer width={12} />
      </View>
    </RippleEffect>
  );
};

export default ProfileTextComponent;

const styles = StyleSheet.create({
  mainWrapContainer: {
    height: Mixins.scaleSize(46),
    // width: Mixins.scaleSize(327),
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#F3F3F3',
    justifyContent: 'space-between',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Mixins.scaleSize(300),
  },

  label: {
    color: Colors.BLACK,
    fontWeight: '800',
  },
});
