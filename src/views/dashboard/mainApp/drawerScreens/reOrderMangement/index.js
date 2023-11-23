import React, {useEffect, useState} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import Spacer from '../../../../../components/Spacer';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins} from '../../../../../styles';
import ReOrderCard from './components/reOrderCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as reOrderApi from '../../../../../../services/api/order';
import {useSelector} from 'react-redux';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';

const ReOrderManagementScreen = props => {
  const user = useSelector(state => state?.auth?.user);
  const styles = getStyles();
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loader, setLoader] = useState(true);
  const [listing, setListing] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const reOrderObject = {
        user_id: user?.id,
        product_name: searchValue,
      };
      console.log(reOrderObject);
      const {
        data: {success},
        data: {result},
      } = await reOrderApi.getReOrderListing({reOrderObject});
      if (success) {
        setSearchList(result);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const getReOrders = async () => {
    try {
      setLoader(true);
      const reOrderObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {result},
      } = await reOrderApi.getReOrderListing({reOrderObject});
      console.log(success);
      if (success) {
        setListing(result);
      }
      setLoader(false);
      setRefreshing(false);
    } catch (error) {
      setLoader(false);
      setRefreshing(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getReOrders();
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getReOrders();
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
          <View style={styles.mainWrap}>
            <ViewHeader
              label={'Reorder Management'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
              placeholder={'Search By Product Name'}
            />
            <Spacer height={Mixins.scaleSize(35)} />
            {filterApply && searchValue ? (
              searchList?.length == 0 ? (
                <EmptyList Message={'No Re-Order Found'} />
              ) : (
                <View style={{paddingHorizontal: 16, width: '100%'}}>
                  <FlatList
                    data={searchList}
                    renderItem={({index, item}) => {
                      return <ReOrderCard index={index} item={item} />;
                    }}
                  />
                </View>
              )
            ) : loader ? (
              <SkeletonLoader />
            ) : listing?.length == 0 ? (
              <EmptyList Message={'No Re-Order Found'} />
            ) : (
              <View style={{paddingHorizontal: 16, width: '100%'}}>
                <FlatList
                  data={listing}
                  renderItem={({index, item}) => {
                    return <ReOrderCard index={index} item={item} />;
                  }}
                />
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ReOrderManagementScreen;
