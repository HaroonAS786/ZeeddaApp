import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const RadioButtonGroup = ({
  options,
  form,
  formikValue,
  value,
  width,
  radioContainer,
  buttonStyle,
  dropdownClose,
}) => {
  return (
    <View style={[styles.radioButtonContainer, width, radioContainer]}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[styles.radioButton, buttonStyle]}
            onPress={() => {
              dropdownClose();
              form?.setFieldValue(formikValue, option);
            }}>
            <View style={styles.radioButtonSelected}>
              {value?.key == option?.key ? (
                <View style={styles.radioButtonActive} />
              ) : (
                <View style={styles.radioButtonInactive} />
              )}
            </View>
            <Text style={styles.radioButtonText}>{option.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  radioButtonInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioButtonText: {
    fontSize: 12,
    color: '#000',
  },
});

export default RadioButtonGroup;
