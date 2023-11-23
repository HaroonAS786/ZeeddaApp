import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {SearchSVGComponent} from '../../../../assets/svgs';
import RippleEffect from '../../../../components/rippleEffect';
import Spacer from '../../../../components/Spacer';
import {Colors, Mixins} from '../../../../styles';

const SearchAnimated = ({
  setSearchValue,
  onPress,
  loader,
  setFilterApply,
  placeholder,
}) => {
  const Search = name => {
    if (name == '') {
      setFilterApply(false);
    }
    setSearchValue(name);
  };

  const position = useRef(new Animated.ValueXY({x: -200, y: 0})).current;
  useEffect(() => {
    animateView();
  }, []);
  const animateView = () => {
    Animated.timing(position, {
      toValue: {x: 0, y: -15},
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {transform: position.getTranslateTransform()},
      ]}>
      <View style={styles.mainWrapCon}>
        <View style={styles.inputWrapCon}>
          <TextInput
            placeholder={placeholder ? placeholder : 'Search'}
            onChangeText={name => Search(name)}
            style={styles.searchLabel}
            placeholderTextColor="lightgrey"
          />
        </View>
        <Spacer width={Mixins.scaleSize(10)} />
        {loader ? (
          <RippleEffect style={styles.searchView}>
            <ActivityIndicator size="small" color="#ffff" />
          </RippleEffect>
        ) : (
          <RippleEffect style={styles.searchView} onPress={() => onPress()}>
            <SearchSVGComponent />
          </RippleEffect>
        )}
      </View>
    </Animated.View>
  );
};

export default SearchAnimated;

const styles = StyleSheet.create({
  mainWrapCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  inputWrapCon: {
    // backgroundColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    height: Mixins.scaleSize(36),
    width: Mixins.scaleSize(225),
    textAlign: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  searchView: {
    backgroundColor: Colors.YELLOW_PRIMARY,
    borderRadius: 10,
    height: Mixins.scaleSize(37),
    width: Mixins.scaleSize(45),
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchLabel: {
    padding: 10,
    color: '#000',
  },
});
