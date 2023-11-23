import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useCallback} from 'react';
import {TextElement} from './TextElement';
import {debounce} from 'lodash';
import {BackArrow} from '../assets/svgs';
import {wp} from '../styles/responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, Mixins} from '../styles';
import RippleEffect from './rippleEffect';
import HeaderLogoComponent from '../assets/svgs/HeaderLogo';
import Spacer from './Spacer';
import HamBurgerSVGComponent from '../assets/svgs/hamBurgerSvg';

export default function LayoutContainer(props) {
  const {
    header,
    header2,
    style,
    backTitle,
    isForm,
    noHeight,
    headerTitle,
    children,
    backOnPress,
    scrollEnable,
    pullToRefresh,
    isHamBurger = false,
  } = props;

  const delayedTap = useCallback(
    debounce(() => backOnPress(), 200),
    [],
  );

  if (header) {
    return (
      <View style={[styles.mainContWrap, style]}>
        <SafeAreaView>
          {header2 ? (
            isHamBurger ? (
              <>
                {Platform.OS === 'android' && (
                  // <Spacer height={Mixins.scaleSize(25)} />
                  <Spacer height={Mixins.scaleSize(35)} />
                )}
                <View style={[styles.topCont]}>
                  <View style={styles.barCont}>
                    <RippleEffect
                      onPress={delayedTap}
                      style={styles.backIconCont}
                      hitSlop={wp(3)}
                      rippleColor={Colors.BLACK}>
                      <HamBurgerSVGComponent
                        width={22}
                        height={22}
                        color={Colors.BLACK}
                      />
                    </RippleEffect>
                    <Spacer width={Mixins.scaleSize(50)} />
                    <HeaderLogoComponent width={190} height={54} />
                    <TextElement
                      onPress={delayedTap}
                      fontType={'h6'}
                      textStyle={[styles.rowTxt]}>
                      {backTitle}
                    </TextElement>
                  </View>
                </View>
              </>
            ) : (
              <>
                {Platform.OS === 'android' && (
                  // <Spacer height={Mixins.scaleSize(25)} />
                  <Spacer height={Mixins.scaleSize(35)} />
                )}
                <View style={[styles.topCont]}>
                  <View style={styles.barCont}>
                    <RippleEffect
                      onPress={delayedTap}
                      style={styles.backIconCont}
                      hitSlop={wp(3)}
                      rippleColor={Colors.BLACK}>
                      <BackArrow width={22} height={22} />
                    </RippleEffect>
                    <Spacer width={Mixins.scaleSize(50)} />
                    <HeaderLogoComponent width={190} height={54} />
                    <TextElement
                      onPress={delayedTap}
                      fontType={'h6'}
                      textStyle={[styles.rowTxt]}>
                      {backTitle}
                    </TextElement>
                  </View>
                </View>
              </>
            )
          ) : (
            <View style={[styles.topCont]}>
              <View style={styles.barCont}>
                <RippleEffect
                  onPress={delayedTap}
                  style={styles.backIconCont}
                  hitSlop={wp(3)}
                  rippleColor={Colors.BLACK}>
                  <BackArrow width={22} height={22} />
                </RippleEffect>

                <TextElement
                  onPress={delayedTap}
                  fontType={'h6'}
                  textStyle={[styles.rowTxt]}>
                  {backTitle}
                </TextElement>
              </View>
            </View>
          )}
        </SafeAreaView>
        {isForm ? (
          <KeyboardAwareScrollView
            style={[styles.scrollWrap, style]}
            contentContainerStyle={[styles.headerWrap, style]}
            showsVerticalScrollIndicator={false}>
            {/* {isHeader && headerTitle ? (
              <View style={[styles.rowWrap]}>
                <TextElement
                  font={'bold'}
                  fontType={'h4'}
                  textStyle={[styles.headingTitle]}>
                  {headerTitle}
                </TextElement>
              </View>
            ) : null} */}
            {children}
          </KeyboardAwareScrollView>
        ) : noHeight ? (
          <KeyboardAwareScrollView
            style={[styles.scrollWrap, style]}
            contentContainerStyle={[styles.wrapNoHeight, style]}
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        ) : headerTitle ? (
          <View style={[styles.headerWrap, style, referralStyles]}>
            <View style={[styles.rowWrap]}>
              <TextElement
                font={'bold'}
                fontType={'h4'}
                textStyle={[styles.headingTitle]}>
                {headerTitle}
              </TextElement>
            </View>
            {children}
          </View>
        ) : null}
      </View>
    );
  } else {
    return (
      <>
        {isForm ? (
          <KeyboardAwareScrollView
            style={[styles.wrap, style]}
            contentContainerStyle={[styles.wrapNoHeight, style]}
            showsVerticalScrollIndicator={false}>
            {children}
          </KeyboardAwareScrollView>
        ) : noHeight ? (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <KeyboardAwareScrollView
              scrollEnabled={scrollEnable}
              style={[styles.scrollWrap, style]}
              contentContainerStyle={[styles.wrapNoHeight, style]}
              refreshControl={
                pullToRefresh ? (
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                ) : null
              }
              showsVerticalScrollIndicator={false}>
              {children}
            </KeyboardAwareScrollView>
          </View>
        ) : (
          <View
            style={[
              styles.wrap,
              style,
              {
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
              },
            ]}>
            {children}
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE,
  },
  wrap: {
    height: Mixins.WINDOW_HEIGHT,
    width: Mixins.WINDOW_WIDTH,
    backgroundColor: Colors.DASHBOARD_BG,
  },
  headerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.WHITE_BG,
  },
  wrapNoHeight: {
    width: Mixins.WINDOW_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.DASHBOARD_BG,
  },
  scrollWrap: {
    backgroundColor: Colors.DASHBOARD_BG,
  },

  topCont: {
    height: Mixins.WINDOW_HEIGHT * 0.05,
    width: Mixins.WINDOW_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  barCont: {
    height: Mixins.WINDOW_HEIGHT * 0.035,
    width: Mixins.WINDOW_WIDTH * 0.87,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? Mixins.WINDOW_HEIGHT * 0.01 : 0,
  },
  backIconCont: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowTxt: {
    color: Colors.PRIMARY,
    marginLeft: 5,
  },
  headingTitle: {
    marginTop: Mixins.WINDOW_HEIGHT * 0.01,
  },
  backIconStyle: {
    width: '55%',
    height: '55%',
    resizeMode: 'contain',
  },
  rowWrap: {
    width: Mixins.WINDOW_WIDTH * 0.85,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: Mixins.WINDOW_HEIGHT * 0.01,
  },
  topPadding: {
    paddingTop: Mixins.WINDOW_HEIGHT * 0.02,
  },

  header2barCont: {
    height: Mixins.WINDOW_HEIGHT * 0.035,
    width: Mixins.WINDOW_WIDTH * 0.87,
    flexDirection: 'row',
    justifyContent: 'flex-start',

    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? Mixins.WINDOW_HEIGHT * 0.01 : 0,
  },
  header2TopCont: {
    height: Mixins.WINDOW_HEIGHT * 0.05,
    width: Mixins.WINDOW_WIDTH,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
