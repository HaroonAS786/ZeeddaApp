import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import {Mixins} from '../../../../../styles';

const OrderSummaryContext = ({
  leftLabel,
  rightLabel,
  leftLabelStyle,
  rightLabelStyle,
  leftFontSize,
  rightFontSize,
}) => {
  return (
    <View style={styles.mainWarp}>
      <TextElement
        fontType={leftFontSize ? leftFontSize : 'h9'}
        textStyle={[styles.leftLabel, leftLabelStyle]}>
        {leftLabel}
      </TextElement>
      <Spacer width={Mixins.scaleSize(10)} />
      <TextElement
        fontType={rightFontSize ? rightFontSize : 'h8'}
        textStyle={[styles.rightLabel, rightLabelStyle]}>
        {rightLabel}
      </TextElement>
    </View>
  );
};

export default OrderSummaryContext;

const styles = StyleSheet.create({
  mainWarp: {
    flexDirection: 'row',
  },

  leftLabel: {
    color: 'grey',
  },
  rightLabel: {
    color: '#000',
  },
});
