import {View, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import OrderSummaryContext from '../../../home/components/orderSummaryContext';
import {DeleteSVGComponent} from '../../../../../../assets/svgs';
import RippleEffect from '../../../../../../components/rippleEffect';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SupplierManagementCard = ({item, setDeletePopUp, setDeleteId}) => {
  return (
    <View style={styles.mainWrap}>
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Supplier ID:'}
        rightLabel={item.id}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Name:'}
        rightLabel={item.company_name}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Address:'}
        rightLabel={item.company_address}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Contact Number'}
        rightLabel={item.company_phone}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Website'}
        rightLabel={item.company_website}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Contact Name:'}
        rightLabel={item.contact_phone}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Contact Phone:'}
        rightLabel={`${item.contact_firstname} ${item.contact_lastname}`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Contact Email:'}
        rightLabel={item.contact_email}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />

      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.footerView}>
        <OrderSummaryContext
          leftLabel={'Created At:'}
          rightLabel={moment(item?.created_at).format('DD MMM, YYYY')}
          leftLabelStyle={{color: Colors.BLACK}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: 'grey'}}
          rightFontSize={'h6'}
        />
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            setDeleteId(item.id);
            setDeletePopUp(true);
          }}>
          <RippleEffect style={styles.deleteView}>
            <DeleteSVGComponent width={24} height={22} />
          </RippleEffect>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SupplierManagementCard;

const styles = StyleSheet.create({
  mainWrap: {
    height:
      Platform.OS === 'ios' ? Mixins.scaleSize(270) : Mixins.scaleSize(320),
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  deleteView: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
