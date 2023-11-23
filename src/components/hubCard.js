import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../styles';
import {RatingHubSVGComponent} from '../assets/svgs';
import {TextElement} from './TextElement';
import Spacer from './Spacer';

const HubCardItem = ({item}) => {
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';

  return (
    <View style={styles.container}>
      <Image
        source={{uri: baseUrl + item?.shop_picture}}
        resizeMode={'cover'}
        style={styles.image}
      />
      <Spacer height={Mixins.scaleSize(14)} />
      <View>
        <View style={styles.nameCont}>
          <TextElement fontType={'h6'} textStyle={styles.name}>
            {item?.shop_title}
          </TextElement>
          <RatingHubSVGComponent />
        </View>
        <TextElement fontType={'h9'} textStyle={styles.country}>
          {item?.shop_location}
        </TextElement>
      </View>
    </View>
  );
};

export default HubCardItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  image: {
    width: Mixins.scaleSize(100),
    height: Mixins.scaleSize(100),
  },

  name: {
    color: Colors.BLACK,
  },
  country: {
    color: 'lightgrey',
  },
  nameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
