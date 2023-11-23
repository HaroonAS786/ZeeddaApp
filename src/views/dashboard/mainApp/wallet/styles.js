import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    headerWrapContainer: {
      backgroundColor: Colors.PRIMARY,
      height:
        Platform.OS === 'android'
          ? Mixins.WINDOW_HEIGHT * 0.46
          : Mixins.WINDOW_HEIGHT * 0.42,

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
    footerView: {
      flex: 4,
      paddingHorizontal: 16,
      backgroundColor: Colors.WHITE,
    },

    walletLabel: {
      color: Colors.WHITE,
    },
    availBalance: {
      color: Colors.WHITE,
    },
    amountLabel: {
      color: Colors.WHITE,
    },
    headerBody: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    walletWrap: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    walletFooterBtn: {
      width: 42,
      height: 42,
      borderRadius: 24,
      borderColor: Colors.WHITE,
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },

    walletCircleView: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    mainTop: {
      flex: 1,
      backgroundColor: 'white',
    },

    addNewOrder: {
      backgroundColor: Colors.YELLOW_PRIMARY,
      borderRadius: 5,
      width: Mixins.scaleSize(115),
      height: Mixins.scaleSize(30),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      marginEnd: 16,
    },

    addNewOrderLabel: {
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
