import {Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {
      backgroundColor: Colors.PRIMARY,
      height:
        Platform.OS === 'android'
          ? Mixins.WINDOW_HEIGHT * 0.27
          : Mixins.WINDOW_HEIGHT * 0.22,

      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      paddingHorizontal: 16,
    },

    view1: {
      flex: 2,
    },
    view2: {
      flex: 3,
    },

    userNameLabel: {color: Colors.BLACK},
    userEmailLabel: {color: Colors.BLACK, opacity: 0.4},
    mainTopCont: {
      backgroundColor: Colors.WHITE,
      flex: 1,
    },
    contentView: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    centerBody: {
      width: '90%',
      marginStart: 20,
    },
  });
export default getStyles;
