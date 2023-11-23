import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {StyleSheet, Text} from 'react-native';

import React from 'react';

import {Colors, Mixins} from '../styles';

const OTPComponent = ({pin, onChangeText, setPin, pinCount, secure}) => {
  const ref = useBlurOnFulfill({value: pin, cellCount: pinCount});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: pin,
    setValue: setPin,
  });
  const renderCell = ({index, symbol, isFocused}) => {
    let textChild = null;
    if (symbol) {
      textChild = secure ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <Text
        key={index}
        style={[
          styling.underlineStyleBase,
          isFocused && styling.underlineStyleBaseF,
          textChild === '•' && styling.underlineStyleBaseF,
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <CodeField
      ref={ref}
      {...props}
      value={pin}
      // autoFocus={true}

      onChangeText={p => onChangeText(p)}
      cellCount={pinCount}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={renderCell}
    />
  );
};

export default OTPComponent;

const styling = StyleSheet.create({
  underlineStyleBase: {
    width: Mixins.scaleSize(65),
    height: Mixins.scaleSize(52),

    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    borderColor: '#F8F9FB',
    borderWidth: 1,
    overflow: 'hidden',
    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 16,

    padding: 14,

    marginRight: 12,
    marginLeft: 12,
  },
  underlineStyleBaseF: {
    width: Mixins.scaleSize(65),
    height: Mixins.scaleSize(52),
    borderWidth: 1,
    backgroundColor: '#F8F9FB',
    borderColor: Colors.BORDER_COLOR,
    borderRadius: 12,

    color: Colors.BLACK,
    textAlign: 'center',
    fontSize: 16,
    padding: 14,
  },

  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
});
