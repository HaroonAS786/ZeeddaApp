import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../styles';

const getStyles = () =>
  StyleSheet.create({
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
    mainWrap: {
      backgroundColor: Colors.WHITE,
      width: '100%',
      paddingVertical: 10,
      marginTop: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.07)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
    quantityLabel: {
      color: 'black',
      fontWeight: '400',
    },
    label: {
      color: 'lightgrey',
      fontWeight: '400',
    },
    trackLabel: {
      color: 'white',
      fontWeight: '400',
    },
    title: {
      color: Colors.BLACK,
      fontWeight: '400',
      width: 170,
    },
    desc: {
      color: '#25B900',
      fontWeight: '400',
    },
    amount: {
      color: Colors.PRIMARY,
      fontWeight: '400',
    },
    topHeader: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingTop: 6,
      justifyContent: 'space-between',
    },
    viewOrder: {
      width: Mixins.scaleSize(68),
      height: Mixins.scaleSize(22),
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.PRIMARY,
    },
    image: {
      width: Mixins.scaleSize(70),
      height: Mixins.scaleSize(60),
      borderRadius: 10,
    },
    contentCont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftView: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  });
export default getStyles;
