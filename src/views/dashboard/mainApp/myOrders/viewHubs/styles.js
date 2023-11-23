import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainTop: {
      flex: 1,
      backgroundColor: 'white',
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
