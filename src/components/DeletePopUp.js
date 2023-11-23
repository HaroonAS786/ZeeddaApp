import React from 'react';
import {Text, View} from 'react-native';
import Dialog, {DialogContent, SlideAnimation} from 'react-native-popup-dialog';
import ButtonComponent from './buttonComponent';
const DeletePopUp = ({
  setDeletePopUp,
  deletePopUp,
  title,
  deleteCard,
  deleteLoader,
}) => {
  return (
    <Dialog
      visible={deletePopUp}
      dialogStyle={{margin: 20}}
      onTouchOutside={() => {
        setDeletePopUp(false);
      }}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }>
      <DialogContent>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            paddingVertical: 10,
            color: '#000',
          }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <ButtonComponent
            buttonTitle={'No'}
            style={{backgroundColor: '#fff', borderWidth: 1, width: '95%'}}
            titleColor={'#000'}
            onPress={() => setDeletePopUp(false)}
          />
          <ButtonComponent
            buttonTitle={'Yes'}
            style={{backgroundColor: 'red', borderWidth: 0, width: '95%'}}
            titleColor={'#fff'}
            onPress={deleteCard}
            loader={deleteLoader}
          />
        </View>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopUp;
