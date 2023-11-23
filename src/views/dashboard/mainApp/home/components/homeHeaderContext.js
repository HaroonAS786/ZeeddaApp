import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../styles';
import {TextElement} from '../../../../../components/TextElement';
import RippleEffect from '../../../../../components/rippleEffect';

const HomeHeaderContext = ({leftLabel, rightLabel, rightLabelPress = null}) => {
  return (
    <View style={styles.mainWrap}>
      <TextElement fontType={'h5'} textStyle={styles.leftLabel}>
        {leftLabel}
      </TextElement>
      <RippleEffect onPress={rightLabelPress}>
        <TextElement fontType={'h7'} textStyle={styles.rightLabel}>
          {rightLabel}
        </TextElement>
      </RippleEffect>
    </View>
  );
};

export default HomeHeaderContext;
const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Mixins.scaleSize(16),
  },
  topMainWrap: {
    backgroundColor: 'white',
  },

  leftLabel: {
    color: Colors.BLACK,
    fontWeight: '600',
  },
  rightLabel: {
    color: Colors.PRIMARY,
    fontWeight: '400',
  },
});
