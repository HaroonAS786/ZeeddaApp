import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View, RefreshControl} from 'react-native';
import Spacer from '../../../../../components/Spacer';
import {Mixins} from '../../../../../styles';
import CommissionCard from './components/commisionCard';
import CommissionHeader from './components/commissionHeader';
import getStyles from './styles';
import * as commissionApi from '../../../../../../services/api/commission';
import {useSelector} from 'react-redux';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import EmptyList from '../../../../../components/empty-list';
import SkeletonLoader from '../../../../../components/Loader';

const CommissionScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [listing, setListing] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchLoader, setSearchLoader] = useState(false);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const commissionObject = {
        user_id: user?.id,
        payment_id: searchValue,
      };
      const {
        data: {success},
        data: {commissions},
      } = await commissionApi.getCommission({commissionObject});
      if (success) {
        setSearchList(commissions);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const getCommission = async () => {
    try {
      setLoader(true);
      const commissionObject = {
        user_id: user?.id,
      };

      const {
        data: {success},
        data: {commissions},
      } = await commissionApi.getCommission({commissionObject});
      console.log(commissions);
      if (success) {
        setListing(commissions);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setRefreshing(false);
      setLoader(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCommission();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCommission();
  }, []);

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[{}]}
      numColumns={1}
      renderItem={({}) => (
        <View style={styles.mainWrap}>
          <CommissionHeader
            label={'Commission'}
            onPress={() => props.navigation.openDrawer()}
          />
          <SearchAnimated
            placeholder={'Search By Payment ID'}
            setSearchValue={setSearchValue}
            onPress={Search}
            loader={searchLoader}
            setFilterApply={setFilterApply}
          />
          {Platform.OS === 'ios' ? (
            <Spacer height={Mixins.scaleSize(35)} />
          ) : (
            <Spacer height={Mixins.scaleSize(45)} />
          )}
          {filterApply && searchValue ? (
            searchList?.length == 0 ? (
              <EmptyList Message={'No Commission Found'} />
            ) : (
              searchList?.map((item, index) => {
                return <CommissionCard item={item} index={index} />;
              })
            )
          ) : loader ? (
            <SkeletonLoader />
          ) : listing?.length == 0 ? (
            <EmptyList Message={'No Commission Found'} />
          ) : (
            <View style={{paddingHorizontal: 16, width: '100%'}}>
              <FlatList
                data={listing}
                renderItem={({index, item}) => {
                  return <CommissionCard item={item} index={index} />;
                }}
              />
            </View>
          )}
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default CommissionScreen;
