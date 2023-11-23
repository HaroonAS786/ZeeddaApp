import {View, StyleSheet} from 'react-native';
import React from 'react';
import {HeaderLogo} from '../assets/svgs';
import {TextElement} from './TextElement';
import {Colors, Mixins} from '../styles';
import Spacer from './Spacer';
import {wp} from '../styles/responsive';

const AuthenticationHeaderContext = ({
  label1,
  label2,
  label11,
  isOtp,
  label22,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <TextElement fontType={'h2'}>{label1}</TextElement>
        {isOtp && <Spacer width={wp(2)} />}
        <TextElement fontType={'h2'} textStyle={styles.label1SubStringView}>
          {label11}
        </TextElement>
      </View>
      <Spacer height={wp(4)} />

      <TextElement fontType={'h7'} textStyle={styles.label2View}>
        {label2}{' '}
        <TextElement fontType={'h7'} textStyle={styles.label22View}>
          {label22}
        </TextElement>
      </TextElement>
    </View>
  );
};

export default AuthenticationHeaderContext;

export const styles = StyleSheet.create({
  container: {
    width: Mixins.WINDOW_WIDTH,
    paddingHorizontal: 16,
  },

  labelContainer: {
    flexDirection: 'row',
  },

  label1SubStringView: {
    color: Colors.PRIMARY,
  },

  label2View: {
    color: 'rgba(167, 169, 183, 1)',
    width: '79%',
  },
  label22View: {
    color: '#000',
  },
});
