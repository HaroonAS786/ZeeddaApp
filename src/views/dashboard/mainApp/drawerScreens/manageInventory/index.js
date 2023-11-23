import React, {useState, useEffect} from 'react';
import {FlatList, Platform, View, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins} from '../../../../../styles';
import InventoryCard from './components/inventoryCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as inventoryApi from '../../../../../../services/api/inventory';
import SkeletonLoader from '../../../../../components/Loader';
import {useSelector} from 'react-redux';
import EmptyList from '../../../../../components/empty-list';

const ManageInventoryScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryLoader, setInventoryLoader] = useState(true);
  const [searchLoader, setSearchLoader] = useState(false);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const InventoryObject = {
        user_id: user?.id,
        product_name: searchValue,
      };

      const {
        data: {success},
        data: {result},
      } = await inventoryApi?.getInventory({InventoryObject});
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
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const InventoryObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {result},
      } = await inventoryApi?.getInventory({InventoryObject});
      if (success) {
        setInventoryList(result);
      }
      setInventoryLoader(false);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      setInventoryLoader(false);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchInventory();
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
              label={'Inventory'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              placeholder={'Search By Product Name'}
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(35)} />
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <RippleEffect
                style={styles.addNewInventory}
                onPress={() => props.navigation.navigate('NewInventoryScreen')}>
                <TextElement
                  fontType={'h9'}
                  textStyle={styles.addNewInventoryLabel}>
                  Add New Inventory
                </TextElement>
              </RippleEffect>

              <Spacer height={Mixins.scaleSize(35)} />

              {filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No inventory Found'} />
                ) : (
                  <View style={{paddingHorizontal: 16, width: '100%'}}>
                    <FlatList
                      data={searchList}
                      renderItem={({item}) => {
                        return <InventoryCard item={item} />;
                      }}
                    />
                  </View>
                )
              ) : inventoryLoader ? (
                <SkeletonLoader />
              ) : inventoryList?.length == 0 ? (
                <EmptyList Message={'No inventory Found'} />
              ) : (
                <View style={{paddingHorizontal: 16, width: '100%'}}>
                  <FlatList
                    data={inventoryList}
                    renderItem={({item}) => {
                      return <InventoryCard item={item} />;
                    }}
                  />
                </View>
              )}

              <Spacer height={Mixins.scaleSize(50)} />
            </ScrollView>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default ManageInventoryScreen;
