import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import LayoutContainer from '../../../../../../components/layoutContainer';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import ButtonComponent from '../../../../../../components/buttonComponent';
import InputTextComponent from '../../../../../../components/InputTextField';
import CustomDropDown from '../../../../../../assets/svgs/customDropdown';
import {Colors, Mixins} from '../../../../../../styles';
import CalendarPickerForm from '../../../../../../components/Calendar';
import {newInventoryValidation} from '../../../../../../utils/helper';
import {Formik} from 'formik';
import * as productApi from '../../../../../../../services/api/product';
import * as inventoryApi from '../../../../../../../services/api/inventory';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../../components/Toaster/ToastConfig';
import {useSelector} from 'react-redux';

const NewInventoryScreen = props => {
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
      const {
        data: {success},
        data: {result},
      } = await productApi?.getProduct({
        userId,
      });
      if (success) {
        const product = [];
        result?.forEach(obj => {
          product.push({
            key: obj.id,
            label: obj.product_name,
          });
        });
        setProductListing(product);
      }
    } catch (error) {}
  };

  const handleCreatedInventory = async value => {
    try {
      setIsLoader(true);
      const InventoryObject = {...value, product_id: value?.product_id?.key};
      const {
        data: {success},
      } = await inventoryApi?.createInventory({
        InventoryObject,
      });
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Inventory created',
          text2: 'Inventory has been created successfully.',
          position: 'left',
          visibilityTime: 4000,
        });
        setIsLoader(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      setIsLoader(false);
      console.log(error);
    }
  };

  const filterCall = () => {};
  return (
    <View style={{flex: 1}}>
      <LayoutContainer
        header
        header2
        noHeight
        style={{flex: 1}}
        backOnPress={() => props.navigation.goBack()}>
        <Spacer height={Mixins.scaleSize(15)} />
        <TextElement
          fontType={'h4'}
          textStyle={{color: Colors.BLACK, alignSelf: 'center'}}>
          New Inventory
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <View style={{flex: 1}}>
          <Formik
            onSubmit={values => handleCreatedInventory(values)}
            initialValues={{
              product_id: '',
              user_id: user?.id,
              quantity: '',
              cost_price: '',
              re_order_level: '',
              selling_price: '',
              product_expiry: '',
            }}
            validationSchema={newInventoryValidation}>
            {formik => {
              return (
                <>
                  <View style={styles.dropDownWrap}>
                    <View style={{zIndex: 999}}>
                      <CustomDropDown
                        options={productListing}
                        formik={formik}
                        field={formik.getFieldProps('product_id')}
                        value={formik.values.product_id}
                        style={{
                          width: Mixins.WINDOW_WIDTH / 2.3,
                          height: Mixins.scaleSize(45),
                          borderColor: 'lightgrey',
                        }}
                        filterCall={() => filterCall}
                        dropContStyle={{
                          width: Mixins.WINDOW_WIDTH / 2.3,
                          borderColor: 'lightgrey',
                        }}
                        onSelect={() => formik.setFieldTouched('product_id')}
                        label={'Select Products'}
                        formikError={formik.errors.product_id}
                        error={isError}
                      />
                    </View>
                    <Spacer width={Mixins.scaleSize(15)} />
                    <CalendarPickerForm
                      values={formik.values.product_expiry}
                      formikError={formik.errors.product_expiry}
                      error={isError}
                      setFieldValue={formik.setFieldValue}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      placeholder={'Expiry Date'}
                      formikValue={'product_expiry'}
                      value={formik.values.product_expiry}
                    />
                  </View>
                  <Spacer height={Mixins.scaleSize(20)} />
                  <View style={styles.inputsWrap}>
                    <InputTextComponent
                      placeholder={'Quantity'}
                      labelColor={'#E5E5E6'}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                      formikError={formik.errors.quantity}
                      onChangeText={formik.handleChange('quantity')}
                      inputValue={formik.values.quantity}
                      error={isError}
                      keyboardType="numeric"
                    />
                    <Spacer width={Mixins.scaleSize(15)} />
                    <InputTextComponent
                      placeholder={'Re-order level'}
                      labelColor={'#E5E5E6'}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                      formikError={formik.errors.re_order_level}
                      onChangeText={formik.handleChange('re_order_level')}
                      inputValue={formik.values.re_order_level}
                      error={isError}
                    />
                  </View>
                  <Spacer height={Mixins.scaleSize(20)} />
                  <View style={styles.inputsWrap}>
                    <InputTextComponent
                      placeholder={'Cost price / Unit'}
                      labelColor={'#E5E5E6'}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                      formikError={formik.errors.cost_price}
                      onChangeText={formik.handleChange('cost_price')}
                      inputValue={formik.values.cost_price}
                      error={isError}
                    />
                    <Spacer width={Mixins.scaleSize(15)} />
                    <InputTextComponent
                      placeholder={'Selling price / Unit'}
                      labelColor={'#E5E5E6'}
                      containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                      formikError={formik.errors.selling_price}
                      onChangeText={formik.handleChange('selling_price')}
                      inputValue={formik.values.selling_price}
                      error={isError}
                    />
                  </View>
                  <Spacer height={Mixins.scaleSize(30)} />
                  <ButtonComponent
                    buttonTitle={'Add Product'}
                    style={styles.createProductBtn}
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
          <Toast topOffset={60} config={toastConfig} />
        </View>
      </LayoutContainer>
    </View>
  );
};

export default NewInventoryScreen;

const styles = StyleSheet.create({
  inputsWrap: {
    flexDirection: 'row',
  },
  dropDownWrap: {
    flexDirection: 'row',
    zIndex: 999,
  },
  createProductBtn: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
});
