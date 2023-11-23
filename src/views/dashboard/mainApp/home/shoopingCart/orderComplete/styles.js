import {Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.WHITE,
    },

    circle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 153,
      height: 153,
      borderRadius: 100,
      backgroundColor: '#25B900',
    },
  });
export default getStyles;
