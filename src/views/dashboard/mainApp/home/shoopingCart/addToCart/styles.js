import {Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {
      flex: 1,
    },

    imageContainer: {
      width: '100%',
      height: Mixins.WINDOW_HEIGHT * 0.3,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    circle: {
      width: 19,
      height: 19,
      borderRadius: 10,
      borderColor: 'lightgrey',
      borderWidth: 0.5,
      alignItems: 'center',

      justifyContent: 'center',
    },

    addToCartBtn: {
      backgroundColor: Colors.PRIMARY,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      height: Mixins.scaleSize(44),
      borderRadius: 5,
      width: '100%',
    },
  });
export default getStyles;
