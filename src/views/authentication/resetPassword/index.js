import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import LayoutContainer from '../../../components/layoutContainer';
import HeaderLogoComponent from '../../../assets/svgs/HeaderLogo';
import Spacer from '../../../components/Spacer';
import AuthenticationHeaderContext from '../../../components/authenticationHeaderContext';
import {Colors, Mixins} from '../../../styles';
import InputTextComponent from '../../../components/InputTextField';
import {
  LockSVGComponent,
  PassOpenSVGComponent,
  PasswordHideSVGComponent,
} from '../../../assets/svgs';
import ButtonComponent from '../../../components/buttonComponent';
import getStyles from './styles';
import {Formik} from 'formik';
import {resetValidation} from '../../../utils/helper';
import {updateForgotPassword} from '../../../../services/api/authentication';
import {toastConfig} from '../../../components/Toaster/ToastConfig';
import Toast from 'react-native-toast-message';

const ResetPasswordScreen = props => {
  const {email} = props.route.params;
  const styles = getStyles();
  const [isNewPasswordHide, setIsNewPasswordHide] = useState(false);
  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleResetPassword = async values => {
    try {
      setIsLoader(true);
      const value = {
        email: email,
        password: values?.password,
      };
      const {
        data: {success},
      } = await updateForgotPassword(value);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Password changed',
          text2: 'Your password has been successfully.',
          position: 'left',
          visibilityTime: 4000,
        });
        return props.navigation.navigate('LoginScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setIsLoader(false);
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

  return (
    <LayoutContainer
      header
      backOnPress={() => props.navigation.goBack()}
      isForm>
      <HeaderLogoComponent />
      <Spacer height={Mixins.scaleSize(45)} />
      <AuthenticationHeaderContext
        label1={'Forgot password'}
        label2={'Enter your New password to continue'}
      />
      <Spacer height={Mixins.scaleSize(28)} />
      <Toast topOffset={60} config={toastConfig} />
      <Formik
        onSubmit={values => handleResetPassword(values)}
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={resetValidation}>
        {formik => {
          return (
            <>
              <InputTextComponent
                leftIcon={<LockSVGComponent />}
                capatalize={'none'}
                placeholder={'Password'}
                labelColor={'#E5E5E6'}
                onChangeText={formik.handleChange('password')}
                inputValue={formik.values.password}
                error={isError}
                formikError={formik.errors.password}
                backgroundColor={'transparent'}
                textInputColor={'#E5E5E6'}
                width={Mixins.scaleSize(260)}
                autoCorrect={false}
                secureTextEntry={isNewPasswordHide ? false : true}
                onRightIconPress={() =>
                  setIsNewPasswordHide(!isNewPasswordHide)
                }
                rightIcon={
                  isNewPasswordHide ? (
                    <PasswordHideSVGComponent />
                  ) : (
                    <PassOpenSVGComponent />
                  )
                }
              />

              <Spacer height={Mixins.scaleSize(28)} />

              <InputTextComponent
                error={isError}
                formikError={formik.errors.confirmPassword}
                placeholder={'Confirm Password'}
                onChangeText={formik.handleChange('confirmPassword')}
                leftIcon={<LockSVGComponent />}
                capatalize={'none'}
                labelColor={'#E5E5E6'}
                backgroundColor={'transparent'}
                textInputColor={'#E5E5E6'}
                autoCorrect={false}
                width={Mixins.scaleSize(260)}
                secureTextEntry={isConfirmPasswordHide ? false : true}
                onRightIconPress={() =>
                  setIsConfirmPasswordHide(!isConfirmPasswordHide)
                }
                rightIcon={
                  isConfirmPasswordHide ? (
                    <PasswordHideSVGComponent />
                  ) : (
                    <PassOpenSVGComponent />
                  )
                }
              />

              <Spacer height={Mixins.scaleSize(28)} />
              <ButtonComponent
                loader={isLoader}
                buttonTitle={'Continue'}
                style={styles.continue}
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
    </LayoutContainer>
  );
};

export default ResetPasswordScreen;
