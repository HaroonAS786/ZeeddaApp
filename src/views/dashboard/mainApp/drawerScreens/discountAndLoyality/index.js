import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins} from '../../../../../styles';
import DiscountCard from './components/discountCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as discountApi from '../../../../../../services/api/discount';
import {useSelector} from 'react-redux';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';
import DeletePopUp from '../../../../../components/DeletePopUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const DiscountAndLoyalityScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterApply, setFilterApply] = useState(false);
  const [discountList, setDiscountList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getDiscounts();
  }, []);

  const getDiscounts = async () => {
    try {
      setLoader(true);
      const discountObject = {
        user_id: user?.id,
      };
      const {
        data: {discounts},
        data: {success},
      } = await discountApi.getDiscount({discountObject});

      if (success) {
        setDiscountList(discounts);
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
      const discountObject = {
        user_id: user?.id,
        discount_id: searchValue,
      };
      const {
        data: {discounts},
        data: {success},
      } = await discountApi.deleteDiscount({discountObject});
      if (success) {
        setSearchList(discounts);
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
    getDiscounts();
  }, []);

  const deleteCard = async () => {
    try {
      setDeleteLoader(true);
      const discountObject = {
        user_id: user?.id,
        discount_id: deleteId,
      };
      const {
        data: {success},
      } = await discountApi.deleteDiscount({discountObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Discount Ticket',
          text2: 'Discount ticket has been deleted successfully',
          position: 'left',
          visibilityTime: 4000,
        });
        const filterList = discountList?.filter(item => item?.id != deleteId);
        setDiscountList(filterList);
        setDeletePopUp(false);
        setDeleteLoader(false);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      setDeleteLoader(false);
      console.log('error', error);
    }
  };

  return (
    <>
      <DeletePopUp
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
        title={'Are you sure you want to delete the Discount ticket?'}
        deleteCard={deleteCard}
        deleteLoader={deleteLoader}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={[{}]}
        numColumns={1}
        renderItem={({}) => (
          <View style={styles.mainWrap}>
            <ViewHeader
              label={'Discount & Loyalty Management'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
              placeholder={'Search By Promo Title'}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(35)} />
            )}
            <Toast topOffset={60} config={toastConfig} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <RippleEffect
                style={styles.createNewDiscount}
                onPress={() =>
                  props.navigation.navigate('CreateNewDiscountScreen')
                }>
                <TextElement
                  fontType={'h9'}
                  textStyle={styles.createNewDiscountLabel}>
                  Create New Discount
                </TextElement>
              </RippleEffect>
              <Spacer height={Mixins.scaleSize(30)} />

              <View style={{paddingHorizontal: 16}}>
                {filterApply && searchValue ? (
                  searchList?.length == 0 ? (
                    <EmptyList Message={'No Discounts Found'} />
                  ) : (
                    searchList?.map((item, index) => {
                      return (
                        <DiscountCard
                          item={item}
                          index={index}
                          setDeletePopUp={setDeletePopUp}
                          setDeleteId={setDeleteId}
                        />
                      );
                    })
                  )
                ) : loader ? (
                  <SkeletonLoader />
                ) : discountList?.length == 0 ? (
                  <EmptyList Message={'No Discounts Found'} />
                ) : (
                  <FlatList
                    data={discountList}
                    renderItem={({item, index}) => (
                      <DiscountCard
                        item={item}
                        index={index}
                        setDeletePopUp={setDeletePopUp}
                        setDeleteId={setDeleteId}
                      />
                    )}
                  />
                )}
              </View>
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

export default DiscountAndLoyalityScreen;
