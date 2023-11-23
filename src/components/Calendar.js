import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {Colors, Mixins} from '../styles';

const CalendarPickerForm = props => {
  const {
    formikError,
    error,
    values,
    setFieldValue,
    style,
    onRightIconPress,
    rightIcon,
    placeholder,
    formikValue,
    value,
  } = props;
  const styles = getStyles(props);

  const [calendarPopUp, setCalendarPopUp] = useState(false);
  const handleDayPress = day => {
    setFieldValue(formikValue, day.dateString);
    setCalendarPopUp(false);
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={[styles.container, style]}>
          <View style={styles.inputTextContainer}>
            <TouchableOpacity onPress={() => setCalendarPopUp(true)}>
              <Text style={{color: '#000'}}>{value ? value : placeholder}</Text>
            </TouchableOpacity>
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

      <Dialog
        visible={calendarPopUp}
        onTouchOutside={() => {
          setCalendarPopUp(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }>
        <DialogContent>
          <Calendar
            markedDates={{
              [values]: {selected: true, marked: true},
            }}
            onDayPress={handleDayPress}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const getStyles = props =>
  StyleSheet.create({
    mainContainer: {
      width: props.containerWidth
        ? props.containerWidth
        : Mixins.WINDOW_WIDTH / 1.1,
    },
    container: {
      width: props.containerWidth
        ? props.containerWidth
        : Mixins.WINDOW_WIDTH / 1.1,
      paddingHorizontal: 10,
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
      color: 'red',
    },
  });
export default CalendarPickerForm;
