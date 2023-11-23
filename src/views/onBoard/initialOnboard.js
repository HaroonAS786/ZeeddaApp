import React from 'react';
import {Platform, View} from 'react-native';
import {CheckInSVGComponent, InitialLogoSVGComponent} from '../../assets/svgs';
import HeaderLogoComponent from '../../assets/svgs/HeaderLogo';
import AppStatusBar from '../../components/appStatusBar';
import ButtonBtnRow from '../../components/bottomBtnRow';
import ButtonComponent from '../../components/buttonComponent';
import Spacer from '../../components/Spacer';
import {TextElement} from '../../components/TextElement';
import {Colors, Mixins} from '../../styles';
import {initialPickupData} from '../../utils/helper';
import getStyles from './styles';

const InitialOnboard = props => {
  const styles = getStyles();
  return (
    <View style={styles.initialWrapCon}>
      <AppStatusBar hidden={true} />

      {Platform.OS === 'ios' && <Spacer height={Mixins.scaleSize(50)} />}
      <HeaderLogoComponent />
      <Spacer height={Mixins.scaleSize(20)} />
      <InitialLogoSVGComponent />
      <Spacer height={Mixins.scaleSize(14)} />
      <TextElement fontType={'h2'} textStyle={styles.pickUpLabel}>
        We’ll pick up and deliver almost anything
      </TextElement>
      <Spacer height={Mixins.scaleSize(12)} />
      {initialPickupData.map((value, index) => (
        <View style={styles.description} key={index}>
          <CheckInSVGComponent />
          <Spacer width={Mixins.scaleSize(8)} />
          <TextElement fontType={'h5'} textStyle={styles.content}>
            {value.label}
          </TextElement>
        </View>
      ))}
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={styles.contentCon}>
        <TextElement fontType={'h5'} textStyle={styles.content}>
          Make sure any orders are paid. If a code for pick up is required,
          please enter it in a note for a driver
        </TextElement>
      </View>

      {/* <Spacer height={Mixins.scaleSize(60)} /> */}

      <ButtonBtnRow>
        <ButtonComponent
          buttonTitle={'Continue'}
          style={styles.continueBtn}
          rippleColor={Colors.WHITE}
          titleColor={Colors.WHITE}
          onPress={() => {
            props.navigation.navigate('OnBoarding');
          }}
        />

        {Platform.OS === 'ios' && <Spacer height={Mixins.scaleSize(20)} />}
      </ButtonBtnRow>
    </View>
  );
};

export default InitialOnboard;
