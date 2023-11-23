import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Colors, Mixins} from '../../../../../styles';
import AdminProfileViewCard from './components/adminProfileCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as adminApi from '../../../../../../services/api/admin';
import {useSelector} from 'react-redux';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';
import Toast from 'react-native-toast-message';
import DeletePopUp from '../../../../../components/DeletePopUp';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const AdminScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [listing, setListing] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchLoader, setSearchLoader] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const adminObject = {
        user_id: user?.id,
        name: searchValue,
      };

      const {
        data: {success},
        data: {admins},
      } = await adminApi.getAdmin({adminObject});
      if (success) {
        setSearchList(admins);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const getAdmin = async () => {
    try {
      setLoader(true);
      const adminObject = {
        user_id: user?.id,
      };

      const {
        data: {success},
        data: {admins},
      } = await adminApi.getAdmin({adminObject});

      if (success) {
        setListing(admins);
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
    getAdmin();
  }, []);

  const deleteCard = async () => {
    try {
      setDeleteLoader(true);
      const adminObject = {
        user_id: user?.id,
        admin_id: deleteId,
      };

      const {
        data: {success},
      } = await adminApi.deleteAdmin({adminObject});

      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Support Ticket',
          text2: 'Support ticket has been deleted successfully',
          position: 'left',
          visibilityTime: 4000,
        });
        const filterList = listing?.filter(item => item?.id != deleteId);
        setListing(filterList);
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
        setDeleteLoader(false);
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

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAdmin();
  }, []);

  return (
    <>
      <DeletePopUp
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
        title={'Are you sure you want to delete the admin?'}
        deleteCard={deleteCard}
        deleteLoader={deleteLoader}
      />
      <Toast topOffset={60} config={toastConfig} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={[{}]}
        numColumns={1}
        renderItem={({}) => (
          <View style={styles.mainWrap}>
            <ViewHeader
              label={'Admin Management'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              placeholder={'Search By Admin Name'}
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
                style={styles.createAdminView}
                onPress={() =>
                  props.navigation.navigate('CreateNewAdminScreen')
                }>
                <TextElement
                  fontType={'h9'}
                  textStyle={styles.createAdminViewLabel}>
                  Create New Admin
                </TextElement>
              </RippleEffect>

              <Spacer height={Mixins.scaleSize(40)} />
              <TextElement
                fontType={'h4'}
                textStyle={{
                  color: Colors.BLACK,
                  marginLeft: 25,
                  fontWeight: '600',
                }}>
                Administrators
              </TextElement>

              <Spacer height={Mixins.scaleSize(25)} />
              {filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No Admin Found'} />
                ) : (
                  <FlatList
                    data={searchList}
                    renderItem={({item, index}) => (
                      <AdminProfileViewCard
                        item={item}
                        index={index}
                        setDeletePopUp={setDeletePopUp}
                        setDeleteId={setDeleteId}
                      />
                    )}
                  />
                )
              ) : loader ? (
                <SkeletonLoader />
              ) : listing?.length == 0 ? (
                <EmptyList Message={'No Admin Found'} />
              ) : (
                <View style={{paddingHorizontal: 16}}>
                  <FlatList
                    data={listing}
                    renderItem={({item, index}) => (
                      <AdminProfileViewCard
                        item={item}
                        index={index}
                        setDeletePopUp={setDeletePopUp}
                        setDeleteId={setDeleteId}
                      />
                    )}
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

export default AdminScreen;
