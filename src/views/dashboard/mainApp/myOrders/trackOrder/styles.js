import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Mixins} from '../../../../../styles';

const getStyles = () =>
  StyleSheet.create({
    mainTop: {
      width: Mixins.WINDOW_WIDTH,
      height: Mixins.WINDOW_HEIGHT,
      alignItems: 'center',
    },

    divider: {
      height: 18,
      width: 1,
      backgroundColor: 'lightgrey',
    },
    dottedView: {
      height: 18,
      borderStyle: 'dashed',
      borderWidth: 1,
      borderRadius: 1,
      borderColor: 'lightgrey',
      alignSelf: 'center',
    },
    separator: {
      height: 1,
      width: Mixins.WINDOW_WIDTH / 1.1,
      backgroundColor: 'lightgrey',
    },

    trackerContentView: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      paddingHorizontal: 8,
      backgroundColor: Colors.WHITE,
    },

    estimatedDeliveryLabel: {
      color: '#EFBE48',
    },

    dateLabel: {
      color: Colors.BLACK,
    },

    orderDateLabel: {
      color: '#667085',
    },
    nameLabel: {
      color: '##191D31',
      fontWeight: '600',
    },
    barView: {
      width: Mixins.scaleSize(60),
      height: Mixins.scaleSize(6),
      borderRadius: 10,
      backgroundColor: '#DFE2EB',
    },

    packageOnTheWaylabel: {
      color: '#191D31',
    },
    arrivingLabel: {
      color: '#A7A9B7',
      fontWeight: '500',
    },
    ratingLabel: {
      color: '#A7A9B7',
      fontWeight: '500',
    },

    locationCont: {
      flexDirection: 'row',

      width: Mixins.WINDOW_WIDTH,
    },
    locationLeftView: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    locationNameLabel: {
      color: '#191D31',
    },

    footerView: {
      width: Mixins.WINDOW_WIDTH,

      paddingHorizontal: 16,
    },

    orderTrackLabel: {
      color: Colors.BLACK,
    },
  });
export default getStyles;
