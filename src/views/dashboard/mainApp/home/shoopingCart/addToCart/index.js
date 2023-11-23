import {View, Text, Image, ImageBackground, Platform} from 'react-native';
import React from 'react';
import getStyles from './styles';
import HamBurgerSVGComponent from '../../../../../../assets/svgs/hamBurgerSvg';
import HeaderLogoComponent from '../../../../../../assets/svgs/HeaderLogo';
import {
  AddSVGComponent,
  BackArrow,
  CartSVGComponent,
  ReduceSVGComponent,
} from '../../../../../../assets/svgs';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import SummaryContext from '../../../myOrders/components/summaryContext';
import OrderSummaryContext from '../../components/orderSummaryContext';
import RippleEffect from '../../../../../../components/rippleEffect';
import ButtonComponent from '../../../../../../components/buttonComponent';
import CartHeader from '../../components/cartHeader';

const AddToCartScreen = props => {
  const styles = getStyles();
  return (
    <View style={styles.mainWrapContainer}>
      <ImageBackground
        style={styles.imageContainer}
        resizeMode="cover"
        source={{
          uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8fDB8fHww&w=1000&q=80',
        }}>
        {Platform.OS === 'ios' ? (
          <Spacer height={Mixins.scaleSize(50)} />
        ) : (
          <Spacer height={Mixins.scaleSize(20)} />
        )}
        <CartHeader onPress={() => props.navigation.goBack()} />
      </ImageBackground>
      <Spacer height={Mixins.scaleSize(20)} />
      <View style={{paddingHorizontal: 16}}>
        <TextElement fontType={'h5'} textStyle={{color: Colors.BLACK}}>
          24’ Inch furniture with bedside locker
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <TextElement fontType={'h8'} textStyle={{color: 'grey'}}>
          Available for order at prestige furniture,it can come in any colour of
          your choice,we give you high quality,neat finishing and best prices
        </TextElement>
        <Spacer height={Mixins.scaleSize(20)} />
        <OrderSummaryContext
          leftLabel={'Price :'}
          rightLabel={'₦15,000'}
          leftLabelStyle={{
            color: Colors.BLACK,
          }}
          leftFontSize={'h6'}
          rightLabelStyle={{color: Colors.YELLOW_PRIMARY}}
          rightFontSize={'h6'}
        />
        <Spacer height={Mixins.scaleSize(20)} />
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TextElement fontType={'h6'} textStyle={{color: Colors.BLACK}}>
            Quantity :
          </TextElement>
          <Spacer width={Mixins.scaleSize(20)} />
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <RippleEffect style={styles.circle}>
              <ReduceSVGComponent />
            </RippleEffect>
            <Spacer width={Mixins.scaleSize(8)} />
            <TextElement fontType={'h9'} textStyle={styles.checkoutLabel}>
              1
            </TextElement>
            <Spacer width={Mixins.scaleSize(8)} />
            <RippleEffect style={styles.circle}>
              <AddSVGComponent />
            </RippleEffect>
          </View>
        </View>
        <Spacer height={Mixins.scaleSize(20)} />
        <OrderSummaryContext
          leftLabel={'Quantity available: '}
          rightLabel={'100 items left'}
          leftLabelStyle={{color: Colors.BLACK}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: 'grey'}}
          rightFontSize={'h6'}
        />

        <Spacer height={Mixins.scaleSize(30)} />

        <RippleEffect
          style={styles.addToCartBtn}
          onPress={() => props.navigation.navigate('ProceedOrderScreen')}>
          <TextElement fontType={'h6'} textStyle={{color: 'white'}}>
            Add to cart
          </TextElement>
          <Spacer width={Mixins.scaleSize(10)} />
          <CartSVGComponent color={Colors.WHITE} width={24} height={24} />
        </RippleEffect>
      </View>
    </View>
  );
};

export default AddToCartScreen;
