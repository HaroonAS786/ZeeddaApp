import {View, Text, FlatList, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import getStyles from './styles';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';
import ProceedOrderCard from './proceedCart';
import ButtonComponent from '../../../../../../components/buttonComponent';
import {useSelector} from 'react-redux';
import ViewHeader from '../../../../../../components/viewHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {authActions} from '../../../../../../redux/actions/actions';

const ProceedOrderScreen = props => {
  const dispatch = useDispatch();
  const checkoutItem = useSelector(state => state?.auth?.item);
  const totalAmountCart = useSelector(state => state?.auth?.amount);
  const styles = getStyles();

  useEffect(() => {
    console.log('totalAmountCart', totalAmountCart);
    var totalAmount = totalAmountCart;
    for (let i = 0; i < checkoutItem?.length; ++i) {
      const total =
        checkoutItem[i]?.purchaseQuantity * checkoutItem[i]?.product_price;
      totalAmount = totalAmount + total;
    }
    dispatch(authActions.CartAmount(totalAmount));
  }, [checkoutItem]);

  const renderItem = ({item, index}) => (
    <ProceedOrderCard
      item={item}
      productIndex={index}
      checkoutItem={checkoutItem}
      amount={totalAmountCart}
    />
  );

  const renderSeparator = () => {
    return <View style={styles.divider} />;
  };
  return (
    <>
      <ViewHeader
        isHeaderView2
        label={'My Cart'}
        onPress={() => {
          props.navigation.openDrawer();
        }}
      />
      {checkoutItem?.length != 0 ? (
        <ScrollView>
          <View style={{width: '100%', backgroundColor: '#fff'}}>
            <Spacer height={Mixins.scaleSize(40)} />
            <View
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                paddingHorizontal: 16,
              }}>
              <TextElement fontType={'h6'} textStyle={{color: 'grey'}}>
                Cart({checkoutItem?.length})
              </TextElement>

              <FlatList
                data={checkoutItem}
                // keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={renderSeparator}
                renderItem={renderItem}
                contentContainerStyle={{paddingVertical: 16}}
              />
              <Spacer height={Mixins.scaleSize(30)} />
              <ButtonComponent
                buttonTitle={`Proceed (₦ ${totalAmountCart})`}
                style={styles.proceedBtn}
                rippleColor={Colors.WHITE}
                titleColor={Colors.WHITE}
                onPress={() => {
                  props.navigation.navigate('ShoppingCartScreen', {
                    item: totalAmountCart,
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text
          style={{
            color: '#000',
            width: '100%',
            textAlign: 'center',
            paddingTop: 20,
            fontSize: 15,
            color: 'red',
          }}>
          No Cart Item Available
        </Text>
      )}
    </>
  );
};

export default ProceedOrderScreen;
