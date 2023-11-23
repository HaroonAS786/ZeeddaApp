import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import React from 'react';

import {Colors, Mixins} from '../styles';
import Spacer from './Spacer';
import RippleEffect from './rippleEffect';

const ButtonComponent = props => {
  return (
    <RippleEffect onPress={props.onPress} disabled={props.disabled}>
      <View style={[styles.buttonStyling, props.style]}>
        {props.image && <Spacer width={24} />}
        {props.loader ? (
          <ActivityIndicator size={'small'} color={Colors.WHITE} />
        ) : (
          <Text style={[styles.buttonTitleStyle, {color: props.titleColor}]}>
            {props.buttonTitle}
          </Text>
        )}
      </View>
    </RippleEffect>
  );
};

const styles = StyleSheet.create({
  buttonStyling: {
    flexDirection: 'row',
    height: Mixins.scaleSize(42),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,
    borderWidth: 1,
  },

  buttonTitleStyle: {
    fontSize: 16,
    // fontFamily: Font.Roboto,
    fontWeight: '600',
  },
});

export default ButtonComponent;
