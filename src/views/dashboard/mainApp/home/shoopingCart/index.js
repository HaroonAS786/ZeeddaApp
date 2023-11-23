import {View} from 'react-native';
import React, {useState, useRef, Text, useEffect} from 'react';
import getStyles from './styles';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import CartInputText from './components/cartInput';
import RadioButtonGroup from '../../../../../components/radioButton';
import {TextElement} from '../../../../../components/TextElement';
import SummaryContext from '../../myOrders/components/summaryContext';
import LayoutContainer from '../../../../../components/layoutContainer';
import {Formik} from 'formik';
import DropDownBtn from '../../../../../components/dropDownBtn';
import FadeModal from '../../../../../components/fadeModal';
import * as Yup from 'yup';
import ButtonComponent from '../../../../../components/buttonComponent';
import * as orderAPi from '../../../../../../services/api/order';
import {useSelector, useDispatch} from 'react-redux';
import {AppData} from '../../../../../../services/api/app-data';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authActions} from '../../../../../redux/actions/actions';

const ShoppingCartScreen = props => {
  const user = useSelector(state => state?.auth?.user);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState([]);
  const refUserSelectionType = useRef(null);

  const handleSelectOption = option => {
    refUserSelectionType.current.close();
  };

  const styles = getStyles();

  const checkoutValidation = Yup.object().shape({
    pay_method: Yup.object().nullable().required('Payment method is required'),
  });

  const handleCheckout = async values => {
    try {
      setIsLoader(true);
      const SubTotal =
        discount == 0 ? 0 : props.route.params?.item - discount / 100;
      const vatCal =
        vat == 0
          ? 0
          : ((props.route.params?.item - discount / 100) * vat) / 100;

      const Checkout = {
        ...values,
        pay_method: values?.pay_method?.key,
        shipping_method: values?.shipping_method?.key,
        total_price: props.route.params?.item - SubTotal + vatCal,
      };
      const response = await orderAPi?.placeOrder({Checkout});
      if (response?.data?.result) {
        await AsyncStorage.setItem('CheckoutItem', JSON.stringify([]));
        await dispatch(authActions.CartItem([]));
        await dispatch(authActions.CartAmount(0));
        await dispatch(authActions.CallEffect(true));
        props.navigation.navigate('OrderCompleteScreen');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to place order',
          text2: `${response?.data?.error}`,
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setIsLoader(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Failed to place order',
        text2: `Please Try again`,
        position: 'left',
        visibilityTime: 4000,
      });
      setIsLoader(false);
    }
  };

  const CalculateCodePrice = async () => {
    try {
      const objectCode = {
        user_id: user?.id,
        discount_code: promoCode,
      };
      const response = await orderAPi?.postPromoCode({objectCode});
      console.log('enter', response);
      if (response?.data?.success) {
        setDiscount(response?.data?.discount?.amount_percent);
      } else {
        setDiscount(0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetAppData();
  }, []);

  const GetAppData = async () => {
    try {
      const {
        data: {vats},
      } = await AppData();
      const matchingVat = vats.find(vat => vat.applied_to == user?.role_id);
      if (matchingVat) {
        setVat(matchingVat.tax_percent);
      } else {
        setVat(0);
      }
    } catch (error) {}
  };

  const SubTotal =
    discount == 0 ? 0 : props.route.params?.item - discount / 100;
  const vatCal =
    vat == 0 ? 0 : ((props.route.params?.item - discount / 100) * vat) / 100;

  return (
    <View style={styles.mainTop}>
      <LayoutContainer
        header
        header2
        noHeight
        style={{flex: 1}}
        backOnPress={() => props.navigation.goBack()}>
        <Spacer height={Mixins.scaleSize(60)} />
        <View style={styles.body}>
          <View>
            <Formik
              onSubmit={values => handleCheckout(values)}
              initialValues={{
                shipping_method: {label: 'zeedda', key: 'zeeddaShipping'},
                pay_method: '',
                user_id: user?.id,
                pay_method: '',
                total_price: '',
              }}
              enableReinitialize={true}
              validationSchema={checkoutValidation}>
              {formik => {
                return (
                  <>
                    <Toast topOffset={60} config={toastConfig} />
                    <Spacer height={Mixins.scaleSize(20)} />
                    <CartInputText
                      placeholder={'Add Promo Code'}
                      keyboardType="number-pad"
                      isOffer
                      setPromoCode={setPromoCode}
                      offerOnPress={() => CalculateCodePrice()}
                    />

                    <CartInputText placeholder={'Add Shipping Address'} />
                    <Spacer height={Mixins.scaleSize(4)} />

                    <View
                      style={{
                        flexDirection: 'column',
                      }}>
                      <View>
                        <DropDownBtn
                          placeholder={'Select payment method'}
                          value={formik?.values?.pay_method}
                          onPress={() => {
                            refUserSelectionType.current.open();
                          }}
                          formikError={formik?.errors?.pay_method}
                          error={isError}
                          errorStyle={{width: '60%'}}
                        />
                      </View>

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
                                Select payment method
                              </TextElement>
                            </View>
                            <Spacer height={Mixins.scaleSize(10)} />
                            <RadioButtonGroup
                              options={[
                                {key: 1, label: 'Wallet'},
                                {key: 2, label: 'paystack'},
                                {key: 3, label: 'cash on delivery'},
                              ]}
                              dropdownClose={handleSelectOption}
                              radioBtnStyles={{marginTop: 20}}
                              radioContainer={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                              }}
                              form={formik}
                              formikValue={'pay_method'}
                              value={formik?.values?.pay_method}
                              buttonStyle={{marginVertical: 5}}
                            />
                          </View>
                        </View>
                      </FadeModal>
                      <Spacer height={Mixins.scaleSize(30)} />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextElement
                          fontType={'h9'}
                          textStyle={styles.shippingLabel}>
                          Select Shipping Method
                        </TextElement>
                        <RadioButtonGroup
                          options={[
                            {label: 'Self shipping', key: 'selfShipping'},
                            {label: 'zeedda', key: 'zeeddaShipping'},
                          ]}
                          dropdownClose={() => {}}
                          radioContainer={'100%'}
                          selectedOption={selectedOption}
                          onSelect={() => {}}
                          radioBtnStyles={{flexDirection: 'row'}}
                          form={formik}
                          formikValue={'shipping_method'}
                          value={formik?.values?.shipping_method}
                        />
                      </View>
                    </View>
                    <Spacer height={Mixins.scaleSize(4)} />
                    <SummaryContext
                      leftLabel={'Subtotal'}
                      rightLabel={`₦ ${props.route.params?.item}`}
                      leftLabelStyle={{color: 'grey'}}
                      leftFontSize={'h6'}
                      rightLabelStyle={{color: Colors.PRIMARY}}
                      rightFontSize={'h6'}
                    />

                    <Spacer height={Mixins.scaleSize(4)} />
                    <SummaryContext
                      leftLabel={'Discount'}
                      rightLabel={`₦ ${SubTotal}`}
                      leftLabelStyle={{color: 'grey'}}
                      leftFontSize={'h6'}
                      rightLabelStyle={{color: Colors.PRIMARY}}
                      rightFontSize={'h6'}
                    />
                    <Spacer height={Mixins.scaleSize(12)} />
                    <SummaryContext
                      leftLabel={'VAT'}
                      rightLabel={`₦ ${vatCal}`}
                      leftLabelStyle={{color: 'grey'}}
                      leftFontSize={'h6'}
                      rightLabelStyle={{color: Colors.PRIMARY}}
                      rightFontSize={'h6'}
                    />

                    <Spacer height={Mixins.scaleSize(12)} />

                    <View
                      style={{
                        backgroundColor: 'lightgrey',
                        height: 1,
                      }}
                    />
                    <Spacer height={Mixins.scaleSize(12)} />
                    <SummaryContext
                      leftLabel={'Total:'}
                      rightLabel={`₦ ${
                        props.route.params?.item - SubTotal + vatCal
                      }`}
                      leftLabelStyle={{color: Colors.PRIMARY}}
                      leftFontSize={'h4'}
                      rightLabelStyle={{color: Colors.PRIMARY}}
                      rightFontSize={'h4'}
                    />
                    <Spacer height={Mixins.scaleSize(18)} />

                    <ButtonComponent
                      loader={isLoader}
                      buttonTitle={'Checkout'}
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
          </View>
        </View>
      </LayoutContainer>
    </View>
  );
};

export default ShoppingCartScreen;
