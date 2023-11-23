import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../../../../styles';
import RippleEffect from '../../../../../components/rippleEffect';
import HeaderLogoComponent from '../../../../../assets/svgs/HeaderLogo';
import Spacer from '../../../../../components/Spacer';
import {BackArrow} from '../../../../../assets/svgs';

const CartHeader = props => {
  return (
    <View style={styles.header}>
      <RippleEffect onPress={props.onPress}>
        <BackArrow width={22} height={18} color={Colors.WHITE} />
      </RippleEffect>
      <HeaderLogoComponent width={236} height={60} />
      <Spacer />
      <Spacer />
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});
