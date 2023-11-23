import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../styles';

const getStyles = () =>
  StyleSheet.create({
    continueBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },
  });
export default getStyles;
