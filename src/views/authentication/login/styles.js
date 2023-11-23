import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../styles';

const getStyles = () =>
  StyleSheet.create({
    forgotPassword: {
      color: Colors.ORANGE_TEXT,
      fontWeight: '600',
    },

    forgotPasswordContainer: {
      alignItems: 'flex-end',
      width: Mixins.WINDOW_WIDTH,
      paddingHorizontal: 16,
    },
    loginBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },

    socialBtnContainer: {
      flexDirection: 'row',
      width: Mixins.WINDOW_WIDTH / 1.1,
      alignItems: 'center',
      justifyContent: 'center',
      //   justifyContent: 'space-evenly',
    },

    continueText: {
      color: 'background: rgba(0, 0, 0, 0.51)',
      fontWeight: '400',
    },

    dontSignUpView: {
      flexDirection: 'row',
    },
    dontAccountText: {
      color: Colors.BLACK,

      fontWeight: '300',
    },

    signUpLabel: {
      color: Colors.ORANGE_TEXT,
    },
  });
export default getStyles;
