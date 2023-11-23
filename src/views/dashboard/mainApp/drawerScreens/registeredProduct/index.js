import React, {useState, useEffect} from 'react';
import {View, ImageBackground} from 'react-native';
import getStyles from './styles';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../styles';
import Spacer from '../../../../../components/Spacer';
import {
  ImageCameraSvg,
  CancelSVGComponent,
  GallerySVGComponent,
  UploadProductSVGComponent,
} from '../../../../../assets/svgs';
import InputTextComponent from '../../../../../components/InputTextField';
import ButtonComponent from '../../../../../components/buttonComponent';
import CustomDropDown from '../../../../../assets/svgs/customDropdown';
import RippleEffect from '../../../../../components/rippleEffect';
import {
  RequestCameraPermission,
  RequestExternalWritePermission,
  createProductValidation,
} from '../../../../../utils/helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FadeModal from '../../../../../components/fadeModal';
import {useRef} from 'react';
import * as AppDataApi from '../../../../../../services/api/app-data';
import {Formik} from 'formik';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import CalendarPickerForm from '../../../../../components/Calendar';
import RadioButtonGroup from '../../../../../components/radioButton';
import * as productApi from '../../../../../../services/api/product';

const RegisterProductScreen = props => {
  const styles = getStyles();
  const refImageSelectionType = useRef();
  const user = useSelector(state => state?.auth?.user);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subFilterCategories, setSubFilterCategories] = useState([]);

  useEffect(() => {
    AppData();
  }, []);

  const AppData = async () => {
    try {
      const {
        data: {categories},
        data: {subcategories},
      } = await AppDataApi?.AppData();

      let filterCategories = [];
      categories?.forEach(obj => {
        filterCategories.push({
          key: obj.category_id,
          label: obj.category_name,
        });
      });
      setCategories(filterCategories);
      setSubCategories(subcategories);
    } catch (error) {}
  };

  const [imageSource, setImageSource] = useState(null);

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
          setImageSource(source);
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
          setImageSource(source);
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

  const handleCreatedProduct = async values => {
    try {
      setIsLoader(true);
      console.log(values?.requires_prescription?.key);
      const productObject = {
        ...values,
        product_picture: imageSource?.uri,
        category_id: values?.category_id?.key,
        subcategories: values?.subcategories?.key,
        requires_prescription: values?.requires_prescription?.key,
      };
      console.log('Product-Object', productObject);
      const {
        data: {success},
      } = await productApi?.createProducts({productObject});
      console.log('success', success);
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Product create',
          text2: 'Product create has been successfully.',
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

  const dropdownClose = () => {};

  const filterSubCategory = item => {
    try {
      const filterData = subCategories?.filter(
        subCategory => subCategory?.category_id == item?.key,
      );
      let filterSubCategories = [];
      filterData?.forEach(obj => {
        filterSubCategories.push({
          key: obj.subcategory_id,
          label: obj.subcategory_name,
        });
      });

      setSubFilterCategories(filterSubCategories);
    } catch (error) {}
  };

  return (
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
        Add Product
      </TextElement>
      <Spacer height={Mixins.scaleSize(20)} />

      {imageSource ? (
        <ImageBackground
          source={imageSource}
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
            onPress={() => setImageSource(null)}>
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
        onSubmit={values => handleCreatedProduct(values)}
        initialValues={{
          product_description: '',
          subcategories: '',
          category_id: '',
          suggested_sub_category: '',
          suggested_category: '',
          product_picture: '',
          requires_prescription: {label: 'Require Prescription', key: 'False'},
          product_expiry: '',
          product_name: '',
          user_id: user?.id,
          shop_id: user?.shop_id,
        }}
        enableReinitialize={true}
        validationSchema={createProductValidation}>
        {formik => {
          return (
            <>
              <Spacer height={Mixins.scaleSize(30)} />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: Mixins.WINDOW_WIDTH,
                  paddingHorizontal: 16,
                  zIndex: 1000,
                }}>
                <InputTextComponent
                  placeholder={'Product name'}
                  labelColor={'#E5E5E6'}
                  style={{justifyContent: 'flex-start', textAlign: 'top'}}
                  containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  multiline={true}
                  formikError={formik.errors.product_name}
                  onChangeText={formik.handleChange('product_name')}
                  inputValue={formik.values.product_name}
                  error={isError}
                />
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: Mixins.WINDOW_WIDTH,
                  paddingHorizontal: 16,
                  zIndex: 9999,
                }}>
                <CustomDropDown
                  options={categories}
                  formik={formik}
                  field={formik.getFieldProps('category_id')}
                  value={formik.values.category_id}
                  style={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    height: Mixins.scaleSize(45),
                    borderColor: 'lightgrey',
                  }}
                  dropContStyle={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    borderColor: 'lightgrey',
                  }}
                  filterCall={filterSubCategory}
                  onSelect={() => formik.setFieldTouched('category_id')}
                  label={'Select a category'}
                  formikError={formik.errors.category_id}
                  error={isError}
                />
                <Spacer width={Mixins.scaleSize(20)} />
                <CustomDropDown
                  options={subFilterCategories}
                  formik={formik}
                  filterCall={() => {}}
                  field={formik.getFieldProps('subcategories')}
                  value={formik.values.subcategories}
                  style={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    height: Mixins.scaleSize(45),
                    borderColor: 'lightgrey',
                  }}
                  dropContStyle={{
                    width: Mixins.WINDOW_WIDTH / 2.3,
                    borderColor: 'lightgrey',
                  }}
                  onSelect={() => formik.setFieldTouched('subcategories')}
                  label={'Select sub-categories'}
                  formikError={formik.errors.subcategories}
                  error={isError}
                />
              </View>
              <Spacer height={Mixins.scaleSize(20)} />
              <View
                style={{
                  width: Mixins.WINDOW_WIDTH,
                  paddingHorizontal: 16,
                }}>
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Suggest a Category'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.suggested_category}
                  onChangeText={formik.handleChange('suggested_category')}
                  inputValue={formik.values.suggested_category}
                  error={isError}
                />
              </View>

              <Spacer height={Mixins.scaleSize(20)} />
              <View
                style={{
                  width: Mixins.WINDOW_WIDTH,
                  paddingHorizontal: 16,
                }}>
                <InputTextComponent
                  capatalize={'none'}
                  placeholder={'Suggest a Sub-category'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.suggested_sub_category}
                  onChangeText={formik.handleChange('suggested_sub_category')}
                  inputValue={formik.values.suggested_sub_category}
                  error={isError}
                />
              </View>

              <Spacer height={Mixins.scaleSize(20)} />
              <InputTextComponent
                placeholder={'Product description'}
                labelColor={'#E5E5E6'}
                style={{justifyContent: 'flex-start', textAlign: 'top'}}
                containerHeight={Mixins.WINDOW_WIDTH * 0.2}
                backgroundColor={'transparent'}
                textInputColor={'#E5E5E6'}
                autoCorrect={false}
                multiline={true}
                formikError={formik.errors.product_description}
                onChangeText={formik.handleChange('product_description')}
                inputValue={formik.values.product_description}
                error={isError}
              />
              {user?.role_id == 3 ? (
                <>
                  <Spacer height={Mixins.scaleSize(20)} />
                  <View>
                    <RadioButtonGroup
                      options={[{label: 'Require Prescription', key: 'True'}]}
                      form={formik}
                      radioBtnStyles={{
                        flexDirection: 'row',
                        marginTop: 6,
                      }}
                      dropdownClose={() => dropdownClose}
                      width={{width: Mixins.WINDOW_WIDTH / 1.1}}
                      formikValue={'requires_prescription'}
                      value={formik?.values?.requires_prescription}
                    />
                  </View>
                </>
              ) : null}
              <Spacer height={Mixins.scaleSize(20)} />
              <ButtonComponent
                buttonTitle={'Add Product'}
                style={styles.createShopBtn}
                rippleColor={Colors.WHITE}
                titleColor={Colors.WHITE}
                onPress={() => {
                  setIsError(true);
                  formik.submitForm();
                }}
                loader={isLoader}
              />
              <Spacer height={Mixins.scaleSize(20)} />
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
  );
};

export default RegisterProductScreen;
