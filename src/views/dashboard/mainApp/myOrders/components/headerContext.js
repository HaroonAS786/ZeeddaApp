import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextElement} from '../../../../../components/TextElement';
import {Colors} from '../../../../../styles';
import RippleEffect from '../../../../../components/rippleEffect';

const HeaderContext = ({leftLabel, rightLabel, rightLabelPress}) => {
  return (
    <View style={styles.container}>
      <TextElement fontType={'h5'} textStyle={styles.leftLabel}>
        {leftLabel}
      </TextElement>
      <RippleEffect onPress={rightLabelPress}>
        <TextElement fontType={'h8'} textStyle={styles.rightLabel}>
          {rightLabel}
        </TextElement>
      </RippleEffect>
    </View>
  );
};

export default HeaderContext;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftLabel: {
    color: Colors.BLACK,
  },
  rightLabel: {
    color: Colors.PRIMARY,
  },
});
