import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrap: {},

    uploadProductCont: {
      width: Mixins.scaleSize(278),
      height: Mixins.scaleSize(122),
      borderColor: 'grey',
      borderStyle: 'dashed',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    createShopBtn: {
      width: Mixins.WINDOW_WIDTH / 1.1,
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },

    inputsWrap2: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
    },

    inputsWrap: {
      flexDirection: 'row',
    },
  });
export default getStyles;
