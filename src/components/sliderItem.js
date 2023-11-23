import React from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Mixins} from '../styles';

const {width, height} = Dimensions.get('screen');
const SliderItem = ({item}) => {
  const stylePageWidth = {width: Dimensions.get('window').width};
  return (
    <View style={[styles.container, stylePageWidth]}>
      <ImageBackground
        key={item.key}
        source={item?.image}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          flex: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
  },
});
export default SliderItem;
