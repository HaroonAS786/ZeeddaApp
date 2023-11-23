import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../styles';
import {normalize} from '../styles/responsive';
import {fontSize, lineHeights, sizes} from '../styles/typography';

const textTypeStyle = textType => {
  switch (textType) {
    case fontSize.h1:
      return {
        fontSize: normalize(sizes.h1),
        lineHeight: lineHeights.h1,
      };
    case fontSize.h2:
      return {
        fontSize: normalize(sizes.h2),
        lineHeight: lineHeights.h2,
      };
    case fontSize.h3:
      return {
        fontSize: normalize(sizes.h3),
        lineHeight: lineHeights.h3,
      };
    case fontSize.h4:
      return {
        fontSize: normalize(sizes.h4),
        lineHeight: lineHeights.h4,
      };
    case fontSize.h5:
      return {
        fontSize: normalize(sizes.h5),
        lineHeight: lineHeights.h5,
      };
    case fontSize.h6:
      return {
        fontSize: normalize(sizes.h6),
        lineHeight: lineHeights.h6,
      };
    case fontSize.h7:
      return {
        fontSize: normalize(sizes.h7),
        lineHeight: lineHeights.h7,
      };
    case fontSize.h8:
      return {
        fontSize: normalize(sizes.h8),
        lineHeight: lineHeights.h8,
      };
    case fontSize.h9:
      return {
        fontSize: normalize(sizes.h9),
        lineHeight: lineHeights.h9,
      };
    default:
      break;
  }
};

const TextElement = props => {
  const {
    onPressText,
    textStyle,
    children,
    font = 'regular' || 'bold',
    fontType = 'h1' ||
      'h2' ||
      'h3' ||
      'h4' ||
      'h5' ||
      'h6' ||
      'h7' ||
      'h8' ||
      'h9',
    ...rest
  } = props;

  return (
    <Text
      onPress={onPressText}
      style={StyleSheet.flatten([
        styles.text,
        StyleSheet.flatten([textTypeStyle(fontSize[fontType])]),
        styles[font],
        textStyle,
      ])}
      {...rest}>
      {children}
    </Text>
  );
};

export {TextElement};

export const styles = StyleSheet.create({
  text: {
    fontSize: sizes.base,
    color: Colors.BLACK,
    textAlign: 'left',
  },
});
