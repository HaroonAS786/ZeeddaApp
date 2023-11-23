import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import getStyles from './styles';
import {OrderSuccessSVGComponent} from '../../../../../../assets/svgs';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';

const OrderCompleteScreen = props => {
  const styles = getStyles();

  useEffect(() => {
    setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'DrawerStack'}],
      });
    }, 3000);
  }, []);
  return (
    <View style={styles.mainWrapContainer}>
      <View style={styles.circle}>
        <OrderSuccessSVGComponent />
      </View>
      <Spacer height={Mixins.scaleSize(20)} />
      <TextElement fontType={'h2'} textStyle={{color: Colors.BLACK}}>
        Order Successful !
      </TextElement>
      <Spacer height={Mixins.scaleSize(20)} />
      <TextElement
        fontType={'h7'}
        textStyle={{
          color: 'black',
          textAlign: 'center',
          width: Mixins.scaleSize(300),
        }}>
        A delivery request is been sent to a delivery man with the vicinity
      </TextElement>
    </View>
  );
};

export default OrderCompleteScreen;
