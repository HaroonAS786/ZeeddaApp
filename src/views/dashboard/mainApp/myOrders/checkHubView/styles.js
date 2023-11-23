import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainTop: {
      flex: 1,
      backgroundColor: 'white',
    },

    cartView: {
      alignItems: 'flex-end',
      paddingRight: 18,
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      // width: '100%',
    },

    imgCon: {
      width: 85,
      height: 85,
      borderRadius: 100,
      borderColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
    },
    contentView: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    label: {
      color: Colors.BLACK,
    },
    desc: {
      color: 'grey',
      textAlign: 'center',
      width: '90%',
    },
    footerView: {
      width: '100%',
      paddingHorizontal: 6,
    },

    divider: {
      width: Mixins.WINDOW_WIDTH,
      backgroundColor: 'lightgrey',
      height: 0.5,
    },
  });
export default getStyles;
