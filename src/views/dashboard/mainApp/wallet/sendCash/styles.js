import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';
import {WINDOW_WIDTH} from '../../../../../styles/mixins';

const getStyles = () =>
  StyleSheet.create({
    mainWrap: {
      backgroundColor: Colors.WHITE,
    },
    mainTop: {
      backgroundColor: Colors.WHITE,
    },

    sendLabel: {
      color: Colors.BLACK,
    },
    walletBalanceBox: {
      backgroundColor: Colors.PRIMARY,
      width: Mixins.WINDOW_WIDTH / 1.1,
      height: Mixins.scaleSize(96),
      borderRadius: 5,
      paddingHorizontal: 16,

      justifyContent: 'flex-start',
    },

    contentLabel: {
      color: Colors.WHITE,
    },

    fundsAdded: {
      color: Colors.PRIMARY,
    },
    continueBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },
    disabledContinueBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: 'lightgrey',
      backgroundColor: 'lightgrey',
    },

    addPaymentView: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      height: Mixins.scaleSize(42),
      borderColor: '#F3F3F3',
      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },

    activeSelectPaymentView: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      height: Mixins.scaleSize(70),
      justifyContent: 'space-between',
      borderColor: '#000',

      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    inActiveSelectPaymentView: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      height: Mixins.scaleSize(70),
      justifyContent: 'space-between',
      borderColor: 'lightgrey',

      borderRadius: 12,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },

    rectangle: {
      width: Mixins.scaleSize(50),
      height: Mixins.scaleSize(50),
      borderRadius: 10,
      backgroundColor: '#F2F4F9',
      justifyContent: 'center',
      alignItems: 'center',
    },

    leftView: {
      flexDirection: 'row',
    },

    paymentCardTitle: {
      color: Colors.BLACK,
    },
    paymentCardNumber: {
      color: '#A7A9B7',
      fontWeight: '600',
    },

    paymentSuccessView: {
      position: 'absolute',
      backgroundColor: Colors.WHITE,
      width: Mixins.WINDOW_WIDTH,
      paddingHorizontal: 16,
      height: Mixins.WINDOW_HEIGHT * 0.5,
      alignItems: 'center',
      top: Mixins.scaleSize(240),

      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.6,
      shadowRadius: 2.0,

      elevation: 24,
    },

    topSuccessLabel: {
      color: Colors.BLACK,
      fontWeight: '400',
    },
    topSuccessDescLabel: {
      color: '#A7A9B7',
      fontWeight: '400',
      textAlign: 'center',
      width: Mixins.WINDOW_WIDTH / 1.2,
    },
  });
export default getStyles;
