import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';
import StepIndicator from 'react-native-step-indicator';

const labels = [
  'Pending',
  'Accepted',
  'Ready to Ship',
  'Shipped',
  'Delivered',
  'Closed',
];
const customStyles = {
  stepIndicatorSize: 22,
  currentStepIndicatorSize: 22,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: Colors.PRIMARY,
  stepStrokeWidth: 0,
  stepStrokeFinishedColor: Colors.PRIMARY,
  stepStrokeUnFinishedColor: Colors.PRIMARY,
  separatorFinishedColor: Colors.PRIMARY,
  separatorUnFinishedColor: Colors.PRIMARY,
  stepIndicatorFinishedColor: Colors.PRIMARY,
  stepIndicatorCurrentColor: 'red',
  stepIndicatorUnFinishedColor: Colors.PRIMARY,
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#FFF',
  stepIndicatorLabelFinishedColor: '#FFF',
  stepIndicatorLabelUnFinishedColor: Colors.PRIMARY,
  labelColor: Colors.BLACK,
  labelSize: 12,
  currentStepLabelColor: Colors.BLACK,
};

const OrderStatus = props => {
  return (
    <>
      <View style={styles.container}>
        <StepIndicator
          stepCount={5}
          customStyles={customStyles}
          currentPosition={props?.status}
          labels={labels}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Mixins.WINDOW_WIDTH,
  },
});

export default OrderStatus;
