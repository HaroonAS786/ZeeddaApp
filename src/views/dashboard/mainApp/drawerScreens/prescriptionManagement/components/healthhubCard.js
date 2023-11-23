import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Colors, Mixins} from '../../../../../../styles';
import {
  NigerianHubSVGComponent,
  VerifiedSVGComponent,
} from '../../../../../../assets/svgs';
import {TextElement} from '../../../../../../components/TextElement';
import Spacer from '../../../../../../components/Spacer';
import RippleEffect from '../../../../../../components/rippleEffect';

const HealthHubCard = ({item, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.imgCon}
          resizeMode={'cover'}
          source={{
            uri: 'https://www.shutterstock.com/image-photo/medical-tourism-concept-health-international-600w-2274832169.jpg',
          }}
        />

        <Spacer width={Mixins.scaleSize(12)} />
        <View>
          <TextElement fontType={'h6'} textStyle={styles.label}>
            {item?.shop_title}
          </TextElement>
          <Spacer height={Mixins.scaleSize(16)} />
          <View style={styles.leftSubView}>
            <NigerianHubSVGComponent />
            <Spacer width={Mixins.scaleSize(6)} />
            <TextElement fontType={'h8'} textStyle={styles.label}>
              {item?.shop_location}
            </TextElement>
          </View>
        </View>
      </View>
      <View style={styles.rightViewCon}>
        <VerifiedSVGComponent />
        <TextElement fontType={'h9'} textStyle={styles.label}>
          Verified
        </TextElement>
        <Spacer height={Mixins.scaleSize(16)} />
        <RippleEffect style={styles.viewCon} onPress={onPress}>
          <TextElement fontType={'h9'} textStyle={styles.viewlabel}>
            View
          </TextElement>
        </RippleEffect>
      </View>
    </View>
  );
};

export default HealthHubCard;

const styles = StyleSheet.create({
  container: {
    height: Mixins.scaleSize(114),
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 12,
  },

  imgCon: {
    height: Mixins.scaleSize(67),
    width: Mixins.scaleSize(82),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },

  viewCon: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    width: Mixins.scaleSize(47),
    height: Mixins.scaleSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightViewCon: {alignItems: 'center'},

  leftSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewlabel: {
    color: Colors.WHITE,
  },

  label: {
    color: Colors.BLACK,
  },
});
