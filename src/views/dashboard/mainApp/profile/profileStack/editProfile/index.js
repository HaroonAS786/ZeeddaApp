import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  CameraSVGComponent,
  ImageCameraSvg,
  GallerySVGComponent,
} from '../../../../../../assets/svgs';
import ButtonComponent from '../../../../../../components/buttonComponent';
import LayoutContainer from '../../../../../../components/layoutContainer';
import Spacer from '../../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../../styles';
import ProfileTextInput from '../../components/profileTextInput';
import getStyles from './styles';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../../../../../../components/Toaster/ToastConfig';
import * as profileApi from '../../../../../../../services/api/profile';
import {TextElement} from '../../../../../../components/TextElement';
import FadeModal from '../../../../../../components/fadeModal';
import {useRef} from 'react';
import RippleEffect from '../../../../../../components/rippleEffect';
import {
  RequestCameraPermission,
  RequestExternalWritePermission,
} from '../../../../../../utils/helper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IMAGES} from '../../../../../../utils/asset';

const EditProfileScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userImage, setImageSource] = useState('');

  const handleUpdateProfile = async values => {
    try {
      setIsLoader(true);
      let profileObject;
      if (userImage?.uri) {
        profileObject = {...values, profile_picture: userImage?.uri};
      } else {
        profileObject = values;
      }
      const {
        data: {success},
      } = await profileApi?.updateProfile({profileObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Profile updated',
          text2: 'Profile has been successfully edit.',
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
      setIsLoader(false);
    }
  };
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';

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

  const refImageSelectionType = useRef();

  return (
    <LayoutContainer
      header2
      header
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={{alignSelf: 'center'}}>
        <View style={styles.mainWrap}>
          <TextElement fontType={'h5'} textStyle={styles.editLabel}>
            Edit Profile
          </TextElement>
          <Spacer height={Mixins.scaleSize(10)} />
          <Image
            source={
              userImage ? userImage : {uri: baseUrl + user?.profile_picture}
            }
            style={styles.image}
            borderRadius={100}
          />
          {userImage ? (
            <TouchableOpacity
              style={styles.cameraStyle}
              onPress={() => setImageSource('')}>
              <Image source={IMAGES?.cross} style={{width: 35, height: 35}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.cameraStyle}
              onPress={() => refImageSelectionType.current.open()}>
              <CameraSVGComponent />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Spacer height={Mixins.scaleSize(50)} />
      <Toast topOffset={60} config={toastConfig} />
      <Formik
        onSubmit={values => handleUpdateProfile(values)}
        enableReinitialize={true}
        initialValues={{
          email: user?.email ? user?.email : '',
          first_name: user?.first_name ? user?.first_name : '',
          last_name: user?.last_name ? user?.last_name : '',
          profile_picture: user?.profile_picture ? user?.profile_picture : '',
          city: user?.city ? user?.city : '',
          address: user?.address ? user?.address : '',
          phone_number: user?.phone_number ? user?.phone_number : '',
          user_id: user?.id,
        }}>
        {formik => {
          return (
            <>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <ProfileTextInput
                    label={'First Name'}
                    placeholder="First name"
                    placeholderTextColor={'#A7A9B7'}
                    formikError={formik.errors.first_name}
                    onChangeText={formik.handleChange('first_name')}
                    inputValue={formik.values.first_name}
                    error={isError}
                    containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                  />

                  <ProfileTextInput
                    label={'Last Name'}
                    placeholder="Last name"
                    containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                    placeholderTextColor={'#A7A9B7'}
                    formikError={formik.errors.last_name}
                    onChangeText={formik.handleChange('last_name')}
                    inputValue={formik.values.last_name}
                    error={isError}
                  />
                </View>
                <Spacer height={Mixins.scaleSize(12)} />
                <ProfileTextInput
                  label={'Email Address'}
                  placeholder="Email"
                  formikError={formik.errors.email}
                  onChangeText={formik.handleChange('email')}
                  inputValue={formik.values.email}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(12)} />
                <ProfileTextInput
                  label={'City'}
                  placeholder="City"
                  formikError={formik.errors.city}
                  onChangeText={formik.handleChange('city')}
                  inputValue={formik.values.city}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(12)} />
                <ProfileTextInput
                  label={'Address'}
                  placeholder="Address"
                  formikError={formik.errors.address}
                  onChangeText={formik.handleChange('address')}
                  inputValue={formik.values.address}
                  error={isError}
                />
                <ProfileTextInput
                  label={'Phone Number'}
                  placeholder="Phone Number"
                  formikError={formik.errors.phone_number}
                  onChangeText={formik.handleChange('phone_number')}
                  inputValue={formik.values.phone_number}
                  error={isError}
                  keyboardType="numeric"
                />
              </View>
              <Spacer height={Mixins.scaleSize(25)} />
              <ButtonComponent
                buttonTitle={'Update Profile'}
                style={styles.updateBtn}
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

export default EditProfileScreen;
