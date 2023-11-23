import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import getStyles from './styles';
import ViewHeader from '../../../../../components/viewHeader';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import HubCard from '../components/hubCard';
import {FilterSVGComponent} from '../../../../../assets/svgs';
import RippleEffect from '../../../../../components/rippleEffect';
import FadeModal from '../../../../../components/fadeModal';
import {TextElement} from '../../../../../components/TextElement';
import InputTextComponent from '../../../../../components/InputTextField';
import CustomDropDown from '../../../../../assets/svgs/customDropdown';
import ButtonComponent from '../../../../../components/buttonComponent';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as healthHubApi from '../../../../../../services/api/hub-listing';
import SkeletonLoader from '../../../../../components/Loader';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as AppDataApi from '../../../../../../services/api/app-data';
import EmptyList from '../../../../../components/empty-list';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const ViewHubsScreen = props => {
  const styles = getStyles();
  const {hubLabel, hubLabelFromDrawer, B2BApi, HealthHubApi, TradeHubApi} =
    props?.route?.params ?? {};
  const refFilterProducts = useRef();
  const user = useSelector(state => state?.auth?.user);

  const [listing, setListing] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchLoader, setSearchLoader] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subFilterCategories, setSubFilterCategories] = useState([]);
  const [clearFilter, setClearFilter] = useState(false);

  useEffect(() => {
    AppData();
  }, []);

  const AppData = async () => {
    try {
      const {
        data: {categories},
        data: {subcategories},
      } = await AppDataApi?.AppData();

      let filterCategories = [];
      categories?.forEach(obj => {
        filterCategories.push({
          key: obj.category_id,
          label: obj.category_name,
        });
      });
      setCategories(filterCategories);
      setSubCategories(subcategories);
    } catch (error) {}
  };

  const Search = async () => {
    try {
      setSearchLoader(true);
      let SearchObject = {
        user_id: user?.id,
        shop_name: searchValue,
      };
      if (B2BApi) {
        B2BSearch(SearchObject);
      }
      if (HealthHubApi) {
        HealthHubSearch(SearchObject);
      }
      if (TradeHubApi) {
        TradeHubSearch(SearchObject);
      }
    } catch (error) {}
  };

  const B2BSearch = async SearchObject => {
    try {
      setSearchLoader(true);
      const B2BObject = SearchObject;
      const {
        data: {success},
        data: {shops},
      } = await healthHubApi.getB2BHubListing({B2BObject});
      if (success) {
        setSearchList(shops);
        setFilterApply(true);
        setSearchLoader(false);
      }
      if (refFilterProducts.current) {
        refFilterProducts.current.close();
      }
    } catch (error) {
      console.log('error', error);
      setSearchLoader(false);
      if (refFilterProducts.current) {
        refFilterProducts.current.close();
      }
    }
  };

  const HealthHubSearch = async SearchObject => {
    try {
      setSearchLoader(true);
      const HealthHubObject = SearchObject;
      const {
        data: {success},
        data: {shops},
      } = await healthHubApi.getHealthHubListing({HealthHubObject});
      if (success) {
        setSearchList(shops);
        setFilterApply(true);
        setSearchLoader(false);
      }
      if (refFilterProducts.current) {
        refFilterProducts.current.close();
      }
    } catch (error) {
      console.log(error);
      setSearchLoader(false);
      if (refFilterProducts.current) {
        refFilterProducts.current.close();
      }
    }
  };

  const TradeHubSearch = async SearchObject => {
    try {
      setSearchLoader(true);
      const TradeObject = SearchObject;
      const {
        data: {success},
        data: {shops},
      } = await healthHubApi.getTradeHubListing({TradeObject});
      if (success) {
        setSearchList(shops);
        setFilterApply(true);
        setSearchLoader(false);
      }
      if (refFilterProducts.current) {
        refFilterProducts.current.close();
      }
    } catch (error) {
      setSearchLoader(false);
      if (refFilterProducts.current) {
        refFilterProducts.current.close();
      }
    }
  };

  useEffect(() => {
    HubList();
  }, []);

  const HubList = async () => {
    try {
      if (B2BApi) {
        B2BListing();
      }
      if (HealthHubApi) {
        HealthHubList();
      }
      if (TradeHubApi) {
        TradeHubList();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const B2BListing = async () => {
    try {
      const B2BObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {shops},
      } = await healthHubApi.getB2BHubListing({B2BObject});
      if (success) {
        setListing(shops);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setRefreshing(false);
      setLoader(false);
    }
  };

  const HealthHubList = async () => {
    try {
      const HealthHubObject = {
        user_id: user?.id,
      };

      const {
        data: {success},
        data: {shops},
      } = await healthHubApi.getHealthHubListing({HealthHubObject});
      if (success) {
        setListing(shops);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setRefreshing(false);
      setLoader(false);
    }
  };

  const TradeHubList = async () => {
    try {
      const TradeObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {shops},
      } = await healthHubApi.getTradeHubListing({TradeObject});
      if (success) {
        setListing(shops);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setRefreshing(false);
      setLoader(false);
    }
  };

  const HubFilter = values => {
    try {
      let SearchObject = {
        user_id: user?.id,
        category: values?.category?.key,
        subcategory: values?.subcategory?.key,
        shop_location: values?.shop_location,
        shop_name: values?.shop_name,
      };
      setSearchValue(true);
      setFilterApply(true);
      setClearFilter(true);
      if (B2BApi) {
        B2BSearch(SearchObject);
      }
      if (HealthHubApi) {
        HealthHubSearch(SearchObject);
      }
      if (TradeHubApi) {
        TradeHubSearch(SearchObject);
      }
    } catch (error) {}
  };

  const filterSubCategory = item => {
    try {
      const filterData = subCategories?.filter(
        subCategory => subCategory?.category_id == item?.key,
      );
      let filterSubCategories = [];
      filterData?.forEach(obj => {
        filterSubCategories.push({
          key: obj.subcategory_id,
          label: obj.subcategory_name,
        });
      });
      setSubFilterCategories(filterSubCategories);
    } catch (error) {}
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    HubList();
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
              label={hubLabel || hubLabelFromDrawer}
              isHamburger={true}
              onPress={() => {
                props.navigation.openDrawer();
              }}
            />
            {clearFilter ? null : (
              <SearchAnimated
                setSearchValue={setSearchValue}
                onPress={Search}
                loader={searchLoader}
                setFilterApply={setFilterApply}
                placeholder={'Search By Shop Name'}
              />
            )}
            <Spacer height={Mixins.scaleSize(30)} />
            {clearFilter ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchValue(false);
                  setFilterApply(false);
                  setClearFilter(false);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{width: '90%', textAlign: 'right', color: '#000'}}>
                  Clear Filter
                </Text>
              </TouchableOpacity>
            ) : null}
            {filterApply && searchValue ? null : (
              <RippleEffect
                style={{paddingRight: 16, alignSelf: 'flex-end'}}
                onPress={() => {
                  refFilterProducts.current.open();
                }}>
                <FilterSVGComponent />
              </RippleEffect>
            )}
            <Spacer height={Mixins.scaleSize(30)} />

            {searchLoader && clearFilter ? (
              <ActivityIndicator size="large" />
            ) : loader ? (
              <SkeletonLoader />
            ) : filterApply && searchValue ? (
              searchList?.length == 0 ? (
                <EmptyList Message={`No ${hubLabelFromDrawer} Found`} />
              ) : (
                searchList?.map(item => {
                  return (
                    <View style={{paddingHorizontal: 16}}>
                      <FlatList
                        data={searchList}
                        renderItem={({item}) => (
                          <HubCard
                            item={item}
                            onPress={() => {
                              props.navigation.navigate('CheckHubView', {
                                item: item,
                                B2BApi: B2BApi,
                                HealthHubApi: HealthHubApi,
                                TradeHubApi: TradeHubApi,
                              });
                            }}
                          />
                        )}
                      />
                    </View>
                  );
                })
              )
            ) : (
              <View style={{paddingHorizontal: 16}}>
                <FlatList
                  data={listing}
                  renderItem={({item}) => (
                    <HubCard
                      item={item}
                      onPress={() => {
                        props.navigation.navigate('CheckHubView', {
                          item: item,
                          B2BApi: B2BApi,
                          HealthHubApi: HealthHubApi,
                          TradeHubApi: TradeHubApi,
                        });
                      }}
                    />
                  )}
                />
                <Spacer height={Mixins.scaleSize(35)} />

                <FadeModal
                  refRBSheet={refFilterProducts}
                  height={Mixins.WINDOW_HEIGHT * 0.9}>
                  <Formik
                    onSubmit={values => HubFilter(values)}
                    initialValues={{
                      shop_name: '',
                      shop_location: '',
                      category: '',
                      subcategory: '',
                      user_id: user?.id,
                    }}>
                    {formik => {
                      return (
                        <>
                          <View style={{width: Mixins.WINDOW_WIDTH}}>
                            <Spacer height={Mixins.scaleSize(20)} />
                            <View style={{alignItems: 'center'}}>
                              <TextElement fontType="h4">
                                {hubLabel}
                              </TextElement>
                            </View>
                            <Spacer height={Mixins.scaleSize(30)} />
                            <View style={styles.dropDownRowsWrap}>
                              <CustomDropDown
                                options={categories}
                                formik={formik}
                                filterCall={filterSubCategory}
                                field={formik.getFieldProps('category')}
                                value={formik.values.category}
                                style={{
                                  width: Mixins.WINDOW_WIDTH / 2.3,
                                  height: Mixins.scaleSize(45),
                                  borderColor: 'lightgrey',
                                }}
                                dropContStyle={{
                                  width: Mixins.WINDOW_WIDTH / 2.3,
                                  borderColor: 'lightgrey',
                                }}
                                label={'Category'}
                              />
                              <CustomDropDown
                                options={subFilterCategories}
                                formik={formik}
                                filterCall={filterSubCategory}
                                field={formik.getFieldProps('subcategory')}
                                value={formik.values.subcategory}
                                style={{
                                  width: Mixins.WINDOW_WIDTH / 2.3,
                                  height: Mixins.scaleSize(45),
                                  borderColor: 'lightgrey',
                                }}
                                dropContStyle={{
                                  width: Mixins.WINDOW_WIDTH / 2.3,
                                  borderColor: 'lightgrey',
                                }}
                                label={'Sub Category'}
                              />
                            </View>
                            <Spacer height={Mixins.scaleSize(30)} />
                            <View style={styles.inputRowsWrap}>
                              <InputTextComponent
                                placeholder={'Shop location'}
                                labelColor={'#E5E5E6'}
                                containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                                backgroundColor={'transparent'}
                                textInputColor={'#E5E5E6'}
                                autoCorrect={false}
                                formikError={formik.errors.shop_location}
                                onChangeText={formik.handleChange(
                                  'shop_location',
                                )}
                                inputValue={formik.values.shop_location}
                              />

                              <InputTextComponent
                                placeholder={'Shop Name'}
                                labelColor={'#E5E5E6'}
                                containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                                backgroundColor={'transparent'}
                                textInputColor={'#E5E5E6'}
                                autoCorrect={false}
                                formikError={formik.errors.shop_name}
                                onChangeText={formik.handleChange('shop_name')}
                                inputValue={formik.values.shop_name}
                              />
                            </View>
                            <Spacer height={Mixins.scaleSize(60)} />
                            <View style={styles.searchBtnWrap}>
                              <ButtonComponent
                                buttonTitle={'Filter'}
                                style={styles.searchBtn}
                                rippleColor={Colors.WHITE}
                                titleColor={Colors.WHITE}
                                loader={searchLoader}
                                onPress={() => {
                                  formik.submitForm();
                                }}
                              />
                            </View>
                          </View>
                        </>
                      );
                    }}
                  </Formik>
                </FadeModal>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ViewHubsScreen;
