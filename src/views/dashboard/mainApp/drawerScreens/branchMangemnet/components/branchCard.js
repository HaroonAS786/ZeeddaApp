import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import OrderSummaryContext from '../../../home/components/orderSummaryContext';
import {DeleteSVGComponent} from '../../../../../../assets/svgs';
import RippleEffect from '../../../../../../components/rippleEffect';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BranchCard = ({item, setDeletePopUp, setDeleteId}) => {
  return (
    <View style={styles.mainWrap}>
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Branch ID:'}
        rightLabel={item?.id}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Branch Name:'}
        rightLabel={`${item.branch_name}`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Location:'}
        rightLabel={`${item.branch_location}`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Date'}
        rightLabel={'20 May 2023 - 26 May 2023'}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Branch Manager Name:'}
        rightLabel={`${item.manager_name}`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />
      <Spacer height={Mixins.scaleSize(12)} />
      <OrderSummaryContext
        leftLabel={'Branch Manager Email:'}
        rightLabel={`${item.manager_email}`}
        leftLabelStyle={{color: Colors.BLACK}}
        leftFontSize={'h6'}
        rightLabelStyle={{color: 'grey'}}
        rightFontSize={'h6'}
      />

      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.footerView}>
        <OrderSummaryContext
          leftLabel={'Branch Manager number:'}
          rightLabel={'654323424'}
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

export default BranchCard;

const styles = StyleSheet.create({
  mainWrap: {
    height:
      Platform.OS === 'ios' ? Mixins.scaleSize(240) : Mixins.scaleSize(270),
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
