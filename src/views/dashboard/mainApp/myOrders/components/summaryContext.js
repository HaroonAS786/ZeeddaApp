import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextElement} from '../../../../../components/TextElement';

const SummaryContext = ({
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
      <TextElement
        fontType={rightFontSize ? rightFontSize : 'h8'}
        textStyle={[styles.rightLabel, rightLabelStyle]}>
        {rightLabel}
      </TextElement>
    </View>
  );
};

export default SummaryContext;

const styles = StyleSheet.create({
  mainWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftLabel: {
    color: 'grey',
  },
  rightLabel: {
    color: '#000',
  },
});
