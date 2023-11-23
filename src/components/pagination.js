import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {Colors, Mixins} from '../styles';
import {hp, wp} from '../styles/responsive';
const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [wp(2), wp(10), wp(2)],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, {width: dotWidth, opacity}]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: Mixins.WINDOW_HEIGHT * 0.01,
    borderRadius: hp(5),
    backgroundColor: Colors.WHITE,
    marginHorizontal: Mixins.WINDOW_WIDTH * 0.015,
  },
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
export default Pagination;
