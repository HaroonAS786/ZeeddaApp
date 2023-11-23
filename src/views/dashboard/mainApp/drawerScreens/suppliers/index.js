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
import ButtonComponent from '../../../../../components/buttonComponent';
import FadeModal from '../../../../../components/fadeModal';
import InputTextComponent from '../../../../../components/InputTextField';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins, Colors} from '../../../../../styles';
import SupplierManagementCard from './components/suppliersCard';
import getStyles from './styles';
import SearchAnimated from '../../home/homeSearchViewAnimated';
import * as supplierApi from '../../../../../../services/api/supplier';
import {useSelector} from 'react-redux';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';
import DeletePopUp from '../../../../../components/DeletePopUp';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../../../components/Toaster/ToastConfig';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SupplierManagementScreen = props => {
  const user = useSelector(state => state?.auth?.user);
  const styles = getStyles();
  const refSupplier = useRef();
  const [searchList, setSearchList] = useState([]);
  const [filterApply, setFilterApply] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [listing, setListing] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchLoader, setSearchLoader] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [clearFilter, setClearFilter] = useState(false);

  const Search = async () => {
    try {
      setSearchLoader(true);
      const SupplierObject = {
        user_id: user?.id,
        name: searchValue,
      };

      const {
        data: {success},
        data: {suppliers},
      } = await supplierApi.getSuppliers({SupplierObject});

      if (success) {
        setSearchList(suppliers);
        setFilterApply(true);
        setSearchLoader(false);
      }
    } catch (error) {
      setSearchLoader(false);
      console.log('error', error);
    }
  };

  const getSuppliers = async () => {
    try {
      setLoader(true);
      const SupplierObject = {
        user_id: user?.id,
      };

      const {
        data: {success},
        data: {suppliers},
      } = await supplierApi.getSuppliers({SupplierObject});

      if (success) {
        setListing(suppliers);
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
    getSuppliers();
  }, []);

  const deleteCard = async () => {
    try {
      setDeleteLoader(true);
      const SupplierObject = {
        user_id: user?.id,
        supplier_id: deleteId,
      };
      const {
        data: {success},
      } = await supplierApi.deleteSuppliers({SupplierObject});
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
    getSuppliers();
  }, []);

  const SupplierManagementFilter = async values => {
    try {
      setLoader(true);
      setSearchValue(true);
      setFilterApply(true);
      setClearFilter(true);
      setSearchLoader(true);
      const SupplierObject = {
        user_id: user?.id,
        name: values?.name,
        location: values?.location,
      };
      const {
        data: {success},
        data: {suppliers},
      } = await supplierApi.getSuppliers({SupplierObject});
      if (success) {
        refSupplier.current.close();
        setSearchList(suppliers);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: 'Please try again',
          position: 'left',
          visibilityTime: 4000,
        });
      }
      refSupplier.current.close();
      setLoader(false);
      setSearchLoader(false);
      setRefreshing(false);
    } catch (error) {
      setSearchLoader(false);
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: 'Please try again',
        position: 'left',
        visibilityTime: 4000,
      });
      refSupplier.current.close();
      setLoader(false);
      setRefreshing(false);
      console.log(error);
    }
  };

  return (
    <>
      <DeletePopUp
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
        title={'Are you sure you want to delete the supplier management?'}
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
              label={'Supplier Management'}
              isHamburger={true}
              onPress={() => props.navigation.openDrawer()}
            />

            {clearFilter ? null : (
              <SearchAnimated
                setSearchValue={setSearchValue}
                onPress={Search}
                loader={searchLoader}
                setFilterApply={setFilterApply}
                placeholder={'Search By Supplier Name'}
              />
            )}
            {Platform.OS === 'ios' ? (
              <Spacer height={Mixins.scaleSize(35)} />
            ) : (
              <Spacer height={Mixins.scaleSize(0)} />
            )}
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Spacer height={Mixins.scaleSize(30)} />
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
                      refSupplier.current.open();
                    }}>
                    <FilterSVGComponent />
                  </RippleEffect>

                  <RippleEffect
                    style={styles.createNewSupplierView}
                    onPress={() =>
                      props.navigation.navigate(
                        'CreateNewSupplierManagementScreen',
                      )
                    }>
                    <TextElement
                      fontType={'h9'}
                      textStyle={styles.createNewSupplierLabel}>
                      Add New Supplier
                    </TextElement>
                  </RippleEffect>
                </View>
              )}

              <Spacer height={Mixins.scaleSize(25)} />
              {searchLoader && clearFilter ? (
                <ActivityIndicator size="large" />
              ) : loader ? (
                <SkeletonLoader />
              ) : filterApply && searchValue ? (
                searchList?.length == 0 ? (
                  <EmptyList Message={'No Filte Supplier Found'} />
                ) : (
                  <View style={{paddingHorizontal: 16}}>
                    <FlatList
                      data={searchList}
                      renderItem={({item, index}) => (
                        <SupplierManagementCard
                          item={item}
                          key={index}
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
                    data={listing}
                    renderItem={({item, index}) => (
                      <SupplierManagementCard
                        item={item}
                        key={index}
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
              refRBSheet={refSupplier}
              height={Mixins.WINDOW_HEIGHT * 0.9}>
              <Formik
                onSubmit={values => SupplierManagementFilter(values)}
                initialValues={{
                  name: '',
                  location: '',
                  user_id: user?.id,
                }}>
                {formik => {
                  return (
                    <>
                      <View style={{width: Mixins.WINDOW_WIDTH}}>
                        <Spacer height={Mixins.scaleSize(20)} />
                        <View style={{alignItems: 'center'}}>
                          <TextElement fontType="h4">
                            {'Supplier Management'}
                          </TextElement>
                        </View>
                        <Spacer height={Mixins.scaleSize(30)} />
                        <View style={styles.inputRowsWrap}>
                          <InputTextComponent
                            placeholder={'Supplier Location'}
                            labelColor={'#E5E5E6'}
                            containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                            backgroundColor={'transparent'}
                            textInputColor={'#E5E5E6'}
                            autoCorrect={false}
                            formikError={formik.errors.location}
                            onChangeText={formik.handleChange('location')}
                            inputValue={formik.values.location}
                          />

                          <InputTextComponent
                            placeholder={'Supplier Name'}
                            labelColor={'#E5E5E6'}
                            containerWidth={Mixins.WINDOW_WIDTH / 2.3}
                            backgroundColor={'transparent'}
                            textInputColor={'#E5E5E6'}
                            autoCorrect={false}
                            formikError={formik.errors.name}
                            onChangeText={formik.handleChange('name')}
                            inputValue={formik.values.name}
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

export default SupplierManagementScreen;
