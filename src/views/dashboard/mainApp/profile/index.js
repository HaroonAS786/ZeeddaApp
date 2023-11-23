import {View, Text, Platform, ScrollView, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import getStyles from './styles';
import Spacer from '../../../../components/Spacer';
import {Colors, Mixins} from '../../../../styles';
import RippleEffect from '../../../../components/rippleEffect';
import HamBurgerSVGComponent from '../../../../assets/svgs/hamBurgerSvg';
import {BackArrow} from '../../../../assets/svgs';
import UserProfileLabel from './components/userProfileLabel';
import {TextElement} from '../../../../components/TextElement';
import ProfileTextComponent from './components/ProfileTextComponent';
import {
  EditProfileSVGComponent,
  LanguageSVGComponent,
  NotificationSVGComponent,
  ProfileLockSVGComponent,
} from '../../../../assets/svgs';
import {useSelector} from 'react-redux';

const ProfileScreen = props => {
  const {fromHome} = props?.route?.params ?? {};
  const user = useSelector(state => state?.auth?.user);
  const styles = getStyles();

  const position = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateView = () => {
      Animated.timing(position, {
        toValue: 1, // Final value for animation (1 represents 100%)
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start(); // Start the animation
    };

    if (position) {
      animateView();
    }

    return () => {
      // Your cleanup code here (if necessary)
    };
  }, [position]);

  const translateY = position.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0], // Translate the view from -200 (above the screen) to 0 (normal position)
  });

  return (
    <View style={styles.mainTopCont}>
      <Animated.View style={[styles.view1, {transform: [{translateY}]}]}>
        <View style={styles.mainWrapContainer}>
          {Platform.OS === 'ios' ? (
            <Spacer height={Mixins.scaleSize(50)} />
          ) : (
            <Spacer height={Mixins.scaleSize(60)} />
          )}
          <RippleEffect
            onPress={() => {
              props.navigation.goBack();
            }}>
            <BackArrow width={22} height={18} color={'#fff'} />
          </RippleEffect>
          <Spacer height={Mixins.scaleSize(20)} />
          <UserProfileLabel profile={user?.profile_picture} />
          <View style={styles.contentView}>
            <TextElement fontType={'h5'} textStyle={styles.userNameLabel}>
              {user?.username}
            </TextElement>
            <TextElement fontType={'h7'} textStyle={styles.userEmailLabel}>
              {user?.email}
            </TextElement>
          </View>
        </View>
      </Animated.View>
      <Spacer height={Mixins.scaleSize(65)} />
      <View style={styles.view2}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer height={Mixins.scaleSize(30)} />
          <View style={styles.centerBody}>
            <TextElement
              fontType={'h7'}
              textStyle={{color: Colors.BLACK, fontWeight: '600'}}>
              Settings
            </TextElement>
            <Spacer height={Mixins.scaleSize(12)} />
            <ProfileTextComponent
              label={'Change Password'}
              onPress={() => props.navigation.navigate('ChangePasswordScreen')}
              leftSvg={<ProfileLockSVGComponent />}
            />
            <Spacer height={Mixins.scaleSize(12)} />
            <ProfileTextComponent
              label={'Edit Profile'}
              leftSvg={<EditProfileSVGComponent />}
              onPress={() => props.navigation.navigate('EditProfileScreen')}
            />
            <Spacer height={Mixins.scaleSize(12)} />
            <ProfileTextComponent
              label={'Notification'}
              leftSvg={<NotificationSVGComponent />}
            />
          </View>
          <Spacer height={Mixins.scaleSize(20)} />
          <View style={styles.centerBody}>
            <TextElement
              fontType={'h7'}
              textStyle={{color: Colors.BLACK, fontWeight: '600'}}>
              About US
            </TextElement>
            <Spacer height={Mixins.scaleSize(12)} />
            <ProfileTextComponent
              label={'FAQ'}
              leftSvg={<ProfileLockSVGComponent />}
            />
            <Spacer height={Mixins.scaleSize(12)} />
            <ProfileTextComponent
              label={'Privacy Policy'}
              leftSvg={<LanguageSVGComponent />}
            />
            <Spacer height={Mixins.scaleSize(12)} />
            <ProfileTextComponent
              label={'Contact Us'}
              leftSvg={<NotificationSVGComponent />}
            />
            <Spacer height={Mixins.scaleSize(30)} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;
