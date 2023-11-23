import {View, Text, StyleSheet, Platform, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {TextElement} from '../../../../../../components/TextElement';
import Spacer from '../../../../../../components/Spacer';
import RippleEffect from '../../../../../../components/rippleEffect';
import HeaderLogoComponent from '../../../../../../assets/svgs/HeaderLogo';
import {Colors, Mixins} from '../../../../../../styles';
import {BackArrow} from '../../../../../../assets/svgs';
import HamBurgerSVGComponent from '../../../../../../assets/svgs/hamBurgerSvg';
import CommissionView from './CommissionView';

const CommissionHeader = props => {
  const position = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    animateView();
  }, []);

  const animateView = () => {
    Animated.timing(position, {
      toValue: 0, // Final position on the X-axis
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  };

  return (
    <View style={styles.mainWrap2}>
      {Platform.OS === 'ios' ? (
        <Spacer height={Mixins.scaleSize(50)} />
      ) : (
        <Spacer height={Mixins.scaleSize(35)} />
      )}
      <View style={styles.header2wrap}>
        <RippleEffect onPress={props.onPress}>
          <HamBurgerSVGComponent />
        </RippleEffect>

        <HeaderLogoComponent
          width={Mixins.scaleSize(190)}
          height={Mixins.scaleSize(58)}
        />
        <Spacer />
        <Spacer />
      </View>
      <Spacer height={Mixins.scaleSize(10)} />
      <View style={styles.content}>
        <TextElement fontType={'h5'} textStyle={styles.label}>
          {props.label}
        </TextElement>
      </View>
      {/* <Spacer height={Mixins.scaleSize(20)} />
      <Animated.View style={{transform: [{translateX: position}]}}>
        <CommissionView />
      </Animated.View> */}
    </View>
  );
};

export default CommissionHeader;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.PRIMARY,
    height:
      Platform.OS === 'android'
        ? Mixins.WINDOW_HEIGHT * 0.21
        : Mixins.WINDOW_HEIGHT * 0.24,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 16,
  },

  mainWrap2: {
    backgroundColor: Colors.PRIMARY,
    height:
      Platform.OS === 'android'
        ? Mixins.WINDOW_HEIGHT * 0.25
        : Mixins.WINDOW_HEIGHT * 0.24,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  header2wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    color: Colors.WHITE,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
