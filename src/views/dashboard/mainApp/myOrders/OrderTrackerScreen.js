import React, {useState, useEffect} from 'react';
import {
  Platform,
  View,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Spacer from '../../../../components/Spacer';
import ViewHeader from '../../../../components/viewHeader';
import {Mixins} from '../../../../styles';
import getStyles from './styles';
import * as orderApi from '../../../../../services/api/order';
import EmptyList from '../../../../components/empty-list';
import SkeletonLoader from '../../../../components/Loader';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {TextElement} from '../../../../components/TextElement';

const OrderTrackerScreen = props => {
  const styles = getStyles();
  const {fromDrawer} = props.route.params ?? {};
  const user = useSelector(state => state?.auth?.user);

  const [shippingLoader, setShippingLoader] = useState(true);
  const [shippingList, setShippingList] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      // setShippingList([]);
      let orderObject;
      orderObject = {
        user_id: user?.id,
      };
      const responseOrder = await orderApi?.getAllTrackingListing({
        orderObject,
      });
      setShippingList(responseOrder?.data?.orders);
      setShippingLoader(false);
      setRefreshing(false);
    } catch (error) {
      setShippingList([]);
      setRefreshing(false);
      setShippingLoader(false);
      console.log('error', error);
    }
  };

  const HistoryCard = ({item}) => {
    return (
      <View style={styles.mainWrap}>
        <View style={styles.topHeader}>
          <TextElement fontType={'h9'} textStyle={styles.label}>
            Order ID #{item?.order_id}
          </TextElement>
          <TextElement fontType={'h9'} textStyle={styles.label}>
            {moment(item?.created_at).format('DD MMM, YYYY')}
          </TextElement>
        </View>
        <Spacer height={Mixins.scaleSize(12)} />

        <View style={styles.contentCont}>
          <Spacer width={Mixins.scaleSize(10)} />
          <View>
            <TextElement fontType={'h7'} textStyle={styles.title}>
              {item?.product_name}
            </TextElement>
            <Spacer width={Mixins.scaleSize(4)} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextElement
                  style={{fontSize: 12, color: '#000', paddingRight: 10}}>
                  Status :
                </TextElement>
                <TextElement fontType={'h8'} textStyle={styles.desc}>
                  {item?.status}
                </TextElement>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextElement fontType={'h8'}>9:00 Am</TextElement>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getOrder();
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[{}]}
      numColumns={1}
      renderItem={({}) => (
        <ScrollView>
          <View style={styles.mainTop}>
            <ViewHeader
              label={'Order Tracking'}
              isHamburger={true}
              onPress={() => {
                props.navigation.openDrawer();
              }}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(35)} />
            )}
            {shippingLoader ? (
              <SkeletonLoader />
            ) : shippingList?.length == 0 ? (
              <EmptyList Message={'No Shipping Order Found'} />
            ) : (
              <View style={{paddingHorizontal: 18}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={shippingList}
                  renderItem={({item, index}) => (
                    <HistoryCard key={index} item={item} />
                  )}
                />
                <Spacer height={Mixins.scaleSize(20)} />
              </View>
            )}

            <Spacer height={Mixins.scaleSize(20)} />
          </View>
        </ScrollView>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default OrderTrackerScreen;
