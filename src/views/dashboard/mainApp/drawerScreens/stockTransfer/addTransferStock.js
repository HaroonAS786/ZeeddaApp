import {View, StyleSheet, Platform, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import InputTextComponent from '../../../../../components/InputTextField';
import ButtonComponent from '../../../../../components/buttonComponent';
import RadioButtonGroup from '../../../../../components/radioButton';
import CustomDropDown from '../../../../../assets/svgs/customDropdown';
import {createStockValidation} from '../../../../../utils/helper';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import * as productApi from '../../../../../../services/api/product';
import * as branchApi from '../../../../../../services/api/branch';
import * as stockTransferApi from '../../../../../../services/api/stock-transfer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import {getShop} from '../../../../../../services/api/shop';

const AddTransferStock = props => {
  useEffect(() => {
    fetchSourceBranch();
    fetchDestinationBranch();
    fetchProduct();
  }, []);

  const user = useSelector(state => state?.auth?.user);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [productListing, setProductListing] = useState([]);
  const [sourceBranchListing, setSourceBranchListing] = useState([]);
  const [branchListing, setBranchListing] = useState([]);

  const handleCreatedSupport = async values => {
    try {
      setIsLoader(true);
      const stockObject = {
        ...values,
        destination_branch: values?.destination_branch?.key,
        selected_products: values?.selected_products?.key,
        source_branch: values?.source_branch?.key,
        shipping_method: values?.shipping_method?.key,
      };
      const {data: success} = await stockTransferApi?.createStockTransfer({
        stockObject,
      });
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Stock Transfer',
          text2: 'Stock Transfer has been successfully.',
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

  const fetchSourceBranch = async () => {
    try {
      const branchObject = {
        user_id: user?.id,
      };
      const {
        data: {success, branches},
      } = await branchApi?.getBranchListing({
        branchObject,
      });
      if (success) {
        const branchList = [];
        branches?.forEach(obj => {
          branchList.push({
            key: obj.id,
            label: obj.branch_name,
          });
        });
        setSourceBranchListing(branchList);
        const user_id = {
          user_id: user?.id,
          shop_id: user?.shop_id,
        };
        const {
          data: {shop, success},
        } = await getShop({
          user_id,
        });
        if (success) {
          branchList.push({
            key: -1,
            label: shop?.[0]?.shop_title,
          });
        }
      }
    } catch (error) {}
  };

  const fetchDestinationBranch = async () => {
    try {
      const branchObject = {
        user_id: user?.id,
      };
      const {
        data: {success, branches},
      } = await branchApi?.getBranchListing({
        branchObject,
      });
      if (success) {
        const branchList = [];
        branches?.forEach(obj => {
          branchList.push({
            key: obj.id,
            label: obj.branch_name,
          });
        });
        setBranchListing(branchList);
      }
    } catch (error) {}
  };

  return (
    <LayoutContainer
      header
      header2
      noHeight
      style={{flex: 1}}
      backOnPress={() => props.navigation.goBack()}>
      {Platform.OS === 'ios' && <Spacer height={Mixins.scaleSize(35)} />}
      <TextElement fontType={'h4'} textStyle={styles.label}>
        Stock Transfer
      </TextElement>
      <Toast topOffset={60} config={toastConfig} />
      <Formik
        onSubmit={values => handleCreatedSupport(values)}
        initialValues={{
          selected_quantities: '',
          selected_products: '',
          source_branch: '',
          destination_branch: '',
          shipping_method: {label: 'zeedda', key: 'zeedda'},
          user_id: user?.id,
        }}
        validationSchema={createStockValidation}>
        {formik => {
          return (
            <>
              <Spacer height={Mixins.scaleSize(30)} />
              <View
                style={{
                  flexDirection: 'row',
                  zIndex: 99999,
                }}>
                <CustomDropDown
                  options={sourceBranchListing}
                  formik={formik}
                  field={formik.getFieldProps('source_branch')}
                  value={formik.values.source_branch}
                  style={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    height: Mixins.scaleSize(45),
                    borderColor: 'lightgrey',
                  }}
                  dropContStyle={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    borderColor: 'lightgrey',
                  }}
                  filterCall={() => {}}
                  onSelect={() => formik.setFieldTouched('source_branch')}
                  label={'Source Branch'}
                  formikError={formik.errors.source_branch}
                  error={isError}
                />
                <Spacer width={Mixins.scaleSize(15)} />
                <CustomDropDown
                  options={branchListing}
                  formik={formik}
                  field={formik.getFieldProps('destination_branch')}
                  value={formik.values.destination_branch}
                  style={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    height: Mixins.scaleSize(45),
                    borderColor: 'lightgrey',
                  }}
                  dropContStyle={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    borderColor: 'lightgrey',
                  }}
                  filterCall={() => {}}
                  onSelect={() => formik.setFieldTouched('destination_branch')}
                  label={'Destination Branch'}
                  formikError={formik.errors.destination_branch}
                  error={isError}
                />
              </View>
              <Spacer height={Mixins.scaleSize(30)} />

              <View style={styles.dropDownWrap}>
                <CustomDropDown
                  options={productListing}
                  formik={formik}
                  field={formik.getFieldProps('selected_products')}
                  value={formik.values.selected_products}
                  style={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    height: Mixins.scaleSize(45),
                    borderColor: 'lightgrey',
                  }}
                  dropContStyle={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    borderColor: 'lightgrey',
                  }}
                  filterCall={() => {}}
                  onSelect={() => formik.setFieldTouched('selected_products')}
                  label={'Select Products'}
                  formikError={formik.errors.selected_products}
                  error={isError}
                />
                <Spacer width={Mixins.scaleSize(15)} />
                <InputTextComponent
                  placeholder={'Quantity'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.selected_quantities}
                  onChangeText={formik.handleChange('selected_quantities')}
                  inputValue={formik.values.selected_quantities}
                  error={isError}
                  keyboardType="numeric"
                />
              </View>

              <Spacer height={Mixins.scaleSize(15)} />
              <View style={styles.radioBtnView}>
                <TextElement fontType={'h9'} textStyle={styles.shippingLabel}>
                  Select Shipping Method
                </TextElement>

                <RadioButtonGroup
                  options={[
                    {label: 'Self shipping', key: 'Self-shipping'},
                    {label: 'zeedda', key: 'zeedda'},
                  ]}
                  form={formik}
                  radioBtnStyles={{
                    flexDirection: 'row',
                    marginTop: 6,
                  }}
                  dropdownClose={() => {}}
                  formikValue={'shipping_method'}
                  value={formik?.values?.shipping_method}
                />
              </View>
              <Spacer height={Mixins.scaleSize(30)} />

              <ButtonComponent
                buttonTitle={'Transfer Stock'}
                style={styles.transferBtn}
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
    </LayoutContainer>
  );
};

export default AddTransferStock;

const styles = StyleSheet.create({
  label: {
    color: Colors.BLACK,
  },
  inputsWrap: {
    flexDirection: 'row',
  },
  transferBtn: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },

  shippingLabel: {
    color: 'grey',
  },
  radioBtnView: {
    flexDirection: 'row',

    width: Mixins.WINDOW_WIDTH,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDownWrap: {
    flexDirection: 'row',
    zIndex: 999,
  },
});
