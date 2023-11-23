import React, {useState, useEffect} from 'react';
import {Platform, View, FlatList, RefreshControl} from 'react-native';
import RippleEffect from '../../../../components/rippleEffect';
import Spacer from '../../../../components/Spacer';
import {TextElement} from '../../../../components/TextElement';
import ViewHeader from '../../../../components/viewHeader';
import {Mixins} from '../../../../styles';
import History from './components/history';
import getStyles from './styles';
import SearchAnimated from '../home/homeSearchViewAnimated';
import * as orderApi from '../../../../../services/api/order';
import EmptyList from '../../../../components/empty-list';
import SkeletonLoader from '../../../../components/Loader';
import {useSelector} from 'react-redux';
import ShippingCard from './components/ShippingCard';

const MyOrdersScreen = props => {
  const styles = getStyles();
  const {fromDrawer} = props.route.params ?? {};
  const user = useSelector(state => state?.auth?.user);

  console.log('fromDrawer*', fromDrawer);

  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [orderLoader, setOrderLoader] = useState(true);
  const [shippingLoader, setShippingLoader] = useState(true);
  const [searchLoader, setSearchLoader] = useState(false);
  const [historyOrderList, setHistoryList] = useState([]);
  const [historyOrderLoader, setHistoryOrderLoader] = useState(true);
  const [activeTab, setActiveTab] = useState(2);
  const [shippingList, setShippingList] = useState([]);
  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    getShipping();
    getOrder();
    getCustomerOrder();
  }, []);

  const getShipping = async () => {
    try {
      const customerShippingObject = {
        user_id: user?.id,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getCustomerShippingListing({customerShippingObject});
      if (success) {
        setShippingList(orders);
        setShippingLoader(false);
      }
    } catch (error) {
      setShippingLoader(false);
      console.log('error', error);
    }
  };

  const getOrder = async () => {
    try {
      const orderObject = {
        user_id: user?.id,
        type: 1,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getOrderListing({orderObject});
      if (success) {
        setOrderList(orders);
        setOrderLoader(false);
      }
    } catch (error) {
      setOrderLoader(false);
      console.log('error', error);
    }
  };

  const getCustomerOrder = async () => {
    try {
      const orderObject = {
        user_id: user?.id,
        type: 2,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getOrderListing({orderObject});
      if (success) {
        setHistoryList(orders);
        setHistoryOrderLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setHistoryOrderLoader(false);
      setRefreshing(false);
      console.log('error', error);
    }
  };

  const Search = async () => {
    try {
      setSearchLoader(true);
      const orderObject = {
        user_id: user?.id,
        item_id: searchValue,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getOrderListing({orderObject});
      if (success) {
        setSearchList(orders);
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
    getShipping();
    getOrder();
    getCustomerOrder();
  }, []);

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
            <ViewHeader
              label={'My Zeedda Orders'}
              isHamburger={fromDrawer ? true : false}
              onPress={() => {
                {
                  fromDrawer
                    ? props.navigation.openDrawer()
                    : props.navigation.goBack();
                }
              }}
            />
            <SearchAnimated
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
              placeholder={'Search By Order ID'}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(35)} />
            )}
            <RippleEffect
              style={styles.addNewOrder}
              onPress={() => props.navigation.navigate('OrderHubsScreen')}>
              <TextElement fontType={'h8'} textStyle={styles.addNewOrderLabel}>
                Add New Order
              </TextElement>
            </RippleEffect>
            <Spacer height={Mixins.scaleSize(35)} />

            {filterApply && searchValue ? (
              searchList?.length == 0 ? (
                <EmptyList Message={'No Order Found'} />
              ) : (
                <History item={searchList} />
              )
            ) : (
              <>
                <View style={styles.container}>
                  <RippleEffect onPress={() => handleTabPress(2)}>
                    <TextElement
                      fontType={'h6'}
                      textStyle={
                        activeTab === 2
                          ? styles.activeLabel
                          : styles.inActiveLabel
                      }>
                      Shipment
                    </TextElement>
                    <Spacer height={Mixins.scaleSize(6)} />
                    {activeTab === 2 ? (
                      <View style={styles.viewLine} />
                    ) : (
                      <Spacer />
                    )}
                  </RippleEffect>
                  <RippleEffect onPress={() => handleTabPress(1)}>
                    <TextElement
                      fontType={'h6'}
                      textStyle={
                        activeTab === 1
                          ? styles.activeLabel
                          : styles.inActiveLabel
                      }>
                      Orders
                    </TextElement>
                    <Spacer height={Mixins.scaleSize(6)} />
                    {activeTab === 1 ? (
                      <View style={styles.viewLine} />
                    ) : (
                      <Spacer />
                    )}
                  </RippleEffect>
                  <RippleEffect onPress={() => handleTabPress(3)}>
                    <TextElement
                      fontType={'h6'}
                      textStyle={
                        activeTab === 3
                          ? styles.activeLabel
                          : styles.inActiveLabel
                      }>
                      History
                    </TextElement>
                    <Spacer height={Mixins.scaleSize(6)} />
                    {activeTab === 3 ? (
                      <View style={styles.viewLine} />
                    ) : (
                      <Spacer />
                    )}
                  </RippleEffect>
                </View>

                <View style={styles.tabContent}>
                  {activeTab === 1 &&
                    (orderLoader ? (
                      <SkeletonLoader />
                    ) : orderList?.length == 0 ? (
                      <EmptyList Message={'No Order Found'} />
                    ) : (
                      <History item={orderList} />
                    ))}
                  {activeTab === 2 &&
                    (shippingLoader ? (
                      <SkeletonLoader />
                    ) : shippingList?.length == 0 ? (
                      <EmptyList Message={'No Shipping Order Found'} />
                    ) : (
                      <View style={{paddingHorizontal: 18}}>
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={shippingList}
                          renderItem={({item, index}) => (
                            <ShippingCard
                              key={index}
                              item={item}
                              trackOrderPress={() =>
                                props.navigation.navigate('TrackOrderScreen', {
                                  item: item,
                                })
                              }
                            />
                          )}
                        />

                        <Spacer height={Mixins.scaleSize(20)} />
                      </View>
                    ))}
                  {activeTab === 3 &&
                    (historyOrderLoader ? (
                      <SkeletonLoader />
                    ) : historyOrderList?.length == 0 ? (
                      <EmptyList Message={'No Order History Found'} />
                    ) : (
                      <History item={historyOrderList} />
                    ))}
                </View>
              </>
            )}

            <Spacer height={Mixins.scaleSize(20)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default MyOrdersScreen;
