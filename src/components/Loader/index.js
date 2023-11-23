import React from 'react';
import {StyleSheet, View} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import CardBox from '../Card';

const SkeletonLoader = () => {
  return (
    <View style={styles.mainContainer}>
      {Array(3)
        .fill()
        .map((_, index) => (
          <View style={styles.Container} key={index}>
            <CardBox externalContainerStyle={styles.deviceCardContainer}>
              <ContentLoader viewBox="0 0 380 70">
                <Circle cx="30" cy="30" r="30" />
                <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            </CardBox>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  Container: {width: '90%', flex: 1, marginBottom: 10},
  deviceCardContainer: {
    width: '100%',
    height: 100,
    paddingHorizontal: 30,
    backgroundColor: '#ffff',
    marginBottom: 10,
    borderRadius: 10,
  },
});
export default SkeletonLoader;
