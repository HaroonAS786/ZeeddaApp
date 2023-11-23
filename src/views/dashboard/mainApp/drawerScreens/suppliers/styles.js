import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainWrap: {
      flex: 1,
      backgroundColor: Colors.WHITE,
    },

    createNewSupplierView: {
      backgroundColor: Colors.YELLOW_PRIMARY,
      borderRadius: 5,
      width: Mixins.scaleSize(120),
      height: Mixins.scaleSize(30),
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
    },

    createNewSupplierLabel: {
      color: Colors.WHITE,
    },

    searchBtn: {
      borderColor: Colors.PRIMARY,
      backgroundColor: Colors.PRIMARY,
    },

    searchBtnWrap: {
      paddingHorizontal: 16,
    },

    dropDownRowsWrap: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      zIndex: 999,
    },
    inputRowsWrap: {flexDirection: 'row', justifyContent: 'space-evenly'},
  });
export default getStyles;
