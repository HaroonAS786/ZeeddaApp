import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import RippleEffect from '../../../../../../components/rippleEffect';
import {TextElement} from '../../../../../../components/TextElement';
import InputTextComponent from '../../../../../../components/InputTextField';
import ButtonComponent from '../../../../../../components/buttonComponent';
import {reInitializationValidation} from '../../../../../../utils/helper';
import {Formik} from 'formik';
import Spacer from '../../../../../../components/Spacer';
import {Mixins, Colors} from '../../../../../../styles';
import HeaderLogoComponent from '../../../../../../assets/svgs/HeaderLogo';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {postReorderInitialize} from '../../../../../../../services/api/order';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../../components/Toaster/ToastConfig';

const ReOrderCard = ({item}) => {
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';
  const user = useSelector(state => state?.auth?.user);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleReInitialization = async values => {
    try {
      setIsLoader(true);
      console.log('enter');
      const reorderObject = values;
      const {
        data: {success},
      } = await postReorderInitialize({reorderObject});
      console.log(success);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Conformation',
          text2: 'Re-Order initiate successfully',
          position: 'left',
          visibilityTime: 4000,
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
      setIsVisible(false);
      setIsLoader(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      setIsVisible(false);
      setIsLoader(false);
    }
  };

  return (
    <View style={styles.mainWrap}>
      <Toast topOffset={60} config={toastConfig} />
      <View style={styles.topHeader}>
        <Spacer />
        <TextElement fontType={'h9'} textStyle={styles.label}>
          {moment(item.created_at).format('DD MMM, YYYY')}
        </TextElement>
      </View>
      <Spacer height={Mixins.scaleSize(12)} />

      <View style={styles.contentCont}>
        <Spacer width={Mixins.scaleSize(8)} />
        <Image
          style={styles.image}
          resizeMode={'cover'}
          source={{
            uri: baseUrl + item?.product_picture,
          }}
        />
        <View style={{backgroundColor: 'white', width: 120}}>
          <TextElement fontType={'h7'} textStyle={styles.title}>
            {item.product_name}
          </TextElement>
          <Spacer height={Mixins.scaleSize(2)} />
          <TextElement fontType={'h8'} textStyle={styles.amount}>
            Product ID : {item.id}
          </TextElement>
          <Spacer height={Mixins.scaleSize(2)} />
          <TextElement fontType={'h8'} textStyle={styles.amount}>
            Re-order level : {item.re_order_level}
          </TextElement>
          <Spacer height={Mixins.scaleSize(2)} />
          <TextElement fontType={'h8'} textStyle={styles.amount}>
            Qty : {item.quantity}
          </TextElement>
        </View>

        <View style={styles.leftView}>
          <RippleEffect style={styles.viewOrder} onPress={toggleModal}>
            <TextElement fontType={'h9'} textStyle={styles.viewLabel}>
              Initiate Re-Order
            </TextElement>
          </RippleEffect>
        </View>
        <Spacer width={Mixins.scaleSize(8)} />
      </View>

      <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
        <View
          style={{
            backgroundColor: 'white',

            borderRadius: 10,
            alignItems: 'center',
          }}>
          <HeaderLogoComponent />
          <Spacer height={Mixins.scaleSize(10)} />
          <RippleEffect onPress={toggleModal}>
            <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
              Enter Re-Order Amount
            </TextElement>
          </RippleEffect>
          <Spacer height={Mixins.scaleSize(15)} />

          <Formik
            onSubmit={values => handleReInitialization(values)}
            initialValues={{
              reorder_quantity: '',
              user_id: user?.id,
              product_id: item.id,
            }}
            enableReinitialize={true}
            validationSchema={reInitializationValidation}>
            {formik => {
              return (
                <>
                  <Spacer height={Mixins.scaleSize(20)} />
                  <InputTextComponent
                    capatalize={'none'}
                    placeholder={'Amount'}
                    labelColor={'#E5E5E6'}
                    containerWidth={Mixins.WINDOW_WIDTH / 1.5}
                    backgroundColor={'transparent'}
                    textInputColor={'#E5E5E6'}
                    autoCorrect={false}
                    keyboardType="numeric"
                    formikError={formik.errors.reorder_quantity}
                    onChangeText={formik.handleChange('reorder_quantity')}
                    inputValue={formik.values.reorder_quantity}
                    error={isError}
                  />
                  <Spacer height={Mixins.scaleSize(30)} />

                  <ButtonComponent
                    buttonTitle={'Confirm'}
                    style={{
                      width: Mixins.WINDOW_WIDTH / 1.9,
                      borderColor: Colors.PRIMARY,
                      backgroundColor: Colors.PRIMARY,
                    }}
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
        </View>
      </Modal>
    </View>
  );
};

export default ReOrderCard;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.WHITE,

    width: '100%',
    height: Mixins.scaleSize(116),

    marginTop: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.07)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  quantityLabel: {
    color: 'black',
    fontWeight: '400',
  },

  label: {
    color: 'lightgrey',
    fontWeight: '400',
  },
  viewLabel: {
    color: 'white',
    fontWeight: '400',
  },
  title: {
    color: Colors.BLACK,
    fontWeight: '400',
    width: 170,
  },
  desc: {
    color: '#25B900',
    fontWeight: '400',
  },
  amount: {
    color: 'grey',
    fontWeight: '400',
  },
  topHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 6,
    justifyContent: 'space-between',
  },

  viewOrder: {
    width: Mixins.scaleSize(100),
    height: Mixins.scaleSize(27),

    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: Mixins.scaleSize(70),
    height: Mixins.scaleSize(60),
    borderRadius: 10,
  },

  contentCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftView: {
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: Mixins.scaleSize(40),
  },
});
