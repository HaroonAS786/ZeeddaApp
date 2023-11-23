import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {
      backgroundColor: Colors.PRIMARY,
      height:
        Platform.OS === 'android'
          ? Mixins.WINDOW_HEIGHT * 0.22
          : Mixins.WINDOW_HEIGHT * 0.24,
    },

    forgotView: {
      alignItems: 'flex-end',
    },
    forgotLabel: {
      color: '#A7A9B7',
      fontWeight: '800',
    },
    updateBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },
  });
export default getStyles;
