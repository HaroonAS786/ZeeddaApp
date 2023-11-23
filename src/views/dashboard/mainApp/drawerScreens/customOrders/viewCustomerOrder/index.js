import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from '../../../../../../components/buttonComponent';
import FadeModal from '../../../../../../components/fadeModal';
import LayoutContainer from '../../../../../../components/layoutContainer';
import RadioButtonGroup from '../../../../../../components/radioButton';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';
import OrderIDCard from '../../../myOrders/components/orderIdCard';
import SummaryContext from '../../../myOrders/components/summaryContext';
import DropDownBtn from '../../../../../../components/dropDownBtn';
import {Formik} from 'formik';
import {changeStatus} from '../../../../../../utils/helper';
import {useSelector} from 'react-redux';
import {changeOrderStatus} from '../../../../../../../services/api/order';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../../components/Toaster/ToastConfig';

const ViewCustomerOrders = props => {
  const {item} = props.route.params;
  const user = useSelector(state => state?.auth?.user);
  const refOrderStatusType = useRef(null);
  const [isError, setIsError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const handleSelectOption = () => {
    refOrderStatusType.current.close();
  };

  const ChangeStatus = async values => {
    try {
      setLoader(true);
      const ChangeStatusObject = {
        ...values,
        order_status: values?.order_status?.key,
      };
      const {
        data: {success},
      } = await changeOrderStatus({ChangeStatusObject});
      if (success) {
        setUpdateStatus(values?.order_status?.key);
        Toast.show({
          type: 'success',
          text1: 'Status Change',
          text2: 'Order status has been change.',
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
      setLoader(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again.',
        position: 'left',
        visibilityTime: 4000,
      });
      setLoader(false);
    }
  };

  const StatusColor =
    item?.status == 'In Progress'
      ? 'orange'
      : item?.status == 'Ready for Shipment'
      ? Colors.YELLOW_PRIMARY
      : item?.status == 'Shipped'
      ? '#468499'
      : item?.status == 'Delivered'
      ? '#34A853'
      : Colors.PRIMARY;

  return (
    <LayoutContainer
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(40)} />

      <View
        style={{
          justifyContent: 'flex-start',
          width: '100%',
          paddingHorizontal: 16,
        }}>
        <TextElement fontType={'h4'} textStyle={{color: 'grey'}}>
          Order ID #{item?.id}
        </TextElement>

        <OrderIDCard item={item} />
        <Spacer height={Mixins.scaleSize(30)} />
        <Toast topOffset={60} config={toastConfig} />
        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          Order Details
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <View>
          <SummaryContext
            leftLabel={'Payment mode'}
            rightLabel={'Online Payment'}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Customer ID'}
            rightLabel={item?.buyer_id}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.YELLOW_PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Quantity'}
            rightLabel={item?.product_quantity}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Current status'}
            rightLabel={updateStatus ? updateStatus : item?.status}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: StatusColor}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Product Id'}
            rightLabel={item?.product_id}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Shipping method'}
            rightLabel={item?.shipping_method}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Shipping Address'}
            rightLabel={item?.shipping_address}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{
              color: Colors.PRIMARY,
              width: 170,
              textAlign: 'right',
            }}
            rightFontSize={'h6'}
          />
        </View>
        <Spacer height={Mixins.scaleSize(30)} />

        <Formik
          onSubmit={values => ChangeStatus(values)}
          initialValues={{
            order_status: {key: `${item?.status}`, label: `${item?.status}`},
            user_id: user?.id,
            order_id: item?.id,
          }}
          enableReinitialize={true}
          validationSchema={changeStatus}>
          {formik => {
            return (
              <>
                <DropDownBtn
                  placeholder={'Change Status'}
                  value={formik?.values?.order_status}
                  onPress={() => {
                    refOrderStatusType.current.open();
                  }}
                />
                {formik.errors.order_status && isError && (
                  <View style={styles.errorlabelContainer}>
                    <Text style={styles.errorLabel}>
                      {formik.errors.order_status}
                    </Text>
                  </View>
                )}

                <FadeModal
                  refRBSheet={refOrderStatusType}
                  setIsVisible={() => {
                    refOrderStatusType.current.close();
                  }}
                  height={Mixins.WINDOW_HEIGHT * 0.3}>
                  <View style={{width: Mixins.WINDOW_WIDTH / 1.1}}>
                    <View>
                      <View style={styles.customerLabel}>
                        <TextElement fontType={'h6'}>Order Status</TextElement>
                      </View>

                      <RadioButtonGroup
                        options={[
                          {key: 'Accepted', label: 'Accepted'},
                          {key: 'In Progress', label: 'In Progress'},
                          {
                            key: 'Ready for Shipment',
                            label: 'Ready for Shipment',
                          },
                          {key: 'Shipped', label: 'Shipped'},
                          {key: 'Delivered', label: 'Delivered'},
                        ]}
                        radioContainer={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                        buttonStyle={{marginVertical: 5}}
                        radioBtnStyles={{marginTop: 20}}
                        dropdownClose={handleSelectOption}
                        form={formik}
                        formikValue={'order_status'}
                        value={formik?.values?.order_status}
                      />
                    </View>
                  </View>
                </FadeModal>

                <Spacer height={Mixins.scaleSize(20)} />
                <View style={styles.btnWrap}>
                  <ButtonComponent
                    buttonTitle={'Update Status'}
                    style={styles.accept}
                    titleColor={Colors.WHITE}
                    loader={loader}
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
        <Spacer height={Mixins.scaleSize(40)} />
      </View>
    </LayoutContainer>
  );
};

export default ViewCustomerOrders;

const styles = StyleSheet.create({
  accept: {
    width: Mixins.WINDOW_WIDTH / 1.1,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
  },
  reject: {
    width: Mixins.WINDOW_WIDTH / 2.5,
    borderColor: Colors.YELLOW_PRIMARY,
    backgroundColor: Colors.WHITE,
  },

  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customerLabel: {
    backgroundColor: 'background: rgba(217, 217, 217, 1)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    width: Mixins.WINDOW_WIDTH / 1.1,
    height: Mixins.scaleSize(35),
    marginBottom: 10,
  },
});
