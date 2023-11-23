import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../styles';

const getStyles = () =>
  StyleSheet.create({
    firstLastNameContainer: {
      flexDirection: 'row',
      width: Mixins.WINDOW_WIDTH / 1.1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    continueBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },

    customerLabel: {
      backgroundColor: 'background: rgba(217, 217, 217, 1)',
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderRadius: 10,
      width: Mixins.WINDOW_WIDTH / 1.1,
      height: Mixins.scaleSize(35),
    },

    alredayHaveAnAccountCon: {
      flexDirection: 'row',
    },
    alredayHaveAnAccountLabel: {
      color: Colors.BLACK,

      fontWeight: '300',
    },

    signInLabel: {
      color: Colors.ORANGE_TEXT,
    },

    errorlabelContainer: {
      width: Mixins.scaleSize(120),

      marginTop: Mixins.scaleSize(5),
    },

    dropDownErrorlabelContainer: {
      width: Mixins.WINDOW_WIDTH / 1.1,

      marginTop: Mixins.scaleSize(5),
    },

    errorLabel: {
      fontSize: 12,

      fontWeight: '400',
      color: 'red',
    },
  });
export default getStyles;
