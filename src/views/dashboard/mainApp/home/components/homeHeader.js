import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Mixins} from '../../../../../styles';
import HamBurgerSVGComponent from '../../../../../assets/svgs/hamBurgerSvg';
import HeaderLogoComponent from '../../../../../assets/svgs/HeaderLogo';
import {AccountSvg} from '../../../../../assets/svgs';
import ShoppingCartSVGComponent from '../../../../../assets/svgs/shoppingCartSvg';
import Spacer from '../../../../../components/Spacer';
import RippleEffect from '../../../../../components/rippleEffect';
import {useSelector} from 'react-redux';
import Colors from '../../../../../components/Toaster/Colors';

const HomeHeader = props => {
  const checkoutItem = useSelector(state => state?.auth?.item);

  console.log(checkoutItem?.length);
  return (
    <View style={styles.mainWrapCon}>
      <RippleEffect onPress={props.onPress}>
        <HamBurgerSVGComponent />
      </RippleEffect>
      <HeaderLogoComponent
        width={Mixins.scaleSize(190)}
        height={Mixins.scaleSize(58)}
      />
      <View style={styles.accShopCartWrapCon}>
        <RippleEffect onPress={props.profilePress}>
          <AccountSvg />
        </RippleEffect>

        <Spacer width={Mixins.scaleSize(10)} />
        <RippleEffect onPress={props.cartOnPress}>
          <ShoppingCartSVGComponent />
          <Text
            style={{
              fontSize: 15,
              color: '#4C7EA8',
              backgroundColor: '#fff',
              width: 20,
              height: 20,
              borderRadius: 50,
              textAlign: 'center',
              marginTop: -10,
              marginLeft: 10,
            }}>
            {checkoutItem?.length}
          </Text>
        </RippleEffect>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  mainWrapCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  accShopCartWrapCon: {
    flexDirection: 'row',
  },
});
