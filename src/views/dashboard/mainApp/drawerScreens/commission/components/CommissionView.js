import {StyleSheet, View, TextInput} from 'react-native';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';

const CommissionView = props => {
  return (
    <View style={styles.mainWrapCon}>
      <TextElement fontType={'h9'} textStyle={styles.commissionLabel}>
        Commission
      </TextElement>
      <Spacer height={Mixins.scaleSize(18)} />
      <TextElement fontType={'h4'} textStyle={styles.totalCommissionLabel}>
        N30,000
      </TextElement>
    </View>
  );
};

export default CommissionView;

const styles = StyleSheet.create({
  mainWrapCon: {
    width: Mixins.scaleSize(216),

    height: Mixins.scaleSize(110),
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  commissionLabel: {
    color: Colors.BLACK,
    fontWeight: '500',
  },
  totalCommissionLabel: {
    color: Colors.PRIMARY,
  },
});
