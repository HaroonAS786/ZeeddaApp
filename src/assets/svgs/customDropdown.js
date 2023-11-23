import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {ArrowDown} from '.';
import Spacer from '../../components/Spacer';
import {Colors, Mixins} from '../../styles';

const CustomDropDown = ({
  options,
  formik,
  label,
  style,
  dropContStyle,
  labelStyle,
  field,
  formikError,
  error,
  filterCall,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = option => {
    setIsOpen(false);
    filterCall(option);
    formik?.setFieldValue(field?.name, option); // Set the selected value in Formik state
  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={handleToggle}
        style={[styles.dropdownButton, style]}>
        <Text
          style={[
            field?.value?.label
              ? styles.selectedDropdownText
              : styles.dropdownButtonText,
            labelStyle,
          ]}>
          {field?.value?.label ? field.value?.label : label}
        </Text>
        <Spacer width={4} />
        <ArrowDown />
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownContent, dropContStyle]}>
          <FlatList
            data={options}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectOption(item)}
                style={styles.dropdownOption}>
                <Text style={{color: '#000'}}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.value}
          />
        </View>
      )}
      {formikError && error && (
        <View style={styles.errorlabelContainer}>
          <Text style={styles.errorLabel}>{formikError}</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: Mixins.WINDOW_WIDTH / 2.3,
  },
  dropdownButton: {
    padding: 13,
    borderWidth: 0.5,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedDropdownText: {
    fontSize: 14,
    color: 'black',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: 'lightgrey',
  },
  dropdownContent: {
    position: 'absolute',
    top: 40,
    width: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 0.2,
    borderColor: Colors.BORDER_COLOR,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 4,
  },
  dropdownOption: {
    padding: 10,
  },
  errorlabelContainer: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    marginTop: Mixins.scaleSize(5),
  },

  errorLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
  },
});

export default CustomDropDown;
