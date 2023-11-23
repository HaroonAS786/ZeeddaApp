import {Dimensions, Platform, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrapContainer: {
      backgroundColor: Colors.PRIMARY,
      height:
        Platform.OS === 'android'
          ? Mixins.WINDOW_HEIGHT * 0.23
          : Mixins.WINDOW_HEIGHT * 0.24,
    },
    topMainWrapContainer: {
      backgroundColor: Colors.WHITE,
      flex: 1,
    },

    drawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 250, // Adjust the width of the drawer as needed
      height: '100%',
      backgroundColor: 'grey',
      padding: 16,
      zIndex: 999,
    },

    bannerViewContainer: {
      paddingHorizontal: Mixins.scaleSize(12),
    },
    bannerWrap: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      width: '100%',
      height: 190,
    },
    dot: {
      backgroundColor: '#D2D1D2',
      width: 4,
      height: 4,
      borderRadius: 2,
      margin: 2,
    },
    activeDot: {
      backgroundColor: Colors.PRIMARY,
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 2,
    },
  });
export default getStyles;
