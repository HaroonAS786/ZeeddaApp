import React, {useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import HeaderLogoComponent from './assets/svgs/HeaderLogo';
import RippleEffect from './components/rippleEffect';
import Spacer from './components/Spacer';
import {TextElement} from './components/TextElement';
import {Colors, Mixins} from './styles';
import {IMAGES} from './utils/asset';
import {reach} from 'yup';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {authActions} from './redux/actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = props => {
  const user = useSelector(state => state?.auth?.user);
  const dispatch = useDispatch();

  const drawerItems = [
    {
      key: 1,
      label: user?.role_id == 2 ? 'Zeedda Dashboard' : 'My Dashboard',
      navScreen: 'DrawerStack',
      img: IMAGES.dashboard,
      active: true,
    },
    {
      key: 2,
      label: 'My Zeedda Orders',
      navScreen: 'MyOrderStackNavigator',
      drawerValue: true,
      img: IMAGES.myzeeddaOrder,
      active: true,
    },
    {
      key: 3,
      label: 'My Shop',
      navScreen: 'MyShopStack',
      img: IMAGES.myShop,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 4,
      label: user?.role_id == 4 ? 'Merchants Order' : 'Customer Orders',
      navScreen: 'CustomOrdersStack',
      img: IMAGES.customerOrder,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 5,
      label: 'Health Hub',
      navScreen: 'HealthHubStack',
      img: IMAGES.healthHub,
      active: true,
    },
    {
      key: 6,
      label: 'Trade HUB',
      navScreen: 'TradeHubStack',
      img: IMAGES.tradeHub,
      active: true,
    },
    {
      key: 7,
      label: 'B2B HUB',
      navScreen: 'B2BHubStack',
      img: IMAGES.b2bHub,
      active: true,
    },
    {
      key: 8,
      label: 'Register Product',
      navScreen: 'RegisteredProductStack',
      img: IMAGES.registerProduct,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 9,
      label: 'Manage Inventory',
      navScreen: 'ManageInventoryStack',
      img: IMAGES.manageInventory,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 10,
      label: 'Stock Transfer',
      navScreen: 'StockTransferStack',
      img: IMAGES.stockTransfer,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 11,
      label: 'Re-Order Management',
      navScreen: 'ReOrderManagementStack',
      img: IMAGES.reOrderMgt,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 12,
      label: 'Prescription Management',
      navScreen: 'PrescriptionManagementStack',
      img: IMAGES.prescriptionMgt,
      active:
        user?.role_id == 2 || user?.role_id == 4 || user?.role_id == 5
          ? false
          : true,
    },
    {
      key: 13,
      label: 'Payment',
      navScreen: 'PaymentStack',
      img: IMAGES.payments,
      active: true,
    },
    {
      key: 14,
      label: 'Commission',
      navScreen: 'CommissionStack',
      img: IMAGES.commission,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 15,
      label: user?.role_id == 2 ? 'Order Tracking' : 'Zeedda Tracking',
      navScreen: 'ZeeddaTrackingStack',
      img: IMAGES.orderTracking,
      active: true,
    },

    {
      key: 16,
      label: user?.role_id == 2 ? 'Wallet' : 'Zeedda Wallet',
      navScreen: 'ZeeddaWalletStackNavigator',
      img: IMAGES.wallet,
      active: true,
    },
    {
      key: 17,
      label: 'Delivery Confirmation',
      navScreen: 'ShoppingCartStack',
      img: IMAGES.deliveryConfirmation,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 18,
      label: 'Discount & Loyalty',
      navScreen: 'DiscountStack',
      img: IMAGES.discountAndLoyaltyMgt,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 19,
      label: 'Admin Management',
      navScreen: 'AdminStack',
      img: IMAGES.admin,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 20,
      label: 'Branch Management',
      navScreen: 'BranchManagementStack',
      img: IMAGES.branchMgt,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 21,
      label: 'Suppliers Management',
      navScreen: 'SupplierManagementStack',
      img: IMAGES.supplierMgt,
      active: user?.role_id == 2 ? false : true,
    },
    {
      key: 22,
      label: user?.role_id == 2 ? 'Support' : 'Zeedda Support',
      navScreen: 'SupportTicketStack',
      img: IMAGES.support,
      active: true,
    },
  ];

  const [isSelectedIndex, setIsSelectedIndex] = useState(0);

  const logout = async () => {
    await AsyncStorage.setItem('CheckoutItem', JSON.stringify([]));
    await dispatch(authActions.CartAmount(0));
    await dispatch(authActions.CallEffect(true));
    await dispatch(authActions.logout());
    props.navigation.navigate('loginScreen');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {Platform.OS === 'android' && <Spacer height={Mixins.scaleSize(35)} />}
      <HeaderLogoComponent />
      {Platform.OS === 'android' && <Spacer height={Mixins.scaleSize(18)} />}

      <ScrollView {...props} showsVerticalScrollIndicator={false}>
        {drawerItems.map((value, index) =>
          value?.active ? (
            <>
              <RippleEffect
                style={[
                  styles.itemView,
                  {
                    backgroundColor:
                      index === isSelectedIndex ? Colors.PRIMARY : Colors.WHITE,
                  },
                ]}
                onPress={() => {
                  setIsSelectedIndex(index);
                  reach;
                  props?.navigation?.navigate(`${value?.navScreen}`, {
                    fromDrawer: value?.drawerValue,
                    hubLabel: value?.label,
                  });
                  props.navigation.closeDrawer();
                }}>
                <Image
                  source={value.img}
                  resizeMode="contain"
                  style={{width: 24, height: 24}}
                />
                <Spacer width={Mixins.scaleSize(12)} />
                <TextElement
                  fontType={'h6'}
                  textStyle={[
                    styles.label,
                    {
                      color:
                        index === isSelectedIndex ? Colors.WHITE : Colors.BLACK,
                    },
                  ]}>
                  {value?.label}
                </TextElement>
              </RippleEffect>
            </>
          ) : null,
        )}
        <Spacer height={Mixins.scaleSize(12)} />
        <RippleEffect style={styles.itemView} onPress={logout}>
          <Image
            source={IMAGES.logout}
            resizeMode="contain"
            style={{width: 24, height: 24}}
          />
          <Spacer width={Mixins.scaleSize(12)} />
          <TextElement fontType={'h6'} textStyle={styles.label}>
            Logout
          </TextElement>
        </RippleEffect>
        <Spacer height={50} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemView: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 6,
    paddingLeft: 20,
    height: Mixins.scaleSize(35),
  },
  label: {
    color: Colors.BLACK,
    textAlign: 'center',
  },
});

export default CustomSidebarMenu;
