import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from '../../../../../components/buttonComponent';
import InputTextComponent from '../../../../../components/InputTextField';
import LayoutContainer from '../../../../../components/layoutContainer';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../styles';
import {useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import * as adminApi from '../../../../../../services/api/admin';
import {Formik} from 'formik';
import {createAdminValidation} from '../../../../../utils/helper';

const CreateNewAdminScreen = props => {
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(state => state?.auth?.user);

  const handleCreatedAdmin = async adminObject => {
    try {
      setIsLoader(true);
      const {
        data: {success, error},
      } = await adminApi?.createAdmin({adminObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Admin created',
          text2: 'Admin has been successfully created.',
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
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={{width: '100%', paddingHorizontal: 16}}>
        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          Create New Admin
        </TextElement>
        <Toast topOffset={60} config={toastConfig} />
        <Formik
          onSubmit={adminObject => handleCreatedAdmin(adminObject)}
          initialValues={{
            admin_name: '',
            admin_email: '',
            admin_password: '',
            user_id: user?.id,
          }}
          validationSchema={createAdminValidation}>
          {formik => {
            return (
              <>
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Admin Name'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.admin_name}
                  onChangeText={formik.handleChange('admin_name')}
                  inputValue={formik.values.admin_name}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Admin email'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.admin_email}
                  onChangeText={formik.handleChange('admin_email')}
                  inputValue={formik.values.admin_email}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Admin password'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.admin_password}
                  onChangeText={formik.handleChange('admin_password')}
                  inputValue={formik.values.admin_password}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <ButtonComponent
                  buttonTitle={'Add  New Admin'}
                  style={styles.newAdminBtn}
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
      </View>
    </LayoutContainer>
  );
};

export default CreateNewAdminScreen;

const styles = StyleSheet.create({
  newAdminBtn: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
});
