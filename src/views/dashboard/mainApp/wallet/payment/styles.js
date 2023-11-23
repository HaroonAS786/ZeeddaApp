import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';
import {WINDOW_WIDTH} from '../../../../../styles/mixins';

const getStyles = () =>
  StyleSheet.create({
    mainWrap: {
      backgroundColor: Colors.PRIMARY,
      height:
        Platform.OS === 'android'
          ? Mixins.WINDOW_HEIGHT * 0.2
          : Mixins.WINDOW_HEIGHT * 0.22,

      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      paddingHorizontal: 16,
    },

    mainTop: {
      backgroundColor: Colors.WHITE,
      flex: 1,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    paymentLabel: {
      color: Colors.WHITE,
    },

    headerBody: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    footerView: {
      flex: 4,
      paddingHorizontal: 16,
      backgroundColor: Colors.WHITE,
    },
  });
export default getStyles;
