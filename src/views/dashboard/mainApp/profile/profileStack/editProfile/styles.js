import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {
      backgroundColor: Colors.PRIMARY,
      height:
        Platform.OS === 'android'
          ? Mixins.WINDOW_HEIGHT * 0.22
          : Mixins.WINDOW_HEIGHT * 0.24,
    },
    updateBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },
    cameraStyle: {
      right: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backgroundColor: Colors.PRIMARY,
      width: 30,
      height: 30,
      borderRadius: 30,
    },

    mainWrap: {
      alignItems: 'center',
    },

    image: {
      borderRadius: 100,
      width: 100,
      height: 100,
    },
    editLabel: {
      color: Colors.BLACK,
    },
  });
export default getStyles;
