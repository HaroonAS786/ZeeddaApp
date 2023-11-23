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

    viewLine: {
      width: 24,
      height: 1.5,
      borderRadius: 3,
      backgroundColor: Colors.PRIMARY,
      alignSelf: 'center',
    },

    container: {
      width: Mixins.WINDOW_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },

    activeLabel: {
      color: Colors.PRIMARY,
      textAlign: 'center',
      fontWeight: '500',
    },

    inActiveLabel: {
      color: 'rgba(0, 0, 0, 0.32)',
      textAlign: 'center',
      fontWeight: '500',
    },

    tabContent: {
      flex: 1,
    },
  });
export default getStyles;
