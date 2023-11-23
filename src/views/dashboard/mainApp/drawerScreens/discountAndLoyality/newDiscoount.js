import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import InputTextComponent from '../../../../../components/InputTextField';
import ButtonComponent from '../../../../../components/buttonComponent';
import CustomDropDown from '../../../../../assets/svgs/customDropdown';
import {Formik} from 'formik';
import {createDiscountValidation} from '../../../../../utils/helper';
import * as productApi from '../../../../../../services/api/product';
import CalendarPickerForm from '../../../../../components/Calendar';
import * as discountApi from '../../../../../../services/api/discount';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const CreateNewDiscountScreen = props => {
  const user = useSelector(state => state?.auth?.user);

  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [productListing, setProductListing] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const userId = {
        user_id: user?.id,
      };
      const {data: result, data: success} = await productApi?.getProduct({
        userId,
      });
      if (success) {
        const product = [];
        result?.result?.forEach(obj => {
          product.push({
            key: obj.id,
            label: obj.product_name,
          });
        });

        let concatenatedIds = '';
        result?.result.forEach((product, index) => {
          if (index > 0) {
            concatenatedIds += ',';
          }
          concatenatedIds += product.id;
        });
        product.unshift({
          key: concatenatedIds,
          label: 'All',
        });

        setProductListing(product);
      }
    } catch (error) {
      console.log();
    }
  };

  const handleCreatedDiscount = async values => {
    try {
      setIsLoader(true);
      const discountObject = {
        ...values,
        selected_products: values?.selected_products?.key,
      };
      const {
        data: {success},
      } = await discountApi?.createDiscount({discountObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Discount Created',
          text2: 'Discount has been created.',
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
      console.log('error', error);
      setIsLoader(false);
    }
  };

  return (
    <LayoutContainer
      header
      header2
      noHeight
      style={{flex: 1}}
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(20)} />
      <TextElement fontType={'h4'} textStyle={{color: Colors.BLACK}}>
        Discount & Loyalty Management
      </TextElement>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={{width: '100%', paddingHorizontal: 16}}>
        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          Create New Discount
        </TextElement>
        <Toast topOffset={60} config={toastConfig} />
        <Formik
          onSubmit={values => handleCreatedDiscount(values)}
          initialValues={{
            discount_title: '',
            discount_code: '',
            selected_products: '',
            start_date: '',
            end_date: '',
            discount_percent: '',
            user_id: user?.id,
          }}
          validationSchema={createDiscountValidation}>
          {formik => {
            return (
              <>
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Promo title'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.discount_title}
                  onChangeText={formik.handleChange('discount_title')}
                  inputValue={formik.values.discount_title}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Promo discount'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.discount_percent}
                  onChangeText={formik.handleChange('discount_percent')}
                  inputValue={formik.values.discount_percent}
                  error={isError}
                  keyboardType="numeric"
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Promo code'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.discount_code}
                  onChangeText={formik.handleChange('discount_code')}
                  inputValue={formik.values.discount_code}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <View style={{zIndex: 999}}>
                  <CustomDropDown
                    options={productListing}
                    formik={formik}
                    field={formik.getFieldProps('selected_products')}
                    value={formik.values.selected_products}
                    style={{
                      width: Mixins.WINDOW_WIDTH / 1.1,
                      height: Mixins.scaleSize(45),
                      borderColor: 'lightgrey',
                    }}
                    dropContStyle={{
                      width: Mixins.WINDOW_WIDTH / 1.1,
                      borderColor: 'lightgrey',
                    }}
                    filterCall={() => {}}
                    onSelect={() => formik.setFieldTouched('selected_products')}
                    label={'Select Products'}
                    formikError={formik.errors.selected_products}
                    error={isError}
                  />
                </View>
                <Spacer height={Mixins.scaleSize(20)} />

                <View style={styles.inputWrap}>
                  <CalendarPickerForm
                    values={formik.values.start_date}
                    formikError={formik.errors.start_date}
                    error={isError}
                    setFieldValue={formik.setFieldValue}
                    containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                    placeholder={'Start Date'}
                    formikValue={'start_date'}
                    value={formik.values.start_date}
                  />

                  <Spacer width={Mixins.scaleSize(20)} />
                  <CalendarPickerForm
                    values={formik.values.start_date}
                    formikError={formik.errors.start_date}
                    error={isError}
                    setFieldValue={formik.setFieldValue}
                    containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                    placeholder={'End Date'}
                    formikValue={'end_date'}
                    value={formik.values.end_date}
                  />
                </View>
                <Spacer height={Mixins.scaleSize(30)} />
                <ButtonComponent
                  buttonTitle={'Create Discount'}
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

export default CreateNewDiscountScreen;

const styles = StyleSheet.create({
  newAdminBtn: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },

  inputWrap: {
    flexDirection: 'row',
  },
});
