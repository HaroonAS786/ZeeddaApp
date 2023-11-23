import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../styles';
import {TextElement} from './TextElement';
import {normalize} from '../styles/responsive';
import {ArrowDown} from '../assets/svgs';
import RippleEffect from './rippleEffect';

const DropDownBtn = props => {
  const {
    placeholder,
    value,
    style,
    onPress,
    error,
    formikError,
    errorStyle,
    disabled = false,
  } = props || {};

  return (
    <View>
      <RippleEffect style={[styles.mainWrap, style]} onPress={onPress}>
        <TextElement
          fontType={'h7'}
          textStyle={{
            fontSize: normalize(14),
            lineHeight: normalize(22),
            color: value?.label
              ? Colors.BLACK
              : 'background: rgba(0, 0, 0, 0.21)',
          }}>
          {value?.label ? value?.label : placeholder}
        </TextElement>
        <ArrowDown />
      </RippleEffect>

      {formikError && error && (
        <View style={[styles.errorlabelContainer, errorStyle]}>
          <Text style={styles.errorLabel}>{formikError}</Text>
        </View>
      )}
    </View>
  );
};

export default DropDownBtn;

const styles = StyleSheet.create({
  mainWrap: {
    width: Mixins.WINDOW_WIDTH / 1.1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Mixins.scaleSize(44),
    paddingHorizontal: Mixins.WINDOW_WIDTH * 0.03,
    borderColor: Colors.BORDER_COLOR,
    borderWidth: 0.2,
    borderRadius: 5,
  },

  errorlabelContainer: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    marginHorizontal: 16,

    marginTop: Mixins.scaleSize(5),
  },

  errorLabel: {
    fontSize: 12,

    fontWeight: '400',
    color: 'red',
  },
});
