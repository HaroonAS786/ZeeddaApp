import React, {useState} from 'react';
import {View} from 'react-native';
import {
  ConfirmPassSVGComponent,
  PassOpenSVGComponent,
  PasswordHideSVGComponent,
  ProfileLockSVGComponent,
} from '../../../../../../assets/svgs';
import ButtonComponent from '../../../../../../components/buttonComponent';
import LayoutContainer from '../../../../../../components/layoutContainer';
import RippleEffect from '../../../../../../components/rippleEffect';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';
import ProfileTextInput from '../../components/profileTextInput';
import getStyles from './styles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../../../../../../components/Toaster/ToastConfig';
import {Formik} from 'formik';
import {changePasswordValidation} from '../../../../../../utils/helper';
import {useSelector} from 'react-redux';
import * as profileApi from '../../../../../../../services/api/profile';

const ChangePasswordScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);

  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangePassword = async values => {
    try {
      setIsLoader(true);
      const passwordObject = {
        password: values?.password,
        new_password: values?.new_password,
        user_id: values?.user_id,
        email: values?.email,
      };
      const {
        data: {success, error},
      } = await profileApi?.changePassword({passwordObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Password Change',
          text2: 'Password has been successfully created.',
          position: 'left',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: `${error}`,
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
      setIsLoader(false);
    }
  };

  return (
    <LayoutContainer
      header2
      header
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(20)} />
      <TextElement fontType={'h5'} textStyle={styles.editLabel}>
        Edit Profile
      </TextElement>
      <Toast topOffset={60} config={toastConfig} />
      <Formik
        onSubmit={values => handleChangePassword(values)}
        initialValues={{
          password: '',
          new_password: '',
          confirmNewPassword: '',
          user_id: user?.id,
          email: user?.email,
        }}
        enableReinitialize={true}
        validationSchema={changePasswordValidation}>
        {formik => {
          return (
            <>
              <Spacer height={Mixins.scaleSize(50)} />
              <View>
                <ProfileTextInput
                  label={'Current Password'}
                  placeholder="Current Password"
                  leftIcon={<ProfileLockSVGComponent />}
                  rightIconPress={() =>
                    setIsCurrentPassword(!isCurrentPassword)
                  }
                  rightIcon={
                    isCurrentPassword ? (
                      <PasswordHideSVGComponent />
                    ) : (
                      <PassOpenSVGComponent />
                    )
                  }
                  obsecure={isCurrentPassword ? false : true}
                  placeholderTextColor={'#A7A9B7'}
                  formikError={formik.errors.password}
                  onChangeText={formik.handleChange('password')}
                  inputValue={formik.values.password}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(30)} />
                <ProfileTextInput
                  label={'New password'}
                  placeholder="New Password"
                  leftIcon={<ConfirmPassSVGComponent />}
                  rightIconPress={() => setIsNewPassword(!isNewPassword)}
                  rightIcon={
                    isNewPassword ? (
                      <PasswordHideSVGComponent />
                    ) : (
                      <PassOpenSVGComponent />
                    )
                  }
                  obsecure={isNewPassword ? false : true}
                  placeholderTextColor={'#A7A9B7'}
                  formikError={formik.errors.new_password}
                  onChangeText={formik.handleChange('new_password')}
                  inputValue={formik.values.new_password}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(12)} />
                <ProfileTextInput
                  label={'Confirm password'}
                  placeholder="Confirm Password"
                  leftIcon={<ConfirmPassSVGComponent />}
                  rightIconPress={() =>
                    setIsConfirmPassword(!isConfirmPassword)
                  }
                  rightIcon={
                    isConfirmPassword ? (
                      <PasswordHideSVGComponent />
                    ) : (
                      <PassOpenSVGComponent />
                    )
                  }
                  obsecure={isConfirmPassword ? false : true}
                  placeholderTextColor={'#A7A9B7'}
                  formikError={formik.errors.confirmNewPassword}
                  onChangeText={formik.handleChange('confirmNewPassword')}
                  inputValue={formik.values.confirmNewPassword}
                  error={isError}
                />
              </View>
              <Spacer height={Mixins.scaleSize(170)} />
              <ButtonComponent
                buttonTitle={'Change Password'}
                style={styles.updateBtn}
                rippleColor={Colors.WHITE}
                titleColor={Colors.WHITE}
                loader={isLoader}
                onPress={() => {
                  setIsError(true);
                  formik.submitForm();
                }}
              />
            </>
          );
        }}
      </Formik>
      <Spacer height={Mixins.scaleSize(60)} />
    </LayoutContainer>
  );
};

export default ChangePasswordScreen;
