import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const CardBox = props => (
  <TouchableOpacity
    onPress={props?.onPress}
    key={props?.key}
    style={[styles.CardContainer, props.externalContainerStyle]}
    activeOpacity={1}>
    {props.children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  CardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default CardBox;
