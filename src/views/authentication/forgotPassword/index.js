import React, {useState} from 'react';
import {EmailSVGComponent} from '../../../assets/svgs';
import HeaderLogoComponent from '../../../assets/svgs/HeaderLogo';
import AuthenticationHeaderContext from '../../../components/authenticationHeaderContext';
import ButtonComponent from '../../../components/buttonComponent';
import InputTextComponent from '../../../components/InputTextField';
import LayoutContainer from '../../../components/layoutContainer';
import Spacer from '../../../components/Spacer';
import {Colors, Mixins} from '../../../styles';
import {forgotEmailValidation} from '../../../utils/helper';
import getStyles from './styles';
import {Formik} from 'formik';
import {forgotEmailVerification} from '../../../../services/api/authentication';
import {toastConfig} from '../../../components/Toaster/ToastConfig';
import Toast from 'react-native-toast-message';

const ForgotPasswordScreen = props => {
  const styles = getStyles();
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleForgotPassword = async value => {
    try {
      setIsLoader(true);
      const {
        data: {success},
      } = await forgotEmailVerification(value);
      if (success) {
        setIsLoader(false);
        Toast.show({
          type: 'success',
          text1: 'OTP send',
          text2: 'OTP send to your email.',
          position: 'left',
          visibilityTime: 4000,
        });
        props.navigation.navigate('OtpScreen', {
          condition: 'forgot',
          email: value?.email,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to send email',
          text2: 'Please try again.',
          position: 'left',
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to send email',
        text2: 'Please try again.',
        position: 'left',
        visibilityTime: 4000,
      });
      setIsLoader(false);
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
        label2={'Enter your email address to continue'}
      />
      <Toast topOffset={60} config={toastConfig} />
      <Spacer height={Mixins.scaleSize(28)} />
      <Formik
        onSubmit={value => handleForgotPassword(value)}
        initialValues={{
          email: '',
        }}
        validationSchema={forgotEmailValidation}>
        {formik => {
          return (
            <>
              <InputTextComponent
                leftIcon={<EmailSVGComponent />}
                capatalize={'none'}
                placeholder={'Email Address'}
                labelColor={'#E5E5E6'}
                error={isError}
                formikError={formik.errors.email}
                onChangeText={formik.handleChange('email')}
                inputValue={formik.values.email}
                backgroundColor={'transparent'}
                textInputColor={'#E5E5E6'}
                autoCorrect={false}
              />

              <Spacer height={Mixins.scaleSize(28)} />

              <ButtonComponent
                buttonTitle={'Continue'}
                style={styles.continueBtn}
                loader={isLoader}
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

export default ForgotPasswordScreen;
