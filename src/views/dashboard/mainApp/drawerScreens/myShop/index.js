import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import getStyles from './styles';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../styles';
import Spacer from '../../../../../components/Spacer';
import {
  CancelSVGComponent,
  ImageCameraSvg,
  GallerySVGComponent,
  UploadProductSVGComponent,
} from '../../../../../assets/svgs';
import InputTextComponent from '../../../../../components/InputTextField';
import ButtonComponent from '../../../../../components/buttonComponent';
import RippleEffect from '../../../../../components/rippleEffect';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  RequestCameraPermission,
  RequestExternalWritePermission,
  createShopValidation,
} from '../../../../../utils/helper';
import {Formik} from 'formik';
import * as shopApi from '../../../../../../services/api/shop';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import FadeModal from '../../../../../components/fadeModal';
import {useRef} from 'react';

const MyShopScreen = props => {
  const styles = getStyles();
  const refImageSelectionType = useRef();

  useEffect(() => {
    fetchShopDetail();
  }, []);
  const user = useSelector(state => state?.auth?.user);
  const [imageSource, setImageSource] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shopDetail, setShopDetail] = useState(null);
  const [shopLoader, setShopLoader] = useState(true);

  const fetchShopDetail = async () => {
    try {
      const user_id = {
        user_id: user?.id,
        shop_id: user?.shop_id,
      };
      const {
        data: {shop, success},
      } = await shopApi?.getShop({
        user_id,
      });
      if (success) {
        setShopLoader(false);
        setShopDetail(shop?.[0]);
        setImageSource(shop?.[0]?.shop_picture);
        setRefreshing(false);
      } else {
        setShopLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      console.log(error);
      setRefreshing(false);
      setShopLoader(false);
    }
  };

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

  const handleCreateShop = async values => {
    try {
      setIsLoader(true);
      var createShop;
      if (uploadImage?.uri) {
        createShop = {
          ...values,
          shop_picture: uploadImage?.uri,
        };
      } else {
        createShop = values;
      }
      const {
        data: {success},
      } = await shopApi?.createShop({createShop});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Shop created',
          text2: 'Your shop has been created',
          position: 'left',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to create',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      setIsLoader(false);
    } catch (error) {
      setIsLoader(false);
    }
  };

  const ImageUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchShopDetail();
  }, []);

  return shopLoader ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  ) : (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[{}]}
      numColumns={1}
      renderItem={({}) => (
        <LayoutContainer
          header
          header2
          noHeight
          isHamBurger
          backOnPress={() => props.navigation.openDrawer()}>
          <Spacer height={Mixins.scaleSize(15)} />
          <TextElement
            fontType={'h5'}
            textStyle={{color: Colors.BLACK, alignSelf: 'center'}}>
            My Shop
          </TextElement>
          <Spacer height={Mixins.scaleSize(20)} />

          {imageSource || uploadImage ? (
            <ImageBackground
              source={
                uploadImage == null
                  ? {uri: ImageUrl + imageSource}
                  : uploadImage
              }
              resizeMode="cover"
              style={{
                width: Mixins.scaleSize(278),
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
                  setImageSource(null);
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
              <UploadProductSVGComponent />
              <TextElement
                fontType={'h7'}
                textStyle={{color: Colors.BLACK, alignSelf: 'center'}}>
                Select image from device
              </TextElement>
            </RippleEffect>
          )}
          <Toast topOffset={60} config={toastConfig} />

          <Formik
            onSubmit={values => handleCreateShop(values)}
            initialValues={{
              shop_title: shopDetail?.shop_title,
              shop_tagline: shopDetail?.shop_tagline,
              shop_about: shopDetail?.shop_about,
              facebook_url: shopDetail?.facebook_url,
              twitter_url: shopDetail?.twitter_url,
              shop_email: shopDetail?.shop_email,
              shop_whatsapp: shopDetail?.shop_whatsapp,
              shop_location: shopDetail?.shop_location,
              latitude: 1,
              longitude: 1,
              user_id: user?.id,
            }}
            enableReinitialize={true}
            validationSchema={createShopValidation}>
            {formik => {
              return (
                <>
                  <>
                    <Spacer height={Mixins.scaleSize(30)} />
                    <View style={styles.inputsWrap}>
                      <InputTextComponent
                        placeholder={'Shop title '}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.shop_title}
                        onChangeText={formik.handleChange('shop_title')}
                        inputValue={formik.values.shop_title}
                        error={isError}
                      />
                      <Spacer width={Mixins.scaleSize(15)} />
                      <InputTextComponent
                        placeholder={'Tagline '}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.shop_tagline}
                        onChangeText={formik.handleChange('shop_tagline')}
                        inputValue={formik.values.shop_tagline}
                        error={isError}
                      />
                    </View>
                    <Spacer height={Mixins.scaleSize(20)} />
                    <InputTextComponent
                      placeholder={'About... '}
                      labelColor={'#E5E5E6'}
                      style={{justifyContent: 'flex-start', textAlign: 'top'}}
                      containerHeight={Mixins.WINDOW_WIDTH * 0.2} // inputValue={}
                      backgroundColor={'transparent'}
                      textInputColor={'#E5E5E6'}
                      autoCorrect={false}
                      multiline={true}
                      formikError={formik.errors.shop_about}
                      onChangeText={formik.handleChange('shop_about')}
                      inputValue={formik.values.shop_about}
                      error={isError}
                    />

                    <Spacer height={Mixins.scaleSize(20)} />
                    <View style={styles.inputsWrap}>
                      <InputTextComponent
                        placeholder={'Facebook URL'}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.facebook_url}
                        onChangeText={formik.handleChange('facebook_url')}
                        inputValue={formik.values.facebook_url}
                        error={isError}
                      />
                      <Spacer width={Mixins.scaleSize(15)} />
                      <InputTextComponent
                        placeholder={'Email '}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.shop_email}
                        onChangeText={formik.handleChange('shop_email')}
                        inputValue={formik.values.shop_email}
                        error={isError}
                      />
                    </View>
                    <Spacer height={Mixins.scaleSize(20)} />
                    <View style={styles.inputsWrap}>
                      <InputTextComponent
                        placeholder={'Twitter URL'}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.twitter_url}
                        onChangeText={formik.handleChange('twitter_url')}
                        inputValue={formik.values.twitter_url}
                        error={isError}
                      />
                      <Spacer width={Mixins.scaleSize(15)} />
                      <InputTextComponent
                        placeholder={'Whatsapp'}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.shop_whatsapp}
                        onChangeText={formik.handleChange('shop_whatsapp')}
                        inputValue={formik.values.shop_whatsapp}
                        error={isError}
                        keyboardType="numeric"
                      />
                    </View>
                    <Spacer height={Mixins.scaleSize(20)} />
                    <View style={styles.inputsWrap2}>
                      <Spacer width={Mixins.scaleSize(16)} />
                      <InputTextComponent
                        capatalize={'none'}
                        placeholder={'Location '}
                        labelColor={'#E5E5E6'}
                        containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                        backgroundColor={'transparent'}
                        textInputColor={'#E5E5E6'}
                        autoCorrect={false}
                        formikError={formik.errors.shop_location}
                        onChangeText={formik.handleChange('shop_location')}
                        inputValue={formik.values.shop_location}
                        error={isError}
                      />
                      <Spacer width={Mixins.scaleSize(15)} />
                    </View>
                    <Spacer height={Mixins.scaleSize(40)} />
                  </>
                  <ButtonComponent
                    buttonTitle={
                      shopDetail?.shop_title ? 'Update Shop' : 'Create Shop'
                    }
                    style={styles.createShopBtn}
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
        </LayoutContainer>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default MyShopScreen;
