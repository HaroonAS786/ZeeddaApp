import React from 'react';
import {StyleSheet, View} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {Colors, Mixins} from '../styles';

export default function FadeModal(props) {
  const {
    children = null,
    height = 0,
    headerTitle,
    modalStyle = {},
    refRBSheet = undefined,
    header,
    closeOnDragDown = true,
    closeOnPressMask = true,
    onModalClose = null,
  } = props;

  return (
    <RBSheet
      ref={refRBSheet}
      onClose={onModalClose}
      animationType="fade"
      height={height}
      closeOnDragDown={closeOnDragDown}
      closeOnPressMask={closeOnPressMask}
      dragFromTopOnly
      openDuration={300}
      keyboardAvoidingViewEnabled={true}
      customStyles={styles.rBSheetStyle}>
      <View style={[styles.lModalView, modalStyle]}>
        {header && (
          <View style={styles.topCont}>
            <View style={styles.headerStyle}>
              <TextElement
                font={'bold'}
                fontType={'h5'}
                textStyle={[styles.rowTxt]}>
                {headerTitle}
              </TextElement>
            </View>
          </View>
        )}

        <>
          <View style={styles.eachItem}>{children}</View>
        </>
      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  topCont: {
    width: '100%',
    height: Mixins.WINDOW_HEIGHT * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopLeftRadius: Mixins.WINDOW_WIDTH * 0.03,
    borderTopRightRadius: Mixins.WINDOW_WIDTH * 0.03,
  },
  rBSheetStyle: {
    wrapper: {
      backgroundColor: 'rgba(2, 28, 33, 0.51)',
    },
    draggableIcon: {
      backgroundColor: 'lightgrey',
      width: Mixins.WINDOW_WIDTH * 0.2,
      height: Mixins.WINDOW_HEIGHT * 0.005,
    },
    container: {
      borderTopLeftRadius: Mixins.WINDOW_WIDTH * 0.03,
      borderTopRightRadius: Mixins.WINDOW_WIDTH * 0.03,
      overflow: 'hidden',
    },
  },
  lModalView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: Mixins.WINDOW_WIDTH * 0.05,
    borderTopRightRadius: Mixins.WINDOW_WIDTH * 0.05,
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
  },

  eachItem: {
    backgroundColor: '#fff',

    borderTopLeftRadius: Mixins.WINDOW_WIDTH * 0.03,
    borderTopRightRadius: Mixins.WINDOW_WIDTH * 0.03,
  },
});
