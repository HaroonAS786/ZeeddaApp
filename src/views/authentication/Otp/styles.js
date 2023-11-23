import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../styles';
import {normalize} from '../../../styles/responsive';

const getStyles = () =>
  StyleSheet.create({
    submitBtn: {
      width: Mixins.WINDOW_WIDTH / 1.2,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 10,
    },
    notActiveSubmitBtn: {
      width: Mixins.WINDOW_WIDTH / 1.2,
      borderColor: 'lightgrey',
      backgroundColor: 'lightgrey',
      borderRadius: 10,
    },

    dontRecieveCodeView: {
      flexDirection: 'row',
    },
    dontRecieveCodeText: {
      color: Colors.BLACK,

      fontWeight: '300',
    },

    resend: {
      color: Colors.ORANGE_TEXT,
    },
    registeredText: {
      color: Colors.PRIMARY,
      fontWeight: '400',
    },
    registeredTextDesc: {
      color: '#A7A9B7',
      fontWeight: '400',
      textAlign: 'center',
      width: Mixins.WINDOW_WIDTH / 1.2,
    },

    registeredCon: {
      position: 'absolute',
      backgroundColor: Colors.WHITE,
      width: Mixins.WINDOW_WIDTH,
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
  });
export default getStyles;
