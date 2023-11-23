import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';
import {wp, hp} from '../../../../../styles/responsive';

const {width} = Dimensions.get('screen');

const BannerPagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [wp(2), wp(2), wp(2)],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.2],
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
    height: 8,

    borderRadius: hp(100),
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: Mixins.WINDOW_WIDTH * 0.002,
  },
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
export default BannerPagination;
