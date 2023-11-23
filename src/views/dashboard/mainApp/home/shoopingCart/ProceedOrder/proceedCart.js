import React, {useState} from 'react';
import {Image, View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  AddSVGComponent,
  DeleteSVGComponent,
  ReduceSVGComponent,
} from '../../../../../../assets/svgs';
import RippleEffect from '../../../../../../components/rippleEffect';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';
import {Swipeable} from 'react-native-gesture-handler';
import {addToCartItem} from '../../../../../../../services/api/order';
import {useSelector, useDispatch} from 'react-redux';
import {authActions} from '../../../../../../redux/actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProceedOrderCard = ({item, amount, productIndex, checkoutItem}) => {
  const [quantity, setQuantity] = useState(item?.purchaseQuantity);
  const user = useSelector(state => state?.auth?.user);
  const dispatch = useDispatch();

  const handleAdd = async () => {
    setQuantity(quantity + 1);
    let addToCart = {
      quantity: quantity + 1,
      product_id: item?.id,
      user_id: user?.id,
    };
    const response = await addToCartItem({addToCart});
    if (response?.data?.success) {
      const changeQuantity = checkoutItem?.filter(
        (element, index) => index == productIndex,
      );
      const remaining = checkoutItem?.filter(
        (element, index) => index != productIndex,
      );
      console.log(changeQuantity);
      const changeCheckoutItem = {
        ...changeQuantity?.[0],
        purchaseQuantity: quantity + 1,
      };
      dispatch(authActions.CartAmount(0));
      await dispatch(authActions.CartItem([...remaining, changeCheckoutItem]));
      const remainingItem = [...remaining, changeCheckoutItem];
      await AsyncStorage.setItem('CheckoutItem', JSON.stringify(remainingItem));
    }
  };

  const handleMinus = async () => {
    setQuantity(quantity - 1);
    let addToCart = {
      quantity: quantity - 1,
      product_id: item?.id,
      user_id: user?.id,
    };
    const response = await addToCartItem({addToCart});
    if (response?.data?.success) {
      const changeQuantity = checkoutItem?.filter(
        (element, index) => index == productIndex,
      );
      const remaining = checkoutItem?.filter(
        (element, index) => index != productIndex,
      );
      const changeCheckoutItem = {
        ...changeQuantity?.[0],
        purchaseQuantity: quantity - 1,
      };
      dispatch(authActions.CartAmount(0));
      console.log(remaining, changeCheckoutItem);
      await dispatch(authActions.CartItem([...remaining, changeCheckoutItem]));
      const remainingItem = [...remaining, changeCheckoutItem];
      await AsyncStorage.setItem('CheckoutItem', JSON.stringify(remainingItem));
    }
  };

  const handleDeleteItem = async () => {
    try {
      const remaining = checkoutItem?.filter(
        (element, index) => index != productIndex,
      );
      dispatch(authActions.CartAmount(0));
      dispatch(authActions.CartItem(remaining));
      const remainingItem = [...remaining];
      await AsyncStorage.setItem('CheckoutItem', JSON.stringify(remainingItem));
    } catch (error) {}
  };
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 20, 100, 101],
      outputRange: [0, 0, 0, 1],
    });
    return (
      <TouchableOpacity onPress={handleDeleteItem} style={styles.deleteButton}>
        <DeleteSVGComponent />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.mainWrap}>
        <View style={styles.contentCont}>
          <Image
            style={styles.image}
            resizeMode={'cover'}
            source={require('../../../../../../assets/images/orderImage.png')}
          />
          <Spacer width={Mixins.scaleSize(8)} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <TextElement fontType={'h6'} textStyle={styles.title}>
                {item.product_name}
              </TextElement>
              <Spacer height={Mixins.scaleSize(25)} />
            </View>
            <Spacer height={Mixins.scaleSize(4)} />
            <TextElement fontType={'h8'} textStyle={styles.amount}>
              ₦ {item.product_price}
            </TextElement>

            <Spacer height={Mixins.scaleSize(4)} />
            <View style={styles.footerView}>
              <TextElement fontType={'h8'} textStyle={styles.desc}>
                {item?.product_description}
              </TextElement>
              <Spacer width={Mixins.scaleSize(50)} />
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                {quantity > 0 ? (
                  <RippleEffect style={styles.circle} onPress={handleMinus}>
                    <ReduceSVGComponent />
                  </RippleEffect>
                ) : null}
                <Spacer width={Mixins.scaleSize(8)} />
                <TextElement fontType={'h9'} textStyle={{color: Colors.BLACK}}>
                  {quantity}
                </TextElement>
                <Spacer width={Mixins.scaleSize(8)} />
                {item?.quantity > quantity ? (
                  <RippleEffect style={styles.circle} onPress={handleAdd}>
                    <AddSVGComponent />
                  </RippleEffect>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default ProceedOrderCard;

const styles = StyleSheet.create({
  mainWrap: {
    backgroundColor: Colors.WHITE,

    width: '100%',
    height: Mixins.scaleSize(100),
    paddingVertical: 16,
    justifyContent: 'center',
    marginTop: 14,
  },

  deleteButton: {
    color: 'white',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: 120,
  },
  circle: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    alignItems: 'center',

    justifyContent: 'center',
  },

  quantityLabel: {
    color: 'black',
    fontWeight: '400',
  },

  label: {
    color: 'lightgrey',
    fontWeight: '400',
  },
  trackLabel: {
    color: 'white',
    fontWeight: '400',
  },
  title: {
    color: Colors.BLACK,
    fontWeight: '400',
    width: '65%',
  },
  desc: {
    color: 'grey',
    fontWeight: '400',
  },
  amount: {
    color: Colors.PRIMARY,
    fontWeight: '400',
  },
  topHeader: {
    flexDirection: 'row',

    paddingTop: 6,
    justifyContent: 'space-between',
  },

  viewOrder: {
    width: Mixins.scaleSize(68),
    height: Mixins.scaleSize(22),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
  },
  image: {
    width: Mixins.scaleSize(92),
    height: Mixins.scaleSize(84),
    borderRadius: 5,
  },

  contentCont: {
    flexDirection: 'row',
    height: '100%',
    padding: 0,
    alignItems: 'center',
  },

  leftView: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '77%',
  },
});
