import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextElement} from '../../../../../components/TextElement';
import InputTextComponent from '../../../../../components/InputTextField';
import {Colors, Mixins} from '../../../../../styles';
import Spacer from '../../../../../components/Spacer';

const ProfileTextInput = ({
  label,
  placeholder,
  leftIcon,
  rightIcon,
  rightIconPress,
  placeholderTextColor,
  obsecure,
  formikError,
  onChangeText,
  inputValue,
  error,
  containerWidth,
  keyboardType,
}) => {
  return (
    <View>
      <TextElement fontType={'h6'} textStyle={styles.label}>
        {label}
      </TextElement>
      <Spacer height={Mixins.scaleSize(12)} />
      <InputTextComponent
        capatalize={'none'}
        placeholder={placeholder}
        secureTextEntry={obsecure}
        style={styles.inputView}
        width={Mixins.scaleSize(260)}
        backgroundColor={'transparent'}
        textInputColor={'#E5E5E6'}
        autoCorrect={false}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onRightIconPress={rightIconPress}
        placeholderTextColor={placeholderTextColor}
        formikError={formikError}
        onChangeText={onChangeText}
        inputValue={inputValue}
        error={error}
        containerWidth={containerWidth}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default ProfileTextInput;

const styles = StyleSheet.create({
  label: {
    color: Colors.BLACK,
    fontWeight: '600',
  },

  inputView: {
    borderColor: '#F3F3F3',
    borderWidth: 1,
    borderRadius: 12,
  },
});
