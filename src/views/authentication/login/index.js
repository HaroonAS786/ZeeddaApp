import {Formik} from 'formik';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  EmailSVGComponent,
  FacebookSVGComponent,
  GoogleSVGComponent,
  LockSVGComponent,
  PassOpenSVGComponent,
  PasswordHideSVGComponent,
} from '../../../assets/svgs';
import HeaderLogoComponent from '../../../assets/svgs/HeaderLogo';
import AuthenticationHeaderContext from '../../../components/authenticationHeaderContext';
import ButtonComponent from '../../../components/buttonComponent';
import InputTextComponent from '../../../components/InputTextField';
import LayoutContainer from '../../../components/layoutContainer';
import RippleEffect from '../../../components/rippleEffect';
import Spacer from '../../../components/Spacer';
import {TextElement} from '../../../components/TextElement';
import {authActions} from '../../../redux/actions/actions';
import {Colors, Mixins} from '../../../styles';
import {signInValidation} from '../../../utils/helper';
import getStyles from './styles';
import * as authAPIs from '../../../../services/api/authentication';
import {toastConfig} from '../../../components/Toaster/ToastConfig';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {
  const [isPasswordHide, setIsPasswordHide] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const styles = getStyles();
  const dispatch = useDispatch();

  const handleLogin = async values => {
    try {
      setIsLoader(true);
      const {
        data: {success, result},
      } = await authAPIs?.logIn(values);
      if (success) {
        const checkoutItem = await AsyncStorage.getItem('CheckoutItem');
        if (checkoutItem == null) {
          dispatch(authActions.CartItem([]));
        } else {
          dispatch(authActions.CartItem(JSON.parse(checkoutItem)));
        }
        dispatch(authActions.setUserData(result));
        props.navigation.navigate('DrawerStack');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Invalid credentials .',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setIsLoader(false);
    } catch (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      setIsLoader(false);
    }
  };

  return (
    <>
      <LayoutContainer noHeight>
        <Spacer height={Mixins.scaleSize(100)} />
        <HeaderLogoComponent />
        <Spacer height={Mixins.scaleSize(48)} />
        <AuthenticationHeaderContext
          label1={'Welcome'}
          label11={'back!'}
          label2={'Sign in to continue'}
          isOtp={true}
        />
        <Spacer height={Mixins.scaleSize(28)} />
        <Toast topOffset={60} config={toastConfig} />
        <Formik
          onSubmit={values => handleLogin(values)}
          initialValues={{
            email: '',
            password: '',
            fcm_token: 'Token',
          }}
          validationSchema={signInValidation}>
          {formik => {
            return (
              <>
                <InputTextComponent
                  leftIcon={<EmailSVGComponent />}
                  capatalize={'none'}
                  placeholder={'Email Address'}
                  error={isError}
                  formikError={formik.errors.email}
                  onChangeText={formik.handleChange('email')}
                  inputValue={formik.values.email}
                  labelColor={'#E5E5E6'}
                  // onBlur={formik.handleBlur('email')}

                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  leftIcon={<LockSVGComponent />}
                  error={isError}
                  formikError={formik.errors.password}
                  capatalize={'none'}
                  placeholder={'Password'}
                  labelColor={'#E5E5E6'}
                  onChangeText={formik.handleChange('password')}
                  // onBlur={formik.handleBlur('password')}
                  inputValue={formik.values.password}
                  width={Mixins.scaleSize(260)}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  onRightIconPress={() => setIsPasswordHide(!isPasswordHide)}
                  rightIcon={
                    isPasswordHide ? (
                      <PasswordHideSVGComponent />
                    ) : (
                      <PassOpenSVGComponent />
                    )
                  }
                  secureTextEntry={isPasswordHide ? false : true}
                />
                <Spacer height={Mixins.scaleSize(2)} />
                <View style={styles.forgotPasswordContainer}>
                  <RippleEffect
                    onPress={() =>
                      props.navigation.navigate('ForgotPasswordScreen')
                    }
                    rippleColor={Colors.ORANGE_TEXT}>
                    <TextElement
                      fontType={'h8'}
                      textStyle={styles.forgotPassword}>
                      Forgot Password?
                    </TextElement>
                  </RippleEffect>
                </View>
                <Spacer height={Mixins.scaleSize(40)} />
                <ButtonComponent
                  buttonTitle={'Login'}
                  loader={isLoader}
                  style={styles.loginBtn}
                  rippleColor={Colors.WHITE}
                  titleColor={Colors.WHITE}
                  onPress={() => {
                    setIsError(true);
                    formik.submitForm();
                  }}
                />
              </>
            );
          }}
        </Formik>
        <Spacer height={Mixins.scaleSize(40)} />
        <TextElement fontType={'h6'} textStyle={styles.continueText}>
          -or continue with-
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <View style={styles.socialBtnContainer}>
          <TouchableOpacity>
            <GoogleSVGComponent />
          </TouchableOpacity>
          <Spacer width={Mixins.scaleSize(14)} />
          <TouchableOpacity>
            <FacebookSVGComponent />
          </TouchableOpacity>
        </View>
        <Spacer height={Mixins.scaleSize(35)} />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.dontSignUpView}
          onPress={() => props.navigation.navigate('SignUpScreen')}>
          <TextElement fontType={'h8'} textStyle={styles.dontAccountText}>
            Dont have an account?
          </TextElement>
          <TextElement fontType={'h8'} textStyle={styles.signUpLabel}>
            {' Sign up'}
          </TextElement>
        </TouchableOpacity>
      </LayoutContainer>
    </>
  );
};

export default LoginScreen;
