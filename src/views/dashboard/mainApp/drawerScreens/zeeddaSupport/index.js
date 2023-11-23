import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins} from '../../../../../styles';
import BranchCard from './components/suppoortTicketCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as supportTicketApi from '../../../../../../services/api/support-ticket';
import {useSelector} from 'react-redux';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';
import DeletePopUp from '../../../../../components/DeletePopUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';

const ZeeddaSupportTicketScreen = props => {
  const user = useSelector(state => state?.auth?.user);
  const styles = getStyles();
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
      const TicketObject = {
        user_id: user?.id,
        ticket_id: searchValue,
      };
      const {
        data: {success},
        data: {ticket},
      } = await supportTicketApi.getUserTickets({TicketObject});
      if (success) {
        setSearchList(ticket);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const getUserTickets = async () => {
    try {
      setLoader(true);
      const TicketObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {ticket},
      } = await supportTicketApi.getUserTickets({TicketObject});

      if (success) {
        setListing(ticket);
        setLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setLoader(false);
      setRefreshing(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTickets();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserTickets();
  }, []);

  const deleteCard = async () => {
    try {
      setDeleteLoader(true);
      const TicketObject = {
        user_id: user?.id,
        ticket_id: deleteId,
      };
      const {
        data: {success},
      } = await supportTicketApi.deleteUserTickets({TicketObject});
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
        title={'Are you sure you want to delete the support ticket?'}
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
              label={'My Support'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            <SearchAnimated
              setSearchValue={setSearchValue}
              onPress={Search}
              loader={searchLoader}
              setFilterApply={setFilterApply}
              placeholder={'Search By Support Id'}
            />
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(0)} />
            )}
            <Toast topOffset={60} config={toastConfig} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Spacer height={Mixins.scaleSize(30)} />
              <RippleEffect
                style={styles.createNewBranchView}
                onPress={() => props.navigation.navigate('NewSupportTicket')}>
                <TextElement
                  fontType={'h9'}
                  textStyle={styles.createNewBranchLabel}>
                  Create New Ticket
                </TextElement>
              </RippleEffect>

              <Spacer height={Mixins.scaleSize(25)} />
              {filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No Support Found'} />
                ) : (
                  <View style={{paddingHorizontal: 10}}>
                    <FlatList
                      data={searchList}
                      renderItem={({item, index}) => (
                        <BranchCard
                          item={item}
                          index={index}
                          setDeletePopUp={setDeletePopUp}
                          setDeleteId={setDeleteId}
                        />
                      )}
                    />
                  </View>
                )
              ) : loader ? (
                <SkeletonLoader />
              ) : listing?.length == 0 ? (
                <EmptyList Message={'No Support Found'} />
              ) : (
                <View style={{paddingHorizontal: 16}}>
                  <FlatList
                    data={listing}
                    renderItem={({item, index}) => (
                      <BranchCard
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

export default ZeeddaSupportTicketScreen;
