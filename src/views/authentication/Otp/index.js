import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import LayoutContainer from '../../../components/layoutContainer';
import HeaderLogoComponent from '../../../assets/svgs/HeaderLogo';
import Spacer from '../../../components/Spacer';
import AuthenticationHeaderContext from '../../../components/authenticationHeaderContext';
import {Colors, Mixins} from '../../../styles';
import ButtonComponent from '../../../components/buttonComponent';
import getStyles from './styles';
import OTPComponent from '../../../components/otpComponent';
import {TextElement} from '../../../components/TextElement';
import TimeComponent from '../../../components/timer';
import FadeModal from '../../../components/fadeModal';
import {IMAGES} from '../../../utils/asset';
import {useDispatch} from 'react-redux';
import {authActions} from '../../../redux/actions/actions';
import RippleEffect from '../../../components/rippleEffect';
import * as authApi from '../../../../services/api/authentication';
import {toastConfig} from '../../../components/Toaster/ToastConfig';
import Toast from 'react-native-toast-message';

const OtpScreen = props => {
  const {condition, email, signUpObject} = props.route.params;

  const styles = getStyles();
  const [loginPin, setLoginPin] = useState();
  const [loading, setLoading] = useState(false);
  const [resendCodeVisible, setResendCodeVisible] = useState(60);

  const refOnSubmit = useRef();
  const dispatch = useDispatch();

  const renderNavigation = () => {
    if (condition === 'signUp') {
      refOnSubmit.current.close();
    }
  };

  const ResendCode = async () => {
    try {
      if (condition === 'signUp') {
        signUpResendOPT();
      } else {
        forgotResendOPT();
      }
    } catch (error) {}
  };

  const signUpResendOPT = async () => {
    try {
      const value = {
        email: signUpObject?.email,
        name: `${signUpObject?.first_name} ${signUpObject?.last_name}`,
      };
      const {
        data: {success},
      } = await authApi?.signUptEmailVerification(value);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'OTP Resend',
          text2: 'OTP resend successfully.',
          position: 'left',
          visibilityTime: 4000,
        });
        setResendCodeVisible(60);
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Resend Failed',
          text2: 'Please try again.',
          position: 'left',
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
    }
  };

  const forgotResendOPT = async () => {
    try {
      const value = {
        email: email,
      };
      const {
        data: {success},
      } = await authApi?.forgotEmailVerification(value);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'OTP Resend',
          text2: 'OTP resend successfully.',
          position: 'left',
          visibilityTime: 4000,
        });
        setResendCodeVisible(60);
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Resend Failed',
          text2: 'Please try again.',
          position: 'left',
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
    }
  };

  const CodeConformation = () => {
    if (condition === 'forgot') {
      ForgotConformation();
    } else {
      SignUpCodeConformation();
    }
  };

  const SignUpCodeConformation = async () => {
    try {
      setLoading(true);
      const value = {
        email: signUpObject?.email,
        otp: loginPin,
      };
      const {
        data: {success},
      } = await authApi?.codeConformation(value);
      if (success) {
        signUp();
        Toast.show({
          type: 'success',
          text1: 'OTP Verified',
          text2: 'Your OTP has been verified.',
          position: 'left',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Verified failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      setLoading(false);
    }
  };

  const ForgotConformation = async () => {
    try {
      setLoading(true);
      const value = {
        email: email,
        otp: loginPin,
      };
      const {
        data: {success},
      } = await authApi?.codeConformation(value);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'OTP Verified',
          text2: 'Your OTP has been verified.',
          position: 'left',
          visibilityTime: 4000,
        });
        return props.navigation.navigate('ResetPasswordScreen', {
          email: email,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'OTP Verified failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      setLoading(false);
    }
  };

  const signUp = async () => {
    try {
      const {
        data: {success, result},
      } = await authApi?.signup({signUpObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Register successfully',
          text2: 'Your account has been created successfully.',
          position: 'left',
          visibilityTime: 4000,
        });
        dispatch(authActions.setUserData(result));
        refOnSubmit.current.open();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to register',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to register',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
    }
  };
  return (
    <LayoutContainer
      header
      backOnPress={() => props.navigation.goBack()}
      isForm>
      <HeaderLogoComponent />
      <Spacer height={Mixins.scaleSize(45)} />
      <AuthenticationHeaderContext
        isOtp={false}
        label11={'Verification Code'}
        label2={'We have sent the code verification to your email'}
        label22={email ? email : signUpObject?.email}
      />
      <Toast topOffset={60} config={toastConfig} />
      <Spacer height={Mixins.scaleSize(28)} />
      <OTPComponent
        pinCount={4}
        pin={loginPin}
        onChangeText={pin => setLoginPin(pin)}
        setPin={() => {
          setLoginPin(loginPin);
        }}
      />
      <Spacer height={Mixins.scaleSize(28)} />
      {resendCodeVisible ? (
        <View>
          <TimeComponent
            durationInSeconds={resendCodeVisible}
            setResendCodeVisible={setResendCodeVisible}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.dontRecieveCodeView}
          onPress={() => {}}>
          <TextElement fontType={'h8'} textStyle={styles.dontRecieveCodeText}>
            Didn’t receive the code?
          </TextElement>
          <RippleEffect onPress={() => ResendCode()}>
            <TextElement fontType={'h8'} textStyle={styles.resend}>
              {' Resend'}
            </TextElement>
          </RippleEffect>
        </TouchableOpacity>
      )}

      <Spacer height={Mixins.scaleSize(28)} />

      <ButtonComponent
        buttonTitle={'Submit'}
        style={loginPin ? styles.submitBtn : styles.notActiveSubmitBtn}
        rippleColor={Colors.WHITE}
        titleColor={Colors.WHITE}
        onPress={() => CodeConformation()}
        loader={loading}
      />
      <Spacer height={Mixins.scaleSize(35)} />

      <FadeModal
        refRBSheet={refOnSubmit}
        setIsVisible={() => {
          refOnSubmit.current.close();
        }}
        height={Mixins.WINDOW_HEIGHT * 0.7}>
        <View style={{width: Mixins.WINDOW_WIDTH}}>
          <Image source={IMAGES.registrationSuccessful} blurRadius={0.5} />
        </View>

        <View style={styles.registeredCon}>
          <Spacer height={Mixins.scaleSize(35)} />
          <TextElement fontType={'h4'} textStyle={styles.registeredText}>
            Registration Successful
          </TextElement>
          <Spacer height={Mixins.scaleSize(22)} />
          <TextElement fontType={'h6'} textStyle={styles.registeredTextDesc}>
            Congratulation! your account already created.
          </TextElement>
          <Spacer height={Mixins.scaleSize(10)} />
          <TextElement fontType={'h6'} textStyle={styles.registeredTextDesc}>
            Please login to get amazing experience.
          </TextElement>
          <Spacer height={Mixins.scaleSize(30)} />
          <ButtonComponent
            buttonTitle={'Submit'}
            style={styles.submitBtn}
            rippleColor={Colors.WHITE}
            titleColor={Colors.WHITE}
            onPress={renderNavigation}
          />
        </View>
      </FadeModal>
    </LayoutContainer>
  );
};

export default OtpScreen;
