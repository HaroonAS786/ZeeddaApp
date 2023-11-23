import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrap: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },

    createNewDiscount: {
      backgroundColor: Colors.YELLOW_PRIMARY,
      borderRadius: 5,
      width: Mixins.scaleSize(120),
      height: Mixins.scaleSize(30),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      marginEnd: 16,
    },

    createNewDiscountLabel: {
      color: Colors.WHITE,
    },
  });
export default getStyles;
