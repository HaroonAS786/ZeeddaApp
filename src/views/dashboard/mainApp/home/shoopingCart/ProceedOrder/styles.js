import {Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {},

    divider: {
      width: Mixins.WINDOW_WIDTH,
      backgroundColor: 'lightgrey',
      height: 0.5,
    },

    proceedBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
      marginBottom: 10,
    },
  });
export default getStyles;
