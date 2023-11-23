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
      justifyContent: 'flex-end',
      width: '100%',
    },
    inputsWrap: {
      flexDirection: 'row',
      zIndex: 999,
    },

    container: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      paddingHorizontal: 16,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#999',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    checkboxInner: {
      width: 14,
      height: 14,
      borderRadius: 4,
      backgroundColor: Colors.PRIMARY,
    },
    label: {
      marginLeft: 8,
    },

    customerLabel: {
      backgroundColor: 'background: rgba(217, 217, 217, 1)',
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderRadius: 10,
      width: Mixins.WINDOW_WIDTH / 1.1,
      height: Mixins.scaleSize(35),
    },
  });
export default getStyles;
