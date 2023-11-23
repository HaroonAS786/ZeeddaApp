import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import InputTextComponent from '../../../../../components/InputTextField';
import ButtonComponent from '../../../../../components/buttonComponent';
import {Formik} from 'formik';
import {createdSupplierValidation} from '../../../../../utils/helper';
import {useSelector} from 'react-redux';
import * as supplierApi from '../../../../../../services/api/supplier';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const CreateNewSupplierManagementScreen = props => {
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(state => state?.auth?.user);

  const handleCreatedSupplier = async supplierObject => {
    try {
      setIsLoader(true);
      const {
        data: {success},
      } = await supplierApi?.createSupplier({supplierObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Supplier Created',
          text2: 'Supplier has been created.',
          position: 'left',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again.',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setIsLoader(false);
    } catch (error) {
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
      <TextElement fontType={'h4'} textStyle={{color: Colors.BLACK}}>
        Suppliers Management
      </TextElement>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={{width: '100%', paddingHorizontal: 16}}>
        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          Add new Supplier
        </TextElement>
        <Toast topOffset={60} config={toastConfig} />
        <Spacer height={Mixins.scaleSize(12)} />
        <TextElement fontType={'h6'} textStyle={{color: Colors.BLACK}}>
          Company Information
        </TextElement>
        <Formik
          onSubmit={supplierObject => handleCreatedSupplier(supplierObject)}
          initialValues={{
            company_name: '',
            company_email: '',
            company_phone: '',
            contact_firstname: '',
            contact_lastname: '',
            contact_email: '',
            contact_phone: '',
            company_address: '',
            company_website: '',
            user_id: user?.id,
          }}
          validationSchema={createdSupplierValidation}>
          {formik => {
            return (
              <>
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Company  Name '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.company_name}
                  onChangeText={formik.handleChange('company_name')}
                  inputValue={formik.values.company_name}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Company  Address '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.company_address}
                  onChangeText={formik.handleChange('company_address')}
                  inputValue={formik.values.company_address}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Company phone number '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.company_phone}
                  onChangeText={formik.handleChange('company_phone')}
                  inputValue={formik.values.company_phone}
                  error={isError}
                  keyboardType="numeric"
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Company email '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.company_email}
                  onChangeText={formik.handleChange('company_email')}
                  inputValue={formik.values.company_email}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Company website '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.company_website}
                  onChangeText={formik.handleChange('company_website')}
                  inputValue={formik.values.company_website}
                  error={isError}
                />

                <Spacer height={Mixins.scaleSize(20)} />
                <TextElement fontType={'h6'} textStyle={{color: Colors.BLACK}}>
                  Contact person information
                </TextElement>

                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'First name '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.contact_firstname}
                  onChangeText={formik.handleChange('contact_firstname')}
                  inputValue={formik.values.contact_firstname}
                  error={isError}
                />

                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Last name '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.contact_lastname}
                  onChangeText={formik.handleChange('contact_lastname')}
                  inputValue={formik.values.contact_lastname}
                  error={isError}
                />

                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Email address '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.contact_email}
                  onChangeText={formik.handleChange('contact_email')}
                  inputValue={formik.values.contact_email}
                  error={isError}
                />

                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Contact number '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.contact_phone}
                  onChangeText={formik.handleChange('contact_phone')}
                  inputValue={formik.values.contact_phone}
                  error={isError}
                  keyboardType="numeric"
                />

                <Spacer height={Mixins.scaleSize(30)} />
                <ButtonComponent
                  buttonTitle={'Add new supplier'}
                  style={styles.newSupplierBtn}
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
        <Spacer height={Mixins.scaleSize(30)} />
      </View>
    </LayoutContainer>
  );
};

export default CreateNewSupplierManagementScreen;

const styles = StyleSheet.create({
  newSupplierBtn: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },

  inputWrap: {
    flexDirection: 'row',
  },
});
