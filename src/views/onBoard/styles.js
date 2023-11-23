import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../styles';
import {Font} from '../../styles/font';

const getStyles = () =>
  StyleSheet.create({
    mainContainer: {
      width: Mixins.WINDOW_WIDTH,
      height: Mixins.WINDOW_HEIGHT,
    },
    image: {
      width: '100%',
      height: '100%',

      flex: 1,
    },

    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    subTitle1: {
      color: Colors.WHITE,
      width: Mixins.WINDOW_WIDTH / 1.3,

      fontWeight: '700',
      fontSize: 20,
      textAlign: 'center',
    },
    imageView: {
      height: Mixins.WINDOW_HEIGHT,
      width: Mixins.WINDOW_WIDTH,
      backgroundColor: '#2E4053',

      flex: 1,
    },
    subTitle2: {
      fontSize: 14,
      color: Colors.WHITE,
      width: Mixins.WINDOW_WIDTH / 1.5,
      textAlign: 'center',
      fontWeight: '400',
    },

    boxContainer: {
      position: 'absolute',
      height: '36%',
      width: '94%',

      zIndex: 999,
      bottom: 40,
      left: 16,
      borderRadius: 20,

      alignItems: 'center',

      backgroundColor: Colors.PRIMARY,
    },

    footerContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
      width: Mixins.WINDOW_WIDTH / 1.2,
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    skipView: {
      fontSize: 14,
      color: Colors.WHITE,
      padding: 4,
    },
    nextView: {
      fontSize: 14,
      color: Colors.WHITE,
      padding: 4,
    },

    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 6,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#ccc',
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#fff',
      width: 36,
    },

    getStartedBtnView: {
      width: Mixins.WINDOW_WIDTH / 1.2,
      borderColor: Colors.WHITE,
      backgroundColor: 'white',
      marginBottom: 10,
    },

    initialWrapCon: {
      backgroundColor: Colors.WHITE,
      flex: 1,
      paddingHorizontal: 16,
      alignItems: 'center',
      height: Mixins.WINDOW_HEIGHT,
    },

    description: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 25,
      width: Mixins.WINDOW_WIDTH,
      marginTop: 10,
    },
    continueBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },

    pickUpLabel: {
      color: '#002251',
      fontWeight: '600',
    },
    content: {
      color: '#002251',
    },

    contentCon: {
      paddingHorizontal: 4,
    },
  });
export default getStyles;
