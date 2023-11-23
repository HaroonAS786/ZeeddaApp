import {View, RefreshControl, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spacer from '../../../../../components/Spacer';
import getStyles from './styles';
import {Colors, Mixins} from '../../../../../styles';
import HeaderLogoComponent from '../../../../../assets/svgs/HeaderLogo';
import HamBurgerSVGComponent from '../../../../../assets/svgs/hamBurgerSvg';
import {TextElement} from '../../../../../components/TextElement';
import PaymentCardItem from '../components/paymentCardItem';
import {BackArrow} from '../../../../../assets/svgs';
import RippleEffect from '../../../../../components/rippleEffect';
import {useSelector} from 'react-redux';
import * as paymentApi from '../../../../../../services/api/payment';
import SkeletonLoader from '../../../../../components/Loader';
import SearchAnimated from '../../home/homeSearchViewAnimated';

const PaymentScreen = props => {
  const styles = getStyles();
  const {openFromDrawer} = props?.route?.params ?? {};
  const user = useSelector(state => state?.auth?.user);
  const [paymentList, setPaymentList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    try {
      setLoader(true);
      const paymentObject = {
        user_id: user?.id,
      };
      const {
        data: {payments},
        data: {success},
      } = await paymentApi?.getPaymentListing({paymentObject});

      if (success) {
        setPaymentList(payments);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setLoader(false);
      setRefreshing(false);
      console.log('error', error);
    }
  };

  const Search = async () => {
    try {
      setSearchLoader(true);
      const paymentObject = {
        user_id: user?.id,
        payment_id: searchValue,
      };
      const {
        data: {payments},
        data: {success},
      } = await paymentApi?.getPaymentListing({paymentObject});
      if (success) {
        setSearchList(payments);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPayments();
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[{}]}
      numColumns={1}
      renderItem={({}) => (
        <View style={styles.mainTop}>
          <View style={styles.mainWrap}>
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(50)} />
            ) : (
              <Spacer height={Mixins.scaleSize(42)} />
            )}
            <View style={styles.header}>
              {openFromDrawer ? (
                <RippleEffect onPress={() => props?.navigation?.openDrawer()}>
                  <HamBurgerSVGComponent />
                </RippleEffect>
              ) : (
                <RippleEffect onPress={() => props?.navigation?.goBack()}>
                  <BackArrow
                    width={Mixins.scaleSize(22)}
                    height={Mixins.scaleSize(18)}
                    color={Colors.WHITE}
                  />
                </RippleEffect>
              )}

              <HeaderLogoComponent
                width={Mixins.scaleSize(190)}
                height={Mixins.scaleSize(58)}
              />
              <Spacer />
              <Spacer />
            </View>
            <View style={styles.headerBody}>
              <TextElement fontType={'h4'} textStyle={styles.paymentLabel}>
                Payment
              </TextElement>
              <Spacer height={Mixins.scaleSize(20)} />
            </View>
          </View>
          <SearchAnimated
            setSearchValue={setSearchValue}
            onPress={Search}
            loader={searchLoader}
            setFilterApply={setFilterApply}
            placeholder={'Search By Payment ID'}
          />
          <View style={styles.footerView}>
            <Spacer height={Mixins.scaleSize(30)} />
            <TextElement fontType={'h4'} textStyle={{color: Colors.BLACK}}>
              Payments
            </TextElement>
            <Spacer height={Mixins.scaleSize(12)} />

            {loader ? (
              <SkeletonLoader />
            ) : filterApply && searchValue ? (
              searchList?.length == 0 ? (
                <EmptyList Message={'No Payment Found'} />
              ) : (
                <FlatList
                  data={searchList}
                  renderItem={({item, index}) => (
                    <PaymentCardItem item={item} index={index} />
                  )}
                />
              )
            ) : paymentList?.length == 0 ? (
              <EmptyList Message={'No Payment List Found'} />
            ) : (
              <FlatList
                data={paymentList}
                renderItem={({item, index}) => (
                  <PaymentCardItem item={item} index={index} />
                )}
              />
            )}
          </View>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PaymentScreen;
