import React, {useState, useEffect} from 'react';
import {Platform, View, FlatList, RefreshControl} from 'react-native';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins, Colors} from '../../../../../styles';
import CustomerOrdersHistory from './history';
import CustomerOrders from './orders';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as orderApi from '../../../../../../services/api/order';
import EmptyList from '../../../../../components/empty-list';
import SkeletonLoader from '../../../../../components/Loader';
import {useSelector} from 'react-redux';
import CustomerCard from './components/customerCard';

const CustomOrdersScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [orderLoader, setOrderLoader] = useState(true);
  const [historyOrderList, setHistoryList] = useState([]);
  const [historyOrderLoader, setHistoryOrderLoader] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [searchLoader, setSearchLoader] = useState(false);

  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
  };

  const Search = async () => {
    try {
      setSearchLoader(true);
      const customerOrderObject = {
        user_id: user?.id,
        item_id: searchValue,
        type: 1,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getCustomerOrderListing({customerOrderObject});
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

  useEffect(() => {
    getOrder();
    getCustomerOrder();
  }, []);

  const getOrder = async () => {
    try {
      const customerOrderObject = {
        user_id: user?.id,
        type: 1,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getCustomerOrderListing({customerOrderObject});

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
      const customerOrderObject = {
        user_id: user?.id,
        type: 2,
      };
      const {
        data: {orders},
        data: {success},
      } = await orderApi?.getCustomerOrderListing({customerOrderObject});
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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
              label={'Customer Orders'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(10)} />
            )}
            <Spacer height={Mixins.scaleSize(25)} />

            {filterApply && searchValue ? (
              searchList?.length == 0 ? (
                <EmptyList Message={'No Order Found'} />
              ) : (
                searchList?.map(item => {
                  return (
                    <CustomerOrders
                      orders={searchList}
                      viewOrderPress={() => {
                        props.navigation.navigate('ViewCustomerOrders');
                      }}
                    />
                  );
                })
              )
            ) : (
              <>
                <View style={styles.container}>
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
                  <RippleEffect onPress={() => handleTabPress(2)}>
                    <TextElement
                      fontType={'h6'}
                      textStyle={
                        activeTab === 2
                          ? styles.activeLabel
                          : styles.inActiveLabel
                      }>
                      History
                    </TextElement>
                    <Spacer height={Mixins.scaleSize(6)} />
                    {activeTab === 2 ? (
                      <View style={styles.viewLine} />
                    ) : (
                      <Spacer />
                    )}
                  </RippleEffect>
                </View>
                <Spacer height={Mixins.scaleSize(20)} />
                <View style={styles.tabContent}>
                  {activeTab === 1 &&
                    (orderLoader ? (
                      <SkeletonLoader />
                    ) : orderList?.length == 0 ? (
                      <EmptyList Message={'No Customer Order Found'} />
                    ) : (
                      <View
                        style={{
                          paddingHorizontal: 18,
                          flex: 1,
                          backgroundColor: Colors.WHITE,
                        }}>
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={orderList}
                          renderItem={({item, index}) => (
                            <CustomerCard
                              key={index}
                              item={item}
                              viewOrderPress={() =>
                                props.navigation.navigate(
                                  'ViewCustomerOrders',
                                  {
                                    item: item,
                                  },
                                )
                              }
                            />
                          )}
                        />

                        <Spacer height={Mixins.scaleSize(20)} />
                      </View>
                    ))}

                  {activeTab === 2 &&
                    (historyOrderLoader ? (
                      <SkeletonLoader />
                    ) : historyOrderList?.length == 0 ? (
                      <EmptyList Message={'No Customer Order History Found'} />
                    ) : (
                      <CustomerOrdersHistory ordersHistory={historyOrderList} />
                    ))}
                </View>
              </>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default CustomOrdersScreen;
