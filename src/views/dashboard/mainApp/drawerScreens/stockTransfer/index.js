import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins} from '../../../../../styles';
import StockTransferCard from './components/stockCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as stockApi from '../../../../../../services/api/stock-transfer';
import {useSelector} from 'react-redux';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';

const StockTransferScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stocksList, setStocksList] = useState([]);
  const [stocksLoader, setStocksLoader] = useState(true);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const StockObject = {
        user_id: user?.id,
        stock_id: searchValue,
      };

      const {
        data: {result},
        data: {success},
      } = await stockApi?.getStocks({StockObject});

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
  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    try {
      const StockObject = {
        user_id: user?.id,
      };
      const {
        data: {result},
        data: {success},
      } = await stockApi?.getStocks({StockObject});
      if (success) {
        setStocksList(result);
      }
      setStocksLoader(false);
      setRefreshing(false);
    } catch (error) {
      setStocksLoader(false);
      setRefreshing(false);
      console.log('error', error);
    }
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getStocks();
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
              label={'Stock Transfer'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
              placeholder={'Search By Stock Id'}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(35)} />
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <RippleEffect
                style={styles.transferStock}
                onPress={() => props.navigation.navigate('AddTransferStock')}>
                <TextElement
                  fontType={'h9'}
                  textStyle={styles.transferStockLabel}>
                  Transfer Stock
                </TextElement>
              </RippleEffect>

              <Spacer height={Mixins.scaleSize(35)} />
              {filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No Stock Found'} />
                ) : (
                  <View style={{paddingHorizontal: 16, width: '100%'}}>
                    <FlatList
                      data={searchList}
                      renderItem={({index, item}) => {
                        return <StockTransferCard item={item} index={index} />;
                      }}
                    />
                  </View>
                )
              ) : stocksLoader ? (
                <SkeletonLoader />
              ) : stocksList?.length == 0 ? (
                <EmptyList Message={'No Stocks Found'} />
              ) : (
                <View style={{paddingHorizontal: 16, width: '100%'}}>
                  <FlatList
                    data={stocksList}
                    renderItem={({index, item}) => {
                      return <StockTransferCard item={item} index={index} />;
                    }}
                  />
                </View>
              )}

              <Spacer height={Mixins.scaleSize(60)} />
            </ScrollView>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default StockTransferScreen;
