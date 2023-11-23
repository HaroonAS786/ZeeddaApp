import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import {DeleteSVGComponent} from '../../../../../../assets/svgs';
import Spacer from '../../../../../../components/Spacer';
import OrderSummaryContext from '../../../home/components/orderSummaryContext';
import RippleEffect from '../../../../../../components/rippleEffect';
import moment from 'moment';
import {baseURL} from '../../../../../../utils/asset';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AdminProfileViewCard = ({item, setDeletePopUp, setDeleteId}) => {
  return (
    <View style={styles.mainWrap}>
      <Spacer height={Mixins.scaleSize(12)} />
      <View>
        <Image
          source={{uri: baseURL + item?.profile_picture}}
          resizeMode={'cover'}
          style={styles.imageCon}
        />
      </View>
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'ID:'}
        rightLabel={item.id}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Admin Name:'}
        rightLabel={`${item.name} ${
          item?.father_name ? item?.father_name : ''
        }`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Email:'}
        rightLabel={item.email}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: Colors.PRIMARY}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Created At:'}
        rightLabel={moment(item.created_at).format('DD MMM, YYYY')}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.footerView}>
        <Spacer />
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
      <Spacer height={Mixins.scaleSize(18)} />
    </View>
  );
};

export default AdminProfileViewCard;

const styles = StyleSheet.create({
  mainWrap: {
    // height: Mixins.scaleSize(1),
    borderRadius: 10,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 15,
    paddingHorizontal: 16,
  },

  discountTextLabel: {
    fontSize: 7,
    position: 'absolute',
    top: Platform.OS == 'android' ? 1 : 2,
    left: 2,
    fontWeight: Platform.OS == 'android' ? '800' : '400',
  },

  imageCon: {
    width: 65,
    height: 65,
    borderRadius: 100,
    alignSelf: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: 'lightgrey',
  },

  currencyViewCon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
  },
  currencyLabel: {
    fontSize: 12,
    color: 'grey',
  },

  itemLabel: {
    fontSize: 14,
    color: Colors.BLACK,
    fontWeight: '500',
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
