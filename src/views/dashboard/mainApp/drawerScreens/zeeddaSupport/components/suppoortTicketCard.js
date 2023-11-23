import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import Spacer from '../../../../../../components/Spacer';
import {DeleteSVGComponent} from '../../../../../../assets/svgs';
import RippleEffect from '../../../../../../components/rippleEffect';
import {TextElement} from '../../../../../../components/TextElement';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BranchCard = ({item, setDeletePopUp, setDeleteId}) => {
  return (
    <View style={styles.mainWrap}>
      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.header}>
        <Spacer />
        <TextElement fontType={'h9'} textStyle={{color: 'grey', opacity: 0.5}}>
          {moment(item.created_at).format('MMMM Do YYYY HH:mm:ss')}
        </TextElement>
      </View>
      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.header}>
        <TextElement fontType={'h6'} textStyle={{color: Colors.BLACK}}>
          {item.subject}
        </TextElement>
        <TextElement
          fontType={'h8'}
          textStyle={{color: Colors.BLACK, opacity: 0.5}}>
          {`Ticket # ${item.id}`}
        </TextElement>
      </View>

      <Spacer height={Mixins.scaleSize(12)} />
      <View style={styles.footerView}>
        <TextElement
          fontType={'h9'}
          textStyle={{color: Colors.BLACK, opacity: 0.5, width: 230}}>
          {item.description}
        </TextElement>
        <TextElement
          fontType={'h9'}
          textStyle={{
            color: item.ticket_status == 'Pending' ? '#FF8C00' : '#008000',
          }}>
          {item.ticket_status == 'Pending' ? 'Pending' : 'Closed'}
        </TextElement>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => {
          setDeleteId(item.id);
          setDeletePopUp(true);
        }}>
        <RippleEffect style={styles.deleteView}>
          <DeleteSVGComponent width={24} height={22} />
        </RippleEffect>
      </TouchableOpacity>
    </View>
  );
};

export default BranchCard;

const styles = StyleSheet.create({
  mainWrap: {
    height: Mixins.scaleSize(180),
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  deleteView: {
    width: 32,
    height: 32,
    borderRadius: 5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteBtn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
