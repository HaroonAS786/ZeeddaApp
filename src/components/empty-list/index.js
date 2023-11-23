import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const EmptyList = ({Message}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>{Message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 15,
  },
  textStyle: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
});
export default EmptyList;
