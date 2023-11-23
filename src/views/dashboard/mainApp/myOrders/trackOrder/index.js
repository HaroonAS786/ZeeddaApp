import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import LayoutContainer from '../../../../../components/layoutContainer';
import getStyles from './styles';
import {TextElement} from '../../../../../components/TextElement';
import Spacer from '../../../../../components/Spacer';
import {Mixins} from '../../../../../styles';
import SummaryContext from '../components/summaryContext';
import OrderStatus from '../components/orderStatus';
import * as orderApi from '../../../../../../services/api/order';
import {useSelector} from 'react-redux';
import moment from 'moment';

const TrackOrderScreen = props => {
  const styles = getStyles();
  const {item} = props.route.params;
  const user = useSelector(state => state?.auth?.user);

  useEffect(() => {
    shippingDetail();
  });

  const [shippingData, setShippingData] = useState([]);

  const shippingDetail = async () => {
    try {
      const shippingObject = {
        user_id: user?.id,
        order_id: item?.id,
      };
      const {
        data: {order, success},
      } = await orderApi?.getShippingDetail({shippingObject});
      if (success) {
        setShippingData(order);
      }
    } catch (error) {}
  };

  return (
    <LayoutContainer
      header
      header2
      noHeight
      backOnPress={() => props.navigation.goBack()}>
      <Spacer height={Mixins.scaleSize(16)} />
      <TextElement fontType={'h4'} textStyle={styles.orderTrackLabel}>
        Order Tracking
      </TextElement>
      <Spacer height={Mixins.scaleSize(16)} />
      <View style={styles.trackerContentView}>
        <View style={{flexDirection: 'row'}}>
          <TextElement fontType={'h8'} textStyle={styles.orderDateLabel}>
            Order date:
          </TextElement>
          <TextElement fontType={'h8'} textStyle={styles.dateLabel}>
            {moment(shippingData?.created_at).format('DD MMM, YYYY')}
          </TextElement>
        </View>
      </View>
      <Spacer height={Mixins.scaleSize(30)} />
      <View style={styles.mainTop}>
        <OrderStatus status={shippingData?.status} />
        <Spacer height={Mixins.scaleSize(30)} />
        <View style={styles.barView} />
        <Spacer height={Mixins.scaleSize(30)} />
        <View style={styles.separator} />
        <Spacer height={Mixins.scaleSize(20)} />
        <View style={styles.footerView}>
          <TextElement fontType={'h4'} textStyle={styles.locationNameLabel}>
            Product Summary
          </TextElement>
          <Spacer height={Mixins.scaleSize(20)} />
          <SummaryContext
            leftLabel={'Product Title'}
            rightLabel={shippingData?.product_title}
          />
          <Spacer height={Mixins.scaleSize(12)} />
          <SummaryContext
            leftLabel={'Order Id'}
            rightLabel={shippingData?.id}
          />
          <Spacer height={Mixins.scaleSize(12)} />
          <SummaryContext
            leftLabel={'Description'}
            rightLabel={shippingData?.product_description}
          />
        </View>
      </View>
    </LayoutContainer>
  );
};

export default TrackOrderScreen;
