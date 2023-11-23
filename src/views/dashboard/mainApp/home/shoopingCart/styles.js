import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';
// import {Colors, Mixins} from '../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainTop: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: 'white',
    },

    body: {
      height: '100%',
      marginHorizontal: 16,
      backgroundColor: Colors.WHITE,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: 'grey',
      paddingHorizontal: 16,
    },

    shippingLabel: {
      color: 'grey',
    },

    checkoutLabel: {
      color: Colors.WHITE,
    },

    checkoutView: {
      backgroundColor: Colors.YELLOW_PRIMARY,
      width: Mixins.scaleSize(85),
      height: Mixins.scaleSize(32),
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },
  });
export default getStyles;
