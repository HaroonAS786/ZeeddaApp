import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TextElement} from '../../../../../components/TextElement';
import {Colors, Mixins} from '../../../../../styles';
import {ArrowDown} from '../../../../../assets/svgs';
import RippleEffect from '../../../../../components/rippleEffect';
import Spacer from '../../../../../components/Spacer';

const CurrentStatus = ({
  leftLabel,
  rightLabel,
  leftLabelStyle,
  rightLabelStyle,
  leftFontSize,
  rightFontSize,
  orderStatusPress,
  statusStyle,
  byDefaultSelectedOption,
}) => {
  return (
    <View style={styles.mainWarp}>
      <TextElement
        fontType={leftFontSize ? leftFontSize : 'h9'}
        textStyle={[styles.leftLabel, leftLabelStyle]}>
        {leftLabel}
      </TextElement>
      <RippleEffect
        style={[
          styles.statusView,
          statusStyle,
          //   {borderWidth: byDefaultSelectedOption === '' && 1},
        ]}
        onPress={orderStatusPress}>
        <TextElement
          fontType={rightFontSize ? rightFontSize : 'h9'}
          textStyle={[styles.rightLabel, rightLabelStyle]}>
          {rightLabel}
        </TextElement>
        <Spacer width={4} />
        <ArrowDown
          width={10}
          height={12}
          strokeColor={byDefaultSelectedOption ? 'white' : 'black'}
        />
      </RippleEffect>
    </View>
  );
};

export default CurrentStatus;

const styles = StyleSheet.create({
  mainWarp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftLabel: {
    color: 'grey',
  },
  rightLabel: {
    color: '#000',
  },
  statusView: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 4,

    // width: Mixins.scaleSize(100),
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
