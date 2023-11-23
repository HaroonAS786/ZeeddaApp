import React, {useState, useEffect} from 'react';
import {View, FlatList, ScrollView} from 'react-native';
import getStyles from './styles';
import ViewHeader from '../../../../../components/viewHeader';
import Spacer from '../../../../../components/Spacer';
import {Mixins} from '../../../../../styles';
import HeaderContext from '../components/headerContext';
import HubCardItem from '../../../../../components/hubCard';
import SkeletonLoader from '../../../../../components/Loader';
import {useSelector} from 'react-redux';
import * as hubApi from '../../../../../../services/api/hub-listing';

const OrderHubsScreen = props => {
  const styles = getStyles();
  const user = useSelector(state => state?.auth?.user);

  const [b2BtListing, seB2BtListing] = useState([]);
  const [healHubListing, setHealHubListing] = useState([]);
  const [tradeListing, setTradeListing] = useState([]);
  const [b2BLoader, setB2BLoader] = useState(true);
  const [tradeLoader, setTradeLoader] = useState(true);
  const [healthLoader, setHealthLoader] = useState(true);

  useEffect(() => {
    B2BListing();
    HealthHubList();
    TradeHubList();
  }, []);

  const B2BListing = async () => {
    try {
      const B2BObject = {
        user_id: user?.id,
      };
      const {
        data: {success},
        data: {shops},
      } = await hubApi.getB2BHubListing({B2BObject});
      if (success) {
        seB2BtListing(shops?.splice(0, 2));
        setB2BLoader(false);
      }
    } catch (error) {
      setB2BLoader(false);
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
      } = await hubApi.getHealthHubListing({HealthHubObject});
      if (success) {
        setHealHubListing(shops?.splice(0, 2));
        setHealthLoader(false);
      }
    } catch (error) {
      setHealthLoader(false);
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
      } = await hubApi.getTradeHubListing({TradeObject});
      if (success) {
        setTradeListing(shops?.splice(0, 2));
        setTradeLoader(false);
      }
    } catch (error) {
      setTradeLoader(false);
    }
  };

  return (
    <View style={styles.mainTop}>
      <ViewHeader
        label={'ZEEDDA HUB'}
        isHamburger={true}
        onPress={() => {
          props.navigation.openDrawer();
        }}
      />
      <Spacer height={Mixins.scaleSize(40)} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={Mixins.scaleSize(40)} />

        <HeaderContext
          leftLabel={'Trade HUB'}
          rightLabel={'Go to Trade Hub'}
          rightLabelPress={() =>
            props.navigation.navigate('ViewHubsScreen', {
              hubLabel: 'Trade HUB',
              TradeHubApi: true,
            })
          }
        />
        <Spacer height={Mixins.scaleSize(40)} />
        <View>
          {tradeLoader ? (
            <SkeletonLoader />
          ) : (
            <>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={tradeListing}
                renderItem={({item, index}) => <HubCardItem item={item} />}
              />
            </>
          )}
        </View>
        <Spacer height={Mixins.scaleSize(40)} />

        <HeaderContext
          leftLabel={'Health Hub'}
          rightLabel={'Go to Health Hub'}
          rightLabelPress={() =>
            props.navigation.navigate('ViewHubsScreen', {
              hubLabel: 'Health HUB',
              HealthHubApi: true,
            })
          }
        />
        <Spacer height={Mixins.scaleSize(40)} />

        {healthLoader ? (
          <SkeletonLoader />
        ) : (
          <>
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={healHubListing}
                renderItem={({item, index}) => <HubCardItem item={item} />}
              />
            </View>
          </>
        )}
        <Spacer height={Mixins.scaleSize(40)} />

        <HeaderContext
          leftLabel={'B2B HUB'}
          rightLabel={'Go to B2B Hub'}
          rightLabelPress={() =>
            props.navigation.navigate('ViewHubsScreen', {
              hubLabel: 'B2B HUB',
              B2BApi: true,
            })
          }
        />
        <Spacer height={Mixins.scaleSize(40)} />
        <View>
          {b2BLoader ? (
            <SkeletonLoader />
          ) : (
            <>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={b2BtListing}
                renderItem={({item, index}) => <HubCardItem item={item} />}
              />
            </>
          )}
        </View>
        <Spacer height={Mixins.scaleSize(40)} />
      </ScrollView>
    </View>
  );
};

export default OrderHubsScreen;
