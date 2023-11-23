import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  View,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {FilterSVGComponent} from '../../../../../assets/svgs';
import CustomDropDown from '../../../../../assets/svgs/customDropdown';
import ButtonComponent from '../../../../../components/buttonComponent';
import FadeModal from '../../../../../components/fadeModal';
import InputTextComponent from '../../../../../components/InputTextField';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Colors, Mixins} from '../../../../../styles';
import BranchCard from './components/branchCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as branchApi from '../../../../../../services/api/branch';
import SkeletonLoader from '../../../../../components/Loader';
import {useSelector} from 'react-redux';
import EmptyList from '../../../../../components/empty-list';
import DeletePopUp from '../../../../../components/DeletePopUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BranchManagementScreen = props => {
  const styles = getStyles();
  const refBranch = useRef();
  const user = useSelector(state => state?.auth?.user);

  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [branchLoader, setBranchLoader] = useState(true);
  const [branchList, setBranchList] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const branchObject = {
        user_id: user?.id,
        branch_name: searchValue,
      };
      let {
        data: {branches},
        data: {success},
      } = await branchApi.getBranchListing({branchObject});

      if (success) {
        setSearchList(branches);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const FetchBranch = async () => {
    try {
      const branchObject = {
        user_id: user?.id,
      };
      let {
        data: {branches},
        data: {success},
      } = await branchApi.getBranchListing({branchObject});
      if (success) {
        setBranchList(branches);
      }
      setBranchLoader(false);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      setBranchLoader(false);
      console.log('Error', error);
    }
  };
  useEffect(() => {
    FetchBranch();
  });

  const deleteCard = async () => {
    try {
      setDeleteLoader(true);
      const branchObject = {
        user_id: user?.id,
        branch_id: deleteId,
      };
      const {
        data: {success},
      } = await branchApi.deleteBranch({branchObject});
      if (success) {
        Toast.show({
          type: 'success',
          text1: 'Support Ticket',
          text2: 'Support ticket has been deleted successfully',
          position: 'left',
          visibilityTime: 4000,
        });
        const filterList = branchList?.filter(item => item?.id != deleteId);
        setBranchList(filterList);
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
    FetchBranch();
  }, []);

  const SupplierManagementFilter = async values => {
    try {
      setSearchLoader(true);
      setBranchLoader(true);
      setSearchValue(true);
      setFilterApply(true);
      setClearFilter(true);
      const branchObject = {
        user_id: user?.id,
        branch_name: values?.branch_name,
        branch_location: values?.branch_location,
      };
      let {
        data: {branches},
        data: {success},
      } = await branchApi.getBranchListing({branchObject});
      if (success) {
        setSearchList(branches);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      refBranch.current.close();
      setBranchLoader(false);
      setRefreshing(false);
      setSearchLoader(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      refBranch.current.close();
      setSearchLoader(false);
      setBranchLoader(false);
      setRefreshing(false);
      console.log(error);
    }
  };

  return (
    <>
      <DeletePopUp
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
        title={'Are you sure you want to delete the Branch management?'}
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
              label={'Branch Management'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />
            {clearFilter ? null : (
              <SearchAnimated
                setSearchValue={setSearchValue}
                onPress={Search}
                loader={searchLoader}
                setFilterApply={setFilterApply}
              />
            )}
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(0)} />
            )}

            <ScrollView showsVerticalScrollIndicator={false}>
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
                  <Text style={{width: '90%', textAlign: 'right'}}>
                    Clear Filter
                  </Text>
                </TouchableOpacity>
              ) : null}
              {clearFilter ? null : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    alignItems: 'center',
                  }}>
                  <RippleEffect
                    onPress={() => {
                      refBranch.current.open();
                    }}>
                    <FilterSVGComponent />
                  </RippleEffect>

                  <RippleEffect
                    style={styles.createNewBranchView}
                    onPress={() =>
                      props.navigation.navigate(
                        'CreateNewBranchManagementScreen',
                      )
                    }>
                    <TextElement
                      fontType={'h9'}
                      textStyle={styles.createNewBranchLabel}>
                      Add New Branch
                    </TextElement>
                  </RippleEffect>
                </View>
              )}

              <Spacer height={Mixins.scaleSize(25)} />

              {searchLoader && clearFilter ? (
                <ActivityIndicator size="large" />
              ) : branchLoader ? (
                <SkeletonLoader />
              ) : filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No Filte Supplier Found'} />
                ) : (
                  <View style={{paddingHorizontal: 16}}>
                    <FlatList
                      data={searchList}
                      renderItem={({item}) => (
                        <BranchCard
                          item={item}
                          setDeletePopUp={setDeletePopUp}
                          setDeleteId={setDeleteId}
                        />
                      )}
                    />
                  </View>
                )
              ) : (
                <View style={{paddingHorizontal: 16}}>
                  <FlatList
                    data={branchList}
                    renderItem={({item}) => (
                      <BranchCard
                        item={item}
                        setDeletePopUp={setDeletePopUp}
                        setDeleteId={setDeleteId}
                      />
                    )}
                  />
                </View>
              )}
              <Spacer height={Mixins.scaleSize(60)} />
            </ScrollView>

            <FadeModal
              refRBSheet={refBranch}
              height={Mixins.WINDOW_HEIGHT * 0.9}>
              <Formik
                onSubmit={values => SupplierManagementFilter(values)}
                initialValues={{
                  branch_name: '',
                  branch_location: '',
                  user_id: user?.id,
                }}>
                {formik => {
                  return (
                    <>
                      <View style={{width: Mixins.WINDOW_WIDTH}}>
                        <Spacer height={Mixins.scaleSize(20)} />
                        <View style={{alignItems: 'center'}}>
                          <TextElement fontType="h4">
                            {'Branch Management'}
                          </TextElement>
                        </View>
                        <Spacer height={Mixins.scaleSize(30)} />
                        <View style={styles.inputRowsWrap}>
                          <InputTextComponent
                            placeholder={'Branch name'}
                            labelColor={'#E5E5E6'}
                            containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                            backgroundColor={'transparent'}
                            textInputColor={'#E5E5E6'}
                            autoCorrect={false}
                            formikError={formik.errors.branch_name}
                            onChangeText={formik.handleChange('branch_name')}
                            inputValue={formik.values.branch_name}
                          />
                          <InputTextComponent
                            placeholder={'Branch location'}
                            labelColor={'#E5E5E6'}
                            containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                            backgroundColor={'transparent'}
                            textInputColor={'#E5E5E6'}
                            autoCorrect={false}
                            formikError={formik.errors.branch_location}
                            onChangeText={formik.handleChange(
                              'branch_location',
                            )}
                            inputValue={formik.values.branch_location}
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
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default BranchManagementScreen;
