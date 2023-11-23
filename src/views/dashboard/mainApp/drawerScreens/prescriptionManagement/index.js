import React, {useState, useEffect} from 'react';
import {View, RefreshControl, FlatList} from 'react-native';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';
import {TextElement} from '../../../../../components/TextElement';
import ViewHeader from '../../../../../components/viewHeader';
import {Mixins} from '../../../../../styles';
import Prescriptions from './Prescriptions';
import getStyles from './styles';
import * as getPrescriptions from '../../../../../../services/api/prescription-management';
import * as healthHubApi from '../../../../../../services/api/hub-listing';
import SkeletonLoader from '../../../../../components/Loader';
import {useSelector} from 'react-redux';

const ViewPrescriptionManagement = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);

  const [activeTab, setActiveTab] = useState(1);
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [prescriptionLoader, setPrescriptionLoader] = useState(true);

  const handleTabPress = tabIndex => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    PrescriptionList();
  }, []);

  const PrescriptionList = async () => {
    try {
      setPrescriptionLoader(true);
      const prescriptionObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {result},
      } = await getPrescriptions?.getPrescriptions({prescriptionObject});
      if (success) {
        setPrescriptionList(result);
        setPrescriptionLoader(false);
        setRefreshing(false);
      }
    } catch (error) {
      setPrescriptionLoader(false);
      setRefreshing(false);
    }
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    PrescriptionList();
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
          <ViewHeader
            label={'Prescription Management'}
            isHeaderView2
            onPress={() => props.navigation.openDrawer()}
          />

          <Spacer height={Mixins.scaleSize(60)} />

          <View style={styles.container}>
            <RippleEffect onPress={() => handleTabPress(1)}>
              <TextElement
                fontType={'h6'}
                textStyle={
                  activeTab === 1 ? styles.activeLabel : styles.inActiveLabel
                }>
                Prescriptions
              </TextElement>
              <Spacer height={Mixins.scaleSize(6)} />
              {activeTab === 1 ? <View style={styles.viewLine} /> : <Spacer />}
            </RippleEffect>
          </View>

          <View style={styles.tabContent}>
            {activeTab === 1 && prescriptionLoader ? (
              <SkeletonLoader />
            ) : (
              <Prescriptions item={prescriptionList} />
            )}
          </View>

          <Spacer height={Mixins.scaleSize(60)} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ViewPrescriptionManagement;
