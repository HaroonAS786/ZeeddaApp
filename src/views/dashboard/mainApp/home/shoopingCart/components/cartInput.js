import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import RippleEffect from '../../../../../../components/rippleEffect';
import Spacer from '../../../../../../components/Spacer';
import {TextElement} from '../../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../../styles';

const CartInputText = ({
  placeholder,
  value,
  keyboardType,
  offerOnPress,
  isOffer,
  setPromoCode,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={item => setPromoCode(item)}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
      />

      {isOffer && (
        <>
          <Spacer width={Mixins.scaleSize(20)} />
          <RippleEffect style={styles.offerView} onPress={offerOnPress}>
            <TextElement fontType={'h8'} textStyle={styles.offerLabel}>
              Offer
            </TextElement>
          </RippleEffect>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: Mixins.scaleSize(44),
    paddingHorizontal: 15,
    // width: '100%',
  },
  input: {
    fontSize: 14,
    width: Mixins.scaleSize(200),
    color: '#000',
  },

  offerLabel: {
    color: Colors.WHITE,
  },

  offerView: {
    backgroundColor: Colors.YELLOW_PRIMARY,
    width: Mixins.scaleSize(72),
    height: Mixins.scaleSize(34),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CartInputText;
