import React from 'react';
import {View} from 'react-native';
import ButtonComponent from '../../../../../../components/buttonComponent';
import LayoutContainer from '../../../../../../components/layoutContainer';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';
import OrderIDCard from '../../../myOrders/components/orderIdCard';
import SummaryContext from '../../../myOrders/components/summaryContext';
import getStyles from './styles';

const ProceedOrderScreen = props => {
  const styles = getStyles();

  return (
    <LayoutContainer
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(40)} />

      <View
        style={{
          justifyContent: 'flex-start',
          width: '100%',
          paddingHorizontal: 16,
        }}>
        <TextElement fontType={'h4'} textStyle={{color: 'grey'}}>
          Order ID #63472
        </TextElement>

        <OrderIDCard />
        <Spacer height={Mixins.scaleSize(30)} />

        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          Order Details
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <View>
          <SummaryContext
            leftLabel={'Payment mode'}
            rightLabel={'Online Payment'}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Customer Name'}
            rightLabel={'George Newton'}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Customer ID'}
            rightLabel={'REY2345'}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Quatity'}
            rightLabel={'1 pcs'}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{color: Colors.PRIMARY}}
            rightFontSize={'h6'}
          />
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Shipping Address'}
            rightLabel={'33, Akintade Street, Ikeja Lagos State  '}
            leftLabelStyle={{color: 'grey'}}
            leftFontSize={'h6'}
            rightLabelStyle={{
              color: Colors.PRIMARY,
              width: 170,
              textAlign: 'right',
            }}
            rightFontSize={'h6'}
          />
        </View>
        <Spacer height={Mixins.scaleSize(40)} />
        <ButtonComponent
          buttonTitle={'Place Order'}
          style={styles.proceedBtn}
          rippleColor={Colors.WHITE}
          titleColor={Colors.WHITE}
          onPress={() => {
            props.navigation.navigate('OrderCompleteScreen');
          }}
        />
      </View>
    </LayoutContainer>
  );
};

export default ProceedOrderScreen;
