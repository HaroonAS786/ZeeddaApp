import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  PassOpenSVGComponent,
  PasswordHideSVGComponent,
} from '../../../assets/svgs';
import HeaderLogoComponent from '../../../assets/svgs/HeaderLogo';
import AuthenticationHeaderContext from '../../../components/authenticationHeaderContext';
import ButtonComponent from '../../../components/buttonComponent';
import DropDownBtn from '../../../components/dropDownBtn';
import FadeModal from '../../../components/fadeModal';
import InputTextComponent from '../../../components/InputTextField';
import LayoutContainer from '../../../components/layoutContainer';
import RadioButtonGroup from '../../../components/radioButton';
import Spacer from '../../../components/Spacer';
import {TextElement} from '../../../components/TextElement';
import {Colors, Mixins} from '../../../styles';
import {signUpValidation, UserSelectionTypeData} from '../../../utils/helper';
import getStyles from './styles';
import * as authApi from '../../../../services/api/authentication';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../components/Toaster/ToastConfig';

const SignUpScreen = props => {
  const styles = getStyles();
  const [isPasswordHide, setIsPasswordHide] = useState(false);
  const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState(false);
  const refUserSelectionType = useRef(null);
  const [isError, setIsError] = useState(false);
  const [isDropDownError, setIsDropDownError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isDropDownErrorValue, setIsDropDownErrorValue] = useState('');

  const handleSelectOption = () => {
    refUserSelectionType.current.close();
  };

  const handleSignUp = async values => {
    try {
      setIsLoader(true);
      setIsDropDownError(false);
      setIsDropDownErrorValue('');
      const signUpObject = {
        ...values,
        role: values?.role?.key,
        agreement: 1,
        latitude: 1,
        longitude: 1,
      };

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
          text1: 'Conformation',
          text2: 'OTP send to your email.',
          position: 'left',
          visibilityTime: 4000,
        });
        props.navigation.navigate('OtpScreen', {
          condition: 'signUp',
          signUpObject: signUpObject,
        });
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
      console.log('error', error);
      setIsLoader(false);
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
    <>
      <LayoutContainer
        header
        backOnPress={() => props.navigation.goBack()}
        noHeight>
        <HeaderLogoComponent />
        <Spacer height={Mixins.scaleSize(45)} />
        <AuthenticationHeaderContext
          label1={'Create an'}
          label11={'account'}
          label2={'Enter your contact information'}
          isOtp={true}
        />
        <Spacer height={Mixins.scaleSize(28)} />
        <Formik
          onSubmit={values => handleSignUp(values)}
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            contact_number: '',
            password: '',
            confirmPassword: '',
            location: '',
            role: '',
          }}
          validationSchema={signUpValidation}>
          {formik => {
            return (
              <>
                <View style={styles.firstLastNameContainer}>
                  <View>
                    <InputTextComponent
                      capatalize={'none'}
                      placeholder={'First name'}
                      labelColor={'#E5E5E6'}
                      onChangeText={formik.handleChange('first_name')}
                      inputValue={formik.values.first_name}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                    />
                    {formik.errors.first_name && isError && (
                      <View style={styles.errorlabelContainer}>
                        <Text style={styles.errorLabel}>
                          {formik.errors.first_name}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <InputTextComponent
                      capatalize={'none'}
                      placeholder={'Last name'}
                      labelColor={'#E5E5E6'}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      onChangeText={formik.handleChange('last_name')}
                      inputValue={formik.values.last_name}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                    />

                    {formik.errors.last_name && isError && (
                      <View style={styles.errorlabelContainer}>
                        <Text style={styles.errorLabel}>
                          {formik.errors.last_name}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <Spacer height={Mixins.scaleSize(28)} />
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Email Address'}
                  labelColor={'#E5E5E6'}
                  width={Mixins.scaleSize(260)}
                  error={isError}
                  formikError={formik.errors.email}
                  onChangeText={formik.handleChange('email')}
                  inputValue={formik.values.email}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                />

                <Spacer height={Mixins.scaleSize(28)} />
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Mobile'}
                  labelColor={'#E5E5E6'}
                  error={isError}
                  formikError={formik.errors.contact_number}
                  onChangeText={formik.handleChange('contact_number')}
                  inputValue={formik.values.contact_number}
                  width={Mixins.scaleSize(260)}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  keyboardType="numeric"
                />
                <Spacer height={Mixins.scaleSize(28)} />
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Password'}
                  labelColor={'#E5E5E6'}
                  error={isError}
                  formikError={formik.errors.password}
                  onChangeText={formik.handleChange('password')}
                  inputValue={formik.values.password}
                  width={Mixins.scaleSize(285)}
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
                <Spacer height={Mixins.scaleSize(28)} />
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Confirm Password'}
                  labelColor={'#E5E5E6'}
                  error={isError}
                  formikError={formik.errors.confirmPassword}
                  onChangeText={formik.handleChange('confirmPassword')}
                  inputValue={formik.values.confirmPassword}
                  width={Mixins.scaleSize(285)}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
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
                  secureTextEntry={isConfirmPasswordHide ? false : true}
                />
                <Spacer height={Mixins.scaleSize(28)} />
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Location'}
                  labelColor={'#E5E5E6'}
                  error={isError}
                  formikError={formik.errors.location}
                  onChangeText={formik.handleChange('location')}
                  inputValue={formik.values.location}
                  width={Mixins.scaleSize(260)}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                />
                <Spacer height={Mixins.scaleSize(28)} />
                <View>
                  <DropDownBtn
                    placeholder={'User selection type'}
                    value={formik?.values?.role}
                    onPress={() => {
                      refUserSelectionType.current.open();
                    }}
                  />
                  {formik.errors.role && isError && (
                    <View style={styles.errorlabelContainer}>
                      <Text style={styles.errorLabel}>
                        {formik.errors.role}
                      </Text>
                    </View>
                  )}
                </View>

                <Spacer height={Mixins.scaleSize(40)} />

                <FadeModal
                  refRBSheet={refUserSelectionType}
                  setIsVisible={() => {
                    refUserSelectionType.current.close();
                  }}
                  height={Mixins.WINDOW_HEIGHT * 0.3}>
                  <View style={{width: Mixins.WINDOW_WIDTH / 1.1}}>
                    <View>
                      <View style={styles.customerLabel}>
                        <TextElement fontType={'h6'}>
                          Select User Type
                        </TextElement>
                      </View>
                      <Spacer height={Mixins.scaleSize(10)} />
                      <RadioButtonGroup
                        options={UserSelectionTypeData}
                        dropdownClose={handleSelectOption}
                        radioBtnStyles={{marginTop: 20}}
                        radioContainer={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                        form={formik}
                        formikValue={'role'}
                        value={formik?.values?.role}
                        buttonStyle={{marginVertical: 5}}
                      />
                    </View>
                  </View>
                </FadeModal>

                <ButtonComponent
                  loader={isLoader}
                  buttonTitle={'Continue'}
                  style={styles.continueBtn}
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
        <Toast topOffset={60} config={toastConfig} />
        <Spacer height={Mixins.scaleSize(22)} />
        <TouchableOpacity
          activeOpacity={1}
          style={styles.alredayHaveAnAccountCon}
          onPress={() => {
            props.navigation.navigate('LoginScreen');
          }}>
          <TextElement
            fontType={'h8'}
            textStyle={styles.alredayHaveAnAccountLabel}>
            Already have an account?
          </TextElement>
          <TextElement fontType={'h8'} textStyle={styles.signInLabel}>
            {' Sign in'}
          </TextElement>
        </TouchableOpacity>

        <Spacer height={Mixins.scaleSize(100)} />
      </LayoutContainer>
    </>
  );
};

export default SignUpScreen;
