import React, {useState, useEffect} from 'react';
import {
  Platform,
  ScrollView,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AppStatusBar from '../../../../components/appStatusBar';
import Spacer from '../../../../components/Spacer';
import {Colors, Mixins} from '../../../../styles';
import BannerCard from './components/bannerCard';
import HomeHeader from './components/homeHeader';
import HomeHeaderContext from './components/homeHeaderContext';
import RecommendedCardItem from './components/recomendedCardItem';
import HomeSearch from './homeSearchView';
import getStyles from './styles';
import * as productApi from '../../../../../services/api/product';
import SkeletonLoader from '../../../../components/Loader';
import EmptyList from '../../../../components/empty-list';
import {useSelector} from 'react-redux';

const HomeScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const productObject = {
        user_id: user?.id,
      };
      const {
        data: {result},
        data: {success},
      } = await productApi?.getAllProducts({productObject});
      if (success) {
        setProductList(result);
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
      const productObject = {
        user_id: user?.id,
        name: searchValue,
      };
      const {
        data: {result},
        data: {success},
      } = await productApi?.getAllProducts({productObject});
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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getProduct();
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
          <View style={styles.topMainWrapContainer}>
            <AppStatusBar
              backgroundColor={Colors.PRIMARY}
              barStyle="light-content"
            />
            <View style={styles.mainWrapContainer}>
              {Platform.OS === 'ios' ? (
                <Spacer height={Mixins.scaleSize(40)} />
              ) : (
                <Spacer height={Mixins.scaleSize(20)} />
              )}

              <HomeHeader
                onPress={() => {
                  props.navigation.openDrawer();
                }}
                profilePress={() =>
                  props.navigation.navigate('Profile', {
                    fromHome: true,
                  })
                }
                cartOnPress={() => {
                  props.navigation.navigate('ProceedOrderScreen');
                }}
              />
              <Spacer height={Mixins.scaleSize(22)} />
              <HomeSearch
                setSearchValue={setSearchValue}
                onPress={Search}
                loader={searchLoader}
                setFilterApply={setFilterApply}
              />
            </View>
            <Spacer height={Mixins.scaleSize(20)} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container}>
                <Swiper
                  loop={false}
                  dot={<View style={styles.dot} />}
                  activeDot={<View style={[styles.dot, styles.activeDot]} />}>
                  {[0, 1, 2, 3].map(card => (
                    <BannerCard />
                  ))}
                </Swiper>
              </View>
              {filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No Product Found'} />
                ) : (
                  searchList?.map(item => {
                    return <RecommendedCardItem item={item} />;
                  })
                )
              ) : (
                <>
                  <HomeHeaderContext
                    leftLabel={'Recommended'}
                    // rightLabel={'see all'}
                  />
                  <Spacer height={Mixins.scaleSize(12)} />
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      width: Mixins.WINDOW_WIDTH,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {loader ? (
                      <SkeletonLoader />
                    ) : (
                      <>
                        {productList?.map(item => {
                          return <RecommendedCardItem item={item} />;
                        })}
                      </>
                    )}
                  </View>
                  <Spacer height={Mixins.scaleSize(12)} />
                  <HomeHeaderContext
                    leftLabel={'Best Seller'}
                    // rightLabel={'see all'}
                  />
                  <Spacer height={Mixins.scaleSize(12)} />
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      width: Mixins.WINDOW_WIDTH,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {loader ? (
                      <SkeletonLoader />
                    ) : (
                      <>
                        {productList?.map(item => {
                          return <RecommendedCardItem item={item} />;
                        })}
                      </>
                    )}
                  </View>
                </>
              )}
              <Spacer height={Mixins.scaleSize(260)} />
            </ScrollView>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default HomeScreen;
