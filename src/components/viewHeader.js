import {View, Text, StyleSheet, Platform, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Colors, Mixins} from '../styles';
import Spacer from './Spacer';
import HeaderLogoComponent from '../assets/svgs/HeaderLogo';
import HamBurgerSVGComponent from '../assets/svgs/hamBurgerSvg';
import {TextElement} from './TextElement';
import HomeSearch from '../views/dashboard/mainApp/home/homeSearchView';
import {BackArrow} from '../assets/svgs';
import RippleEffect from './rippleEffect';

const ViewHeader = props => {
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

  if (props.isHeaderView2) {
    return (
      <View style={styles.mainWrap2}>
        {Platform.OS === 'ios' ? (
          <Spacer height={Mixins.scaleSize(50)} />
        ) : (
          <Spacer height={Mixins.scaleSize(42)} />
        )}
        <View style={styles.header2wrap}>
          <RippleEffect onPress={props.onPress} style={{padding: 4}}>
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
      </View>
    );
  } else {
    return (
      <View style={styles.mainWrap}>
        {Platform.OS === 'ios' ? (
          <Spacer height={Mixins.scaleSize(50)} />
        ) : (
          <Spacer height={Mixins.scaleSize(32)} />
        )}
        <View style={styles.header}>
          <RippleEffect onPress={props.onPress} style={{padding: 4}}>
            {props.isHamburger ? (
              <HamBurgerSVGComponent />
            ) : (
              <BackArrow width={22} height={18} color={Colors.WHITE} />
            )}
          </RippleEffect>
          <Spacer />
        </View>

        <View style={styles.content}>
          <HeaderLogoComponent
            width={Mixins.scaleSize(190)}
            height={Mixins.scaleSize(58)}
          />
          <TextElement fontType={'h5'} textStyle={styles.label}>
            {props.label}
          </TextElement>
        </View>
        {Platform.OS === 'ios' ? (
          <Spacer height={Mixins.scaleSize(10)} />
        ) : (
          <Spacer height={Mixins.scaleSize(20)} />
        )}

        {/* <Animated.View style={{transform: [{translateX: position}]}}>
          <HomeSearch />
        </Animated.View> */}
      </View>
    );
  }
};

export default ViewHeader;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.PRIMARY,
    height:
      Platform.OS === 'android'
        ? Mixins.WINDOW_HEIGHT * 0.26
        : Mixins.WINDOW_HEIGHT * 0.24,

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 16,
  },

  mainWrap2: {
    backgroundColor: Colors.PRIMARY,
    height:
      Platform.OS === 'android'
        ? Mixins.WINDOW_HEIGHT * 0.2
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
