import {View, Button} from 'react-native';
import React, {useRef, useState} from 'react';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import getStyles from './styles';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import ButtonComponent from '../../../../../components/buttonComponent';
import InputTextComponent from '../../../../../components/InputTextField';
import {amountValidation} from '../../../../../utils/helper';
import {Formik} from 'formik';
// import RNPaysack from 'react-native-paystack';

const SendCashScreen = props => {
  const {item} = props?.route?.params;
  const styles = getStyles();
  const refSelectPaymentMethod = useRef();
  const refPaymentSuccessful = useRef();
  const [selectedPayment, setSelectedPayment] = useState();
  const [isError, setIsError] = useState(false);
  const [index, setIndex] = useState(-1);
  const [loader, setLoader] = useState(false);
  const [isSelected, setIsSelected] = useState(true);
  const [isPaymentSelected, setIsPaymentSelected] = useState(false);
  const [amount, setAmount] = useState(0);

  // const initializePayment = () => {
  //   RNPaysack.initialize({
  //     publicKey: 'pk_test_f2e268ae4c6a58671669747a77ba01247568343e',
  //   });
  //   const paymentOptions = {
  //     amountInKobo: 5000,
  //     currency: 'NGN',
  //     email: 'user@example.com',
  //     reference: 'unique_reference',
  //   };

  //   RNPaysack.chargeCard(paymentOptions)
  //     .then(response => {
  //       console.log('Payment successful: ', response);
  //     })
  //     .catch(error => {
  //       console.log('Payment error: ', error);
  //     });
  // };

  const handleAmount = option => {
    setIsError(false);
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      refSelectPaymentMethod.current.open();
    }, 4000);
  };

  return (
    <LayoutContainer
      header2
      header
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(10)} />
      <TextElement fontType={'h5'} textStyle={styles.sendLabel}>
        Send wallet
      </TextElement>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={styles.walletBalanceBox}>
        <Spacer height={Mixins.scaleSize(20)} />
        <TextElement fontType={'h8'} textStyle={styles.contentLabel}>
          Wallet Balance
        </TextElement>
        <Spacer height={Mixins.scaleSize(4)} />
        <TextElement fontType={'h5'} textStyle={styles.contentLabel}>
          ₦ {item}
        </TextElement>
      </View>
      <Spacer height={Mixins.scaleSize(40)} />
      <Formik
        onSubmit={values => handleAmount(values)}
        initialValues={{
          amount: '',
        }}
        validationSchema={amountValidation}>
        {formik => {
          return (
            <>
              <InputTextComponent
                capatalize={'none'}
                placeholder={'Enter amount'}
                labelColor={'#E5E5E6'}
                error={isError}
                formikError={formik.errors.amount}
                onChangeText={item => setAmount(item)}
                inputValue={formik.values.amount}
                width={Mixins.scaleSize(260)}
                backgroundColor={'transparent'}
                textInputColor={'#E5E5E6'}
                autoCorrect={false}
                keyboardType="numeric"
              />
              <Spacer height={Mixins.scaleSize(20)} />
              <TextElement fontType={'h8'} textStyle={styles.fundsAdded}>
                Funds will be added to your account account
              </TextElement>
              <Spacer height={Mixins.scaleSize(40)} />
              <ButtonComponent
                buttonTitle={'Continue'}
                loader={loader}
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

      {/* <Button title="Pay with Paystack" onPress={initializePayment} /> */}
    </LayoutContainer>
  );
};

export default SendCashScreen;
