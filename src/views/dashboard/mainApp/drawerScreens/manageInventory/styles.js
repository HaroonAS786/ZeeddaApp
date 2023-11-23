import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrap: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },

    addNewInventory: {
      backgroundColor: Colors.YELLOW_PRIMARY,
      borderRadius: 5,
      width: Mixins.scaleSize(115),
      height: Mixins.scaleSize(30),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      marginEnd: 16,
    },

    addNewInventoryLabel: {
      color: Colors.WHITE,
    },
  });
export default getStyles;
