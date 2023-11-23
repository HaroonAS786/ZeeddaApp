import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {hp} from '../styles/responsive';

export default function ButtonBtnRow(props) {
  const {children, style, testId} = props;

  return (
    <View
      testID={testId}
      style={[
        styles.bottomRow,
        children?.length === 2 &&
          children[1] !== false && {
            marginBottom: Platform.OS === 'android' ? hp(4) : hp(2),
          },
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomRow: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: Platform.OS === 'android' ? hp(3) : hp(0),
  },
});
