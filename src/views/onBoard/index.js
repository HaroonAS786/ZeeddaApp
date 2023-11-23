import React, {useRef, useState} from 'react';
import {Animated, ImageBackground, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import ButtonBtnRow from '../../components/bottomBtnRow';
import ButtonComponent from '../../components/buttonComponent';
import Pagination from '../../components/pagination';
import RippleEffect from '../../components/rippleEffect';
import Spacer from '../../components/Spacer';
import {Colors, Mixins} from '../../styles/index';
import {SLIDES} from '../../utils/helper';
import getStyles from './styles';

const OnBoarding = props => {
  const styles = getStyles();
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  let swiperRef;

  const handleScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleNext = () => {
    if (index < SLIDES.length - 1) {
      swiperRef.scrollBy(1, true);
    }
  };

  return (
    <View
      style={{
        height: Mixins.WINDOW_HEIGHT,
        width: Mixins.WINDOW_WIDTH,
      }}>
      <Swiper
        ref={ref => (swiperRef = ref)}
        key={SLIDES?.length}
        onIndexChanged={index => {
          setIndex(index);
        }}
        loop={false}
        onScroll={handleScroll}
        showsPagination={false}
        index={0}>
        {SLIDES?.map(item => {
          return (
            <ImageBackground
              key={item.key}
              source={item?.image}
              resizeMode="cover"
              style={styles.imageView}
            />
          );
        })}
      </Swiper>

      <Animated.View style={styles.boxContainer}>
        <Spacer height={Mixins.scaleSize(30)} />
        <Text style={styles.subTitle1}>{SLIDES[index]?.subTitle1}</Text>
        <Spacer height={Mixins.scaleSize(15)} />
        <Text style={styles.subTitle2}>{SLIDES[index]?.subTitle2}</Text>

        {index === 2 ? (
          <>
            <ButtonBtnRow>
              <ButtonComponent
                buttonTitle={'Get Started'}
                style={styles.getStartedBtnView}
                titleColor={Colors.PRIMARY}
                onPress={() => {
                  props.navigation.navigate('LoginScreen');
                }}
              />

              <Pagination data={SLIDES} scrollX={scrollX} index={index} />
            </ButtonBtnRow>
          </>
        ) : (
          <View style={styles.footerContainer}>
            <View style={styles.footerView}>
              <RippleEffect
                rippleColor={Colors.WHITE}
                onPress={() => {
                  props.navigation.navigate('LoginScreen');
                }}>
                <Text style={styles.skipView}>Skip</Text>
              </RippleEffect>

              <Pagination data={SLIDES} scrollX={scrollX} index={index} />

              <RippleEffect onPress={handleNext} rippleColor={Colors.WHITE}>
                <Text style={styles.nextView}>Next</Text>
              </RippleEffect>
            </View>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

export default OnBoarding;
