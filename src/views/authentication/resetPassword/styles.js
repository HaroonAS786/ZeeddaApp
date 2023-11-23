import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../styles';
import {normalize} from '../../../styles/responsive';

const getStyles = () =>
  StyleSheet.create({
    continue: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },
  });
export default getStyles;
