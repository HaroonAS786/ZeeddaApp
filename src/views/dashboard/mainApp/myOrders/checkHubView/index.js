import {View, Image, FlatList, Linking, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import getStyles from './styles';
import LayoutContainer from '../../../../../components/layoutContainer';
import Spacer from '../../../../../components/Spacer';
import {Colors, Mixins} from '../../../../../styles';
import {CartSVGComponent} from '../../../../../assets/svgs';
import RippleEffect from '../../../../../components/rippleEffect';
import {TextElement} from '../../../../../components/TextElement';
import AbsoluteVerifySVGComponent from '../../../../../assets/svgs/absoluteVerifySvg';
import HeaderContext from '../components/headerContext';
import ProductCard from '../components/productCard';
import AppStatusBar from '../../../../../components/appStatusBar';
import * as hubListing from '../../../../../../services/api/hub-listing';
import {useSelector} from 'react-redux';
import {IMAGES} from '../../../../../utils/asset';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SkeletonLoader from '../../../../../components/Loader';
import EmptyList from '../../../../../components/empty-list';

const CheckHubView = props => {
  const user = useSelector(state => state?.auth?.user);
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';
  const {item, B2BApi, HealthHubApi, TradeHubApi} = props?.route?.params;
  const styles = getStyles();

  useEffect(() => {
    hubDetail();
  }, []);
  const [productListing, setProductListing] = useState([]);
  const [productLoader, setProductLoader] = useState(true);

  const hubDetail = async () => {
    try {
      if (B2BApi) {
        B2BDetail();
      }
      if (HealthHubApi) {
        HealthHubDetail();
      }
      if (TradeHubApi) {
        TradeHubDetail();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const B2BDetail = async () => {
    try {
      const B2BObject = {
        shop_id: item?.id,
        user_id: user?.id,
      };

      const {
        data: {products, success},
      } = await hubListing?.getB2BHubDetail({B2BObject});
      if (success) {
        const filterProduct = products?.filter(
          item => item?.active != 0 || item?.quantity == 0,
        );
        setProductListing(filterProduct);
      }
      setProductLoader(false);
    } catch (error) {
      setProductLoader(false);
    }
  };

  const HealthHubDetail = async () => {
    try {
      const HealthHubObject = {
        shop_id: item?.id,
        user_id: user?.id,
      };

      const {
        data: {products, success},
      } = await hubListing?.getHealthHubDetail({HealthHubObject});
      if (success) {
        const filterProduct = products?.filter(
          item => item?.active != 0 || item?.quantity == 0,
        );
        setProductListing(filterProduct);
      }
      setProductLoader(false);
    } catch (error) {
      setProductLoader(false);
    }
  };

  const TradeHubDetail = async () => {
    try {
      const TradeObject = {
        shop_id: item?.id,
        user_id: user?.id,
      };

      const {
        data: {products, success},
      } = await hubListing?.getTradeHubDetail({TradeObject});
      if (success) {
        const filterProduct = products?.filter(
          item => item?.active != 0 && item?.quantity != 0,
        );
        console.log('filterProduct', products);
        setProductListing(filterProduct);
      }
      setProductLoader(false);
    } catch (error) {
      setProductLoader(false);
    }
  };
  const renderSeparator = () => {
    return <View style={styles.divider} />;
  };

  const emailLink = item?.shop_email;
  const facebookLink = item?.facebook_url;
  const twitterLink = item?.twitter_url;
  const whatsAppLink = item?.shop_whatsapp;
  const checkoutItem = useSelector(state => state?.auth?.item);

  return (
    <LayoutContainer
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <AppStatusBar backgroundColor={Colors.PRIMARY} barStyle="light-content" />

      <RippleEffect
        style={styles.cartView}
        onPress={() => props.navigation.navigate('ProceedOrderScreen')}>
        <CartSVGComponent />
        <Text
          style={{
            fontSize: 15,
            color: '#fff',
            backgroundColor: Colors.PRIMARY,
            width: 20,
            height: 20,
            borderRadius: 50,
            textAlign: 'center',
            marginTop: -20,
            marginRight: -5,
          }}>
          {checkoutItem?.length}
        </Text>
      </RippleEffect>
      <Spacer height={Mixins.scaleSize(14)} />
      <>
        <View style={styles.imgCon}>
          <Image
            source={{uri: baseUrl + item?.shop_picture}}
            style={{width: 60, height: 60}}
          />
        </View>
        <Spacer height={Mixins.scaleSize(14)} />
        <View style={styles.contentView}>
          <TextElement fontType={'h6'} textStyle={styles.label}>
            {item?.shop_title}
          </TextElement>
          <Spacer width={Mixins.scaleSize(8)} />
          <AbsoluteVerifySVGComponent />
        </View>
        <Spacer height={Mixins.scaleSize(6)} />
        <TextElement fontType={'h6'} textStyle={styles.desc}>
          {item?.shop_tagline}
        </TextElement>
      </>
      <View style={{flexDirection: 'row', width: '90%', marginTop: 20}}>
        <TouchableOpacity onPress={() => Linking.openURL(facebookLink)}>
          <Image
            source={IMAGES?.facebook}
            style={{width: 35, height: 35, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${emailLink}`)}>
          <Image
            source={IMAGES?.email}
            style={{width: 35, height: 35, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(twitterLink)}>
          <Image
            source={IMAGES?.twitter}
            style={{width: 35, height: 35, marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${whatsAppLink}`)}>
          <Image
            source={IMAGES?.whatsapp}
            style={{width: 35, height: 35, marginRight: 10}}
          />
        </TouchableOpacity>
      </View>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={styles.footerView}>
        <HeaderContext leftLabel={'Products'} />
        {productLoader ? (
          <SkeletonLoader />
        ) : (
          <View>
            {productListing?.length == 0 ? (
              <EmptyList Message={'No Product Found'} />
            ) : (
              <FlatList
                data={productListing}
                ItemSeparatorComponent={renderSeparator}
                renderItem={({item, index}) => (
                  <ProductCard item={item} index={index} />
                )}
              />
            )}
          </View>
        )}
      </View>
    </LayoutContainer>
  );
};

export default CheckHubView;
