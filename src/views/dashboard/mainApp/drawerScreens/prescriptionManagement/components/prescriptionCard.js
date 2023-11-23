import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors, Mixins} from '../../../../../../styles';
import {DownLoadSVGComponent} from '../../../../../../assets/svgs';
import Spacer from '../../../../../../components/Spacer';
import RippleEffect from '../../../../../../components/rippleEffect';
import SummaryContext from '../../../myOrders/components/summaryContext';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

const PrescriptionsCard = ({item}) => {
  const baseUrl = 'https://devstaging.zeedda.com/v2/storage/profile/';

  const downloadImage = async () => {
    try {
      const REMOTE_IMAGE_PATH = baseUrl + item?.image_path;
      let date = new Date();
      let image_URL = REMOTE_IMAGE_PATH;
      const {config, fs} = RNFetchBlob;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2),
          // + ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          console.log('download');
          console.log('res -> ', JSON.stringify(res));
        });
      console.log('close');
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.imgCon}
          resizeMode={'cover'}
          source={{uri: baseUrl + item?.image_path}}
        />
        <RippleEffect
          style={{position: 'absolute', top: 12, right: 16}}
          onPress={downloadImage}>
          <DownLoadSVGComponent />
        </RippleEffect>
      </View>

      <View style={styles.descripContainer}>
        <Spacer height={Mixins.scaleSize(12)} />
        <SummaryContext
          leftLabel={'Prescription ID:'}
          rightLabel={item?.id}
          leftLabelStyle={{color: 'grey'}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: Colors.PRIMARY}}
          rightFontSize={'h6'}
        />
        <Spacer height={Mixins.scaleSize(12)} />
        <SummaryContext
          leftLabel={'Order ID:'}
          rightLabel={item?.order_id}
          leftLabelStyle={{color: 'grey'}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: Colors.PRIMARY}}
          rightFontSize={'h6'}
        />
        <Spacer height={Mixins.scaleSize(12)} />
        <SummaryContext
          leftLabel={'User ID:'}
          rightLabel={item?.user_id}
          leftLabelStyle={{color: 'grey'}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: Colors.PRIMARY}}
          rightFontSize={'h6'}
        />
        <Spacer height={Mixins.scaleSize(12)} />
        <SummaryContext
          leftLabel={'Created At:'}
          rightLabel={moment(item.created_at).format('DD MMM, YYYY')}
          leftLabelStyle={{color: 'grey'}}
          leftFontSize={'h6'}
          rightLabelStyle={{color: Colors.PRIMARY}}
          rightFontSize={'h6'}
        />
      </View>
    </View>
  );
};

export default PrescriptionsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 20,
    marginBottom: 20,
  },

  imgCon: {
    height: Mixins.scaleSize(120),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'lightgrey',
    width: '100%',
  },

  descripContainer: {
    paddingHorizontal: 16,
  },
});
