import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from '../../../../../components/buttonComponent';
import InputTextComponent from '../../../../../components/InputTextField';
import LayoutContainer from '../../../../../components/layoutContainer';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../styles';
import {Formik} from 'formik';
import {createSupportValidation} from '../../../../../utils/helper';
import {useSelector} from 'react-redux';
import * as supportTicketsApi from '../../../../../../services/api/support-ticket';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const NewSupportTicket = props => {
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(state => state?.auth?.user);
  const handleCreateSupport = async values => {
    try {
      setIsLoader(true);
      const createSupportTicket = values;
      const {
        data: {result, success},
      } = await supportTicketsApi?.createSupportTickets({createSupportTicket});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Support Ticket',
          text2: 'Support ticket has been created.',
          position: 'left',
          visibilityTime: 4000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again.',
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
    <>
      <LayoutContainer
        header
        header2
        noHeight
        backOnPress={() => props.navigation.goBack()}>
        <Spacer height={Mixins.scaleSize(20)} />
        <TextElement fontType={'h4'} textStyle={{color: Colors.BLACK}}>
          My Support
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <View style={{width: '100%', paddingHorizontal: 16}}>
          <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
            Create New Ticket
          </TextElement>
          <Toast topOffset={60} config={toastConfig} />
          <Formik
            onSubmit={values => handleCreateSupport(values)}
            initialValues={{
              ticket_title: '',
              ticket_desc: '',
              user_id: user?.id,
            }}
            validationSchema={createSupportValidation}>
            {formik => {
              return (
                <>
                  <Spacer height={Mixins.scaleSize(20)} />
                  <InputTextComponent
                    placeholder={'Ticket Subject'}
                    labelColor={'#E5E5E6'}
                    containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                    backgroundColor={'transparent'}
                    textInputColor={'#E5E5E6'}
                    autoCorrect={false}
                    formikError={formik.errors.ticket_title}
                    onChangeText={formik.handleChange('ticket_title')}
                    inputValue={formik.values.ticket_title}
                    error={isError}
                  />
                  <Spacer height={Mixins.scaleSize(20)} />
                  <InputTextComponent
                    placeholder={'Ticket Description'}
                    labelColor={'#E5E5E6'}
                    containerWidth={Mixins.WINDOW_WIDTH / 1.1}
                    containerHeight={Mixins.WINDOW_HEIGHT * 0.11}
                    style={{paddingTop: 20, fontSize: 16}}
                    backgroundColor={'transparent'}
                    textInputColor={'#E5E5E6'}
                    autoCorrect={false}
                    multiline={true}
                    formikError={formik.errors.ticket_desc}
                    onChangeText={formik.handleChange('ticket_desc')}
                    inputValue={formik.values.ticket_desc}
                    error={isError}
                  />
                  <Spacer height={Mixins.scaleSize(40)} />
                  <ButtonComponent
                    buttonTitle={'Create Ticket'}
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
    </>
  );
};

export default NewSupportTicket;

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
