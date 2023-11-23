import {View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import getStyles from './styles';
import HeaderContext from '../components/headerContext';
import ProductCard from '../components/productCard';
import Spacer from '../../../../../components/Spacer';
import {Mixins} from '../../../../../styles';
import LayoutContainer from '../../../../../components/layoutContainer';
import * as productApi from '../../../../../../services/api/product';
import {useSelector} from 'react-redux';

const SellAllProductHubs = props => {
  const user = useSelector(state => state?.auth?.user);
  const [listing, setListing] = useState([]);
  const styles = getStyles();

  const renderSeparator = () => {
    return <View style={styles.divider} />;
  };

  useEffect(() => {
    (async () => {
      try {
        let {data} = await productApi.getProduct({user_id: user?.id});
        setListing(data.result);
      } catch (error) {
        console.log('Error', error);
      }
    })();
  }, []);
  return (
    <LayoutContainer
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <View style={styles.footerView}>
        <Spacer height={Mixins.scaleSize(20)} />
        <HeaderContext leftLabel={'Products'} />
        <View>
          <FlatList
            data={listing}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({item, index}) => (
              <ProductCard item={item} index={index} />
            )}
          />
        </View>
      </View>
    </LayoutContainer>
  );
};

export default SellAllProductHubs;
