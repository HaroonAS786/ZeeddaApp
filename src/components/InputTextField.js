import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {Colors, Mixins} from '../styles';
import Spacer from './Spacer';
import RippleEffect from './rippleEffect';

const InputTextComponent = props => {
  const {
    error,
    formikError,
    placeholder,
    onChangeText,
    secureTextEntry,
    inputValue,
    onRightIconPress,
    onLeftIconPress,
    rightIcon,
    leftIcon,
    editable,
    keyboardType,
    placeholderTextColor,
    onSubmitEditing,
    style,
    multiline,
    autoFocus,
    capatalize,
    autoCorrect,
  } = props;

  const styles = getStyles(props);

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={[styles.container, style]}>
          {leftIcon && (
            <>
              <Spacer width={5} />
              <TouchableOpacity onPress={onLeftIconPress} activeOpacity={1}>
                {leftIcon}
              </TouchableOpacity>
              <Spacer width={5} />
            </>
          )}

          <View style={styles.inputTextContainer}>
            <TextInput
              multiline={multiline}
              style={styles.inputTextChildContainer}
              editable={editable}
              autoCapitalize={capatalize || 'sentences'}
              autoFocus={autoFocus}
              placeholder={placeholder}
              placeholderTextColor={'#000'}
              value={inputValue}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
              blurOnSubmit
              autoCorrect={autoCorrect === false ? false : true}
            />
          </View>

          {rightIcon && (
            <>
              <Spacer width={10} />
              <RippleEffect
                onPress={onRightIconPress}
                rippleColor={Colors.BLACK}>
                {rightIcon}
              </RippleEffect>
            </>
          )}
        </View>
        {formikError && error && (
          <View style={styles.errorlabelContainer}>
            <Text style={styles.errorLabel}>{formikError}</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default InputTextComponent;
const getStyles = props =>
  StyleSheet.create({
    mainContainer: {
      overflow: 'hidden',
      width: props.containerWidth
        ? props.containerWidth
        : Mixins.WINDOW_WIDTH / 1.1,
    },
    container: {
      width: props.containerWidth
        ? props.containerWidth
        : Mixins.WINDOW_WIDTH / 1.1,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      height: props.containerHeight
        ? props.containerHeight
        : Mixins.scaleSize(44),
      borderColor: Colors.BORDER_COLOR,
      borderWidth: 0.2,
      borderRadius: Platform.OS === 'ios' ? 5 : 2,
    },

    errorlabelContainer: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      marginTop: Mixins.scaleSize(5),
    },

    errorLabel: {
      fontSize: 12,

      fontWeight: '400',
      color: props.errorLabelColor ? props.errorLabelColor : 'red',
    },

    label: {
      color: props.labelColor ? props.labelColor : Colors.heading,

      fontWeight: '400',
    },

    inputTextContainer: {
      overflow: 'hidden',
      width: props?.width ? props?.width : Mixins.scaleSize(280),
      paddingStart: props.leftIcon ? 0 : Mixins.scaleSize(6),
      height: props.containerHeight && props.containerHeight,
    },

    inputTextChildContainer: {
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      minHeight: Mixins.scaleSize(44),
      paddingLeft: props.leftIcon ? 10 : 0,
      color: '#000',
    },
  });
