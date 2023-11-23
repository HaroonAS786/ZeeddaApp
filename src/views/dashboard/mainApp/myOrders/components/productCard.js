import React, {useState} from 'react';
import {Image, StyleSheet, View, Text, ImageBackground} from 'react-native';
import {
  CartSVGComponent,
  ImageCameraSvg,
  GallerySVGComponent,
  CancelSVGComponent,
} from '../../../../../assets/svgs';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../styles';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from '../../../../../redux/actions/actions';
import ButtonComponent from '../../../../../components/buttonComponent';
import * as Yup from 'yup';
import InputTextComponent from '../../../../../components/InputTextField';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  RequestCameraPermission,
  RequestExternalWritePermission,
} from '../../../../../utils/helper';
import FadeModal from '../../../../../components/fadeModal';
import {useRef} from 'react';
import {addToCartItem} from '../../../../../../services/api/order';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCard = ({item}) => {
  const refImageSelectionType = useRef();
  const [cartItemDialog, setCartItemDialog] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const checkoutItem = useSelector(state => state?.auth?.item);
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';

  const addProductCartItem = Yup.object().shape({
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1)
      .max(item?.quantity),
  });

  const selectCameraImage = async () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      videoQuality: Platform.OS === 'ios' ? 'medium' : 'low',
    };

    let isCameraPermitted = await RequestCameraPermission();
    let isStoragePermitted = await RequestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      return launchCamera(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          return;
        } else if (response.errorCode === 'permission') {
          return;
        } else if (response.errorCode === 'others') {
          return;
        } else {
          const source = {uri: response?.assets[0]?.uri};
          setUploadImage(source);
          refImageSelectionType.current.close();
        }
      });
    }
  };

  const selectGalleryImage = async () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      videoQuality: Platform.OS === 'ios' ? 'medium' : 'low',
    };

    let isCameraPermitted = await RequestCameraPermission();
    let isStoragePermitted = await RequestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      return launchImageLibrary(options, response => {
        if (response.didCancel) {
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          return;
        } else if (response.errorCode === 'permission') {
          return;
        } else if (response.errorCode === 'others') {
          return;
        } else {
          const source = {uri: response?.assets[0]?.uri};
          setUploadImage(source);
          refImageSelectionType.current.close();
        }
      });
    }
  };

  const imageData = [
    {
      label: 'Camera',
      onPress: () => {
        selectCameraImage();
      },
      svg: <ImageCameraSvg />,
    },
    {
      label: 'Gallery',
      onPress: () => {
        selectGalleryImage();
      },
      svg: <GallerySVGComponent />,
    },
  ];

  const handleAddToCart = async values => {
    try {
      setIsLoader(true);

      let addToCart = values;
      if (item?.requires_perscription == 'True' && uploadImage == null) {
        setImageError(true);
      } else {
        if (item?.requires_perscription == 'True') {
          addToCart = {...values, prescription_image: uploadImage};
        }
        const response = await addToCartItem({addToCart});
        if (response?.data?.success) {
          const productPurchase = {
            ...item,
            purchaseQuantity: JSON?.parse(values?.quantity),
          };
          dispatch(authActions.CartAmount(0));
          dispatch(authActions.CartItem([...checkoutItem, productPurchase]));
          await AsyncStorage.setItem(
            'CheckoutItem',
            JSON?.stringify([...checkoutItem, productPurchase]),
          );
          setCartItemDialog(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failed',
            text2: 'Please try again.',
            position: 'left',
            visibilityTime: 4000,
          });
        }
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
      setCartItemDialog(false);
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again.',
        position: 'left',
        visibilityTime: 4000,
      });
    }
  };

  return (
    <>
      <Toast topOffset={20} config={toastConfig} />
      <Dialog
        visible={cartItemDialog}
        dialogStyle={{width: '95%'}}
        onTouchOutside={() => {
          setCartItemDialog(false);
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }>
        <DialogContent>
          <Text
            style={{
              color: '#000',
              paddingTop: 10,
              paddingBottom: 10,
              width: '100%',
              textAlign: 'center',
            }}>
            Please enter the amount you want to buy
          </Text>
          <Text
            style={{
              color: '#000',
              paddingTop: 10,
              paddingBottom: 10,
              width: '100%',
              textAlign: 'center',
            }}>
            Available Quantity: {item?.quantity}
          </Text>
          <Formik
            onSubmit={values => handleAddToCart(values)}
            initialValues={{
              quantity: '',
              product_id: item?.id,
              user_id: user?.id,
            }}
            enableReinitialize={true}
            validationSchema={addProductCartItem}>
            {formik => {
              return (
                <>
                  <View style={{zIndex: 999}}>
                    <InputTextComponent
                      placeholder={'Please enter quantity'}
                      labelColor={'#E5E5E6'}
                      containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                      formikError={formik.errors.quantity}
                      onChangeText={formik.handleChange('quantity')}
                      inputValue={formik.values.quantity}
                      error={isError}
                      keyboardType="numeric"
                    />
                  </View>
                  {item?.requires_perscription == 'True' ? (
                    <>
                      <Text
                        style={{
                          color: '#000',
                          paddingTop: 10,
                          textAlign: 'center',
                        }}>
                        This product requires a prescription
                      </Text>

                      {uploadImage ? (
                        <ImageBackground
                          source={uploadImage}
                          resizeMode="cover"
                          style={{
                            marginTop: 20,
                            width: Mixins.scaleSize(320),
                            height: Mixins.scaleSize(122),
                          }}>
                          <RippleEffect
                            style={{
                              width: 24,
                              height: 24,
                              position: 'absolute',
                              backgroundColor: 'white',
                              borderRadius: 100,
                              alignItems: 'center',
                              justifyContent: 'center',
                              top: 10,
                              right: 10,
                            }}
                            onPress={() => {
                              setUploadImage(null);
                            }}>
                            <CancelSVGComponent />
                          </RippleEffect>
                        </ImageBackground>
                      ) : (
                        <RippleEffect
                          style={styles.uploadProductCont}
                          activeOpacity={1}
                          onPress={() => {
                            refImageSelectionType.current.open();
                          }}>
                          <TextElement
                            fontType={'h7'}
                            textStyle={{
                              color: Colors.BLACK,
                              alignSelf: 'center',
                              marginVertical: 20,
                              paddingVertical: 10,
                              borderWidth: 1,
                              width: '100%',
                              textAlign: 'center',
                              borderRadius: 5,
                            }}>
                            Select image from device
                          </TextElement>
                        </RippleEffect>
                      )}
                    </>
                  ) : (
                    <Text style={{color: '#000', paddingTop: 10}}>
                      This product don't requires a prescription
                    </Text>
                  )}
                  {imageError && uploadImage == null ? (
                    <Text style={{color: 'red'}}>Please add prescription</Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    <ButtonComponent
                      buttonTitle={'Cancel'}
                      style={{
                        width: '85%',
                        backgroundColor: '#ffff',
                        borderWidth: 1,
                        borderColor: Colors.PRIMARY,
                      }}
                      rippleColor={Colors.WHITE}
                      titleColor={Colors.PRIMARY}
                      onPress={() => setCartItemDialog(false)}
                    />
                    <ButtonComponent
                      buttonTitle={'Buy Now'}
                      style={{width: '85%', borderWidth: 0}}
                      rippleColor={Colors.WHITE}
                      titleColor={Colors.WHITE}
                      loader={isLoader}
                      onPress={() => {
                        setIsError(true);
                        formik.submitForm();
                      }}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
      <View style={styles.mainWrap}>
        <View style={styles.contentCont}>
          <Spacer width={Mixins.scaleSize(8)} />
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={{uri: baseUrl + item?.product_picture}}
          />
          <Spacer width={Mixins.scaleSize(8)} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <TextElement fontType={'h6'} textStyle={styles.title}>
                {item.product_name}
              </TextElement>
              <Spacer height={Mixins.scaleSize(25)} />
              <RippleEffect
                onPress={() => {
                  setImageError(false);
                  setUploadImage(null);
                  setCartItemDialog(true);
                }}>
                <CartSVGComponent width={24} height={24} />
              </RippleEffect>
            </View>
            <Spacer height={Mixins.scaleSize(4)} />
            <TextElement fontType={'h8'} textStyle={styles.amount}>
              ₦ {item.product_price}
            </TextElement>

            <Spacer height={Mixins.scaleSize(4)} />
            <View style={styles.footerView}>
              <TextElement fontType={'h8'} textStyle={styles.desc}>
                {item?.product_description}
              </TextElement>
              <Spacer width={Mixins.scaleSize(100)} />
              <TextElement
                fontType={'h8'}
                style={{marginRight: 10, marginRight: 15}}
                textStyle={styles.desc}>
                {item.quantity}
              </TextElement>
            </View>
          </View>
        </View>
      </View>
      <FadeModal
        refRBSheet={refImageSelectionType}
        setIsVisible={() => {
          refImageSelectionType.current.close();
        }}
        height={Mixins.WINDOW_HEIGHT * 0.25}>
        <View style={{width: Mixins.WINDOW_WIDTH / 1.1}}>
          <View>
            <View style={styles.customerLabel}>
              <TextElement fontType={'h6'}>Select Image</TextElement>
            </View>
            <Spacer height={Mixins.scaleSize(20)} />
            {imageData?.map((val, indx) => {
              return (
                <>
                  <RippleEffect
                    onPress={val.onPress}
                    style={{flexDirection: 'row'}}>
                    {val.svg}
                    <Spacer width={Mixins.scaleSize(10)} />
                    <TextElement
                      fontType={'h5'}
                      key={indx}
                      textStyle={{color: 'black', fontWeight: '500'}}>
                      {val.label}
                    </TextElement>
                  </RippleEffect>
                  <Spacer
                    height={Mixins.scaleSize(20)}
                    textStyle={{color: 'black', fontWeight: '500'}}
                  />
                </>
              );
            })}
          </View>
        </View>
      </FadeModal>
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.WHITE,

    width: '100%',
    height: Mixins.scaleSize(100),
    justifyContent: 'center',
    marginTop: 14,
  },

  quantityLabel: {
    color: 'black',
    fontWeight: '400',
  },

  label: {
    color: 'lightgrey',
    fontWeight: '400',
  },
  trackLabel: {
    color: 'white',
    fontWeight: '400',
  },
  title: {
    color: Colors.BLACK,
    fontWeight: '400',
    width: '65%',
  },
  desc: {
    color: 'grey',
    fontWeight: '400',
  },
  amount: {
    color: Colors.PRIMARY,
    fontWeight: '400',
  },
  topHeader: {
    flexDirection: 'row',

    paddingTop: 6,
    justifyContent: 'space-between',
  },

  viewOrder: {
    width: Mixins.scaleSize(68),
    height: Mixins.scaleSize(22),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: Mixins.scaleSize(92),
    height: Mixins.scaleSize(84),
    borderRadius: 5,
  },

  contentCont: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },

  leftView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '77%',
  },
});
