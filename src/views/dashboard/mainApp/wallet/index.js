import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform, View, RefreshControl, FlatList} from 'react-native';
import HamBurgerSVGComponent from '../../../../assets/svgs/hamBurgerSvg';
import HeaderLogoComponent from '../../../../assets/svgs/HeaderLogo';
import RippleEffect from '../../../../components/rippleEffect';
import Spacer from '../../../../components/Spacer';
import {TextElement} from '../../../../components/TextElement';
import {Colors, Mixins} from '../../../../styles';
// import {walletData} from '../../../../utils/helper';
import HistoryCardItem from './components/historyCardItem';
import getStyles from './styles';
import * as walletApi from '../../../../../services/api/wallet';
import {useSelector} from 'react-redux';
import {SendSVGComponent, WithDrawSVGComponent} from '../../../../assets/svgs';
import SkeletonLoader from '../../../../components/Loader';
import EmptyList from '../../../../components/empty-list';

const WalletScreen = props => {
  const styles = getStyles();
  const position = useRef(new Animated.Value(0)).current;
  const user = useSelector(state => state?.auth?.user);
  const [wallet, setWallet] = useState();
  const [walletLoader, setWalletLoader] = useState(true);
  useEffect(() => {
    getWallet();
    const animateView = () => {
      Animated.timing(position, {
        toValue: 1, // Final value for animation (1 represents 100%)
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true, // Enable native driver for better performance
      }).start(); // Start the animation
    };

    if (position) {
      animateView();
    }

    return () => {
      // Your cleanup code here (if necessary)
    };
  }, [position]);

  const translateY = position.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0], // Translate the view from -200 (above the screen) to 0 (normal position)
  });

  const getWallet = async () => {
    try {
      const walletObject = {
        user_id: user?.id,
      };
      const response = await walletApi?.getWalletAmount({walletObject});
      setWallet(response);
      setWalletLoader(false);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      setWalletLoader(false);
    }
  };

  const walletData = [
    {
      key: 1,
      svg: <SendSVGComponent />,
      navScreen: 'SendCashScreen',
      label: 'Send',
      active: true,
    },
    {
      key: 2,
      svg: <WithDrawSVGComponent />,
      navScreen: '',
      label: 'Withdraw',
      active: user?.role_id == 2 ? false : true,
    },
  ];

  const [activeTab, setActiveTab] = useState(1);
  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getWallet();
  }, []);

  const balance = wallet?.data?.current_balance?.[0]?.current_balance
    ? wallet?.data?.current_balance?.[0]?.current_balance
    : 0;
  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={[{}]}
        numColumns={1}
        renderItem={({}) => (
          <View style={styles.mainTop}>
            <Animated.View
              style={[styles.headerWrapContainer, {transform: [{translateY}]}]}>
              {Platform.OS === 'ios' ? (
                <Spacer height={Mixins.scaleSize(50)} />
              ) : (
                <Spacer height={Mixins.scaleSize(45)} />
              )}
              <View style={styles.header}>
                <RippleEffect onPress={() => props?.navigation?.openDrawer()}>
                  <HamBurgerSVGComponent />
                </RippleEffect>
                <HeaderLogoComponent
                  width={Mixins.scaleSize(190)}
                  height={Mixins.scaleSize(58)}
                />
                <Spacer />
                <Spacer />
              </View>
              <View style={styles.headerBody}>
                <Spacer height={Mixins.scaleSize(8)} />
                <TextElement fontType={'h5'} textStyle={styles.walletLabel}>
                  Wallet
                </TextElement>
                <Spacer height={Mixins.scaleSize(20)} />
                <TextElement fontType={'h8'} textStyle={styles.availBalance}>
                  Available Balance
                </TextElement>
                <Spacer height={Mixins.scaleSize(20)} />
                <TextElement fontType={'h2'} textStyle={styles.amountLabel}>
                  ₦{' '}
                  {wallet?.data?.current_balance?.[0]?.current_balance
                    ? wallet?.data?.current_balance?.[0]?.current_balance
                    : 0}
                </TextElement>
              </View>
              <Spacer height={Mixins.scaleSize(45)} />
              <View style={styles.walletWrap}>
                {walletData.map((val, index) =>
                  !val?.active ? null : (
                    <View style={styles.walletCircleView}>
                      <RippleEffect
                        key={val.key}
                        style={styles.walletFooterBtn}
                        onPress={() =>
                          props?.navigation?.navigate(`${val.navScreen}`, {
                            item: balance,
                          })
                        }>
                        {val.svg}
                      </RippleEffect>
                      <Spacer height={Mixins.scaleSize(6)} />
                      <TextElement
                        fontType={'h8'}
                        textStyle={styles.availBalance}>
                        {val.label}
                      </TextElement>
                    </View>
                  ),
                )}
              </View>
            </Animated.View>
            <Spacer height={Mixins.scaleSize(20)} />
            <View style={styles.footerView}>
              <Spacer height={Mixins.scaleSize(20)} />
              <TextElement fontType={'h4'} textStyle={{color: Colors.BLACK}}>
                Transactions
              </TextElement>
              <Spacer height={Mixins.scaleSize(12)} />

              <View style={styles.container}>
                <RippleEffect onPress={() => handleTabPress(1)}>
                  <TextElement
                    fontType={'h6'}
                    textStyle={
                      activeTab === 1
                        ? styles.activeLabel
                        : styles.inActiveLabel
                    }>
                    Credits
                  </TextElement>
                  <Spacer height={Mixins.scaleSize(6)} />
                  {activeTab === 1 ? (
                    <View style={styles.viewLine} />
                  ) : (
                    <Spacer />
                  )}
                </RippleEffect>
                <RippleEffect onPress={() => handleTabPress(2)}>
                  <TextElement
                    fontType={'h6'}
                    textStyle={
                      activeTab === 2
                        ? styles.activeLabel
                        : styles.inActiveLabel
                    }>
                    Debits
                  </TextElement>
                  <Spacer height={Mixins.scaleSize(6)} />
                  {activeTab === 2 ? (
                    <View style={styles.viewLine} />
                  ) : (
                    <Spacer />
                  )}
                </RippleEffect>
              </View>

              <View style={styles.tabContent}>
                {activeTab === 1 &&
                  (walletLoader ? (
                    <SkeletonLoader />
                  ) : wallet?.data?.credits?.length == 0 ? (
                    <EmptyList Message={'No Credits Found'} />
                  ) : (
                    <FlatList
                      data={wallet?.data?.credits}
                      renderItem={({item, index}) => (
                        <HistoryCardItem item={item} />
                      )}
                    />
                  ))}
                {activeTab === 2 &&
                  (walletLoader ? (
                    <SkeletonLoader />
                  ) : wallet?.data?.debits?.length == 0 ? (
                    <EmptyList Message={'No Debits Found'} />
                  ) : (
                    <FlatList
                      data={wallet?.data?.debits}
                      renderItem={({item, index}) => (
                        <HistoryCardItem item={item} />
                      )}
                    />
                  ))}
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default WalletScreen;
