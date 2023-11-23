import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LayoutContainer from '../../../../../components/layoutContainer';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import InputTextComponent from '../../../../../components/InputTextField';
import ButtonComponent from '../../../../../components/buttonComponent';
import {Formik} from 'formik';
import {createBranchValidation} from '../../../../../utils/helper';
import {useSelector} from 'react-redux';
import * as branchApi from '../../../../../../services/api/branch';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const CreateNewBranchManagementScreen = props => {
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(state => state?.auth?.user);

  const handleCreatedBranch = async branchObject => {
    try {
      setIsLoader(true);
      const {
        data: {success, error},
      } = await branchApi?.createBranch({branchObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Branch created',
          text2: 'Branch has been successfully created.',
          position: 'left',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: `${error}`,
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
  return (
    <LayoutContainer
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(20)} />
      <TextElement fontType={'h4'} textStyle={{color: Colors.BLACK}}>
        Branch Management
      </TextElement>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={{width: '100%', paddingHorizontal: 16}}>
        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          Create New Branch
        </TextElement>
        <Toast topOffset={60} config={toastConfig} />
        <Formik
          onSubmit={branchObject => handleCreatedBranch(branchObject)}
          initialValues={{
            branch_name: '',
            branch_location: '',
            manager_name: '',
            manager_email: '',
            manager_password: '',
            user_id: user?.id,
          }}
          validationSchema={createBranchValidation}>
          {formik => {
            return (
              <>
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Enter Branch Name '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.branch_name}
                  onChangeText={formik.handleChange('branch_name')}
                  inputValue={formik.values.branch_name}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Enter Branch Location'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.branch_location}
                  onChangeText={formik.handleChange('branch_location')}
                  inputValue={formik.values.branch_location}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Enter Branch Manager Name'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.manager_name}
                  onChangeText={formik.handleChange('manager_name')}
                  inputValue={formik.values.manager_name}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <InputTextComponent
                  placeholder={'Enter Branch Manager Email'}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.manager_email}
                  onChangeText={formik.handleChange('manager_email')}
                  inputValue={formik.values.manager_email}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />

                <InputTextComponent
                  placeholder={'Enter Branch Manager Password '}
                  labelColor={'#E5E5E6'}
                  containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                  backgroundColor={'transparent'}
                  textInputColor={'#E5E5E6'}
                  autoCorrect={false}
                  formikError={formik.errors.manager_password}
                  onChangeText={formik.handleChange('manager_password')}
                  inputValue={formik.values.manager_password}
                  error={isError}
                />
                <Spacer height={Mixins.scaleSize(20)} />
                <ButtonComponent
                  buttonTitle={'Create new branch'}
                  style={styles.newSupplierBtn}
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

        <Spacer height={Mixins.scaleSize(30)} />
      </View>
    </LayoutContainer>
  );
};

export default CreateNewBranchManagementScreen;

const styles = StyleSheet.create({
  newSupplierBtn: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },

  inputWrap: {
    flexDirection: 'row',
  },
});
