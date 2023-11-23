import {Platform, PixelRatio, Dimensions} from 'react-native';
import {scaleFont, WINDOW_WIDTH} from './mixins';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export const isTablet = viewportHeight / viewportWidth < 1.6;

// based on iphone 5s's scale
const scale = WINDOW_WIDTH / 320;

export function setFontSize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

// LINE HEIGHT
export const setLineHeight = size => {
  return scaleFont(size);
};

// Export font size
export const sizes = {
  base: 14,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  h7: 13, //13
  h8: 12, //10
  h9: 11, //8
  h10: 10,
};

// Export lineheights
export const lineHeights = {
  base: isTablet ? 25 : 20,
  h1: isTablet ? 50 : 43,
  h2: isTablet ? 42 : 33,
  h3: isTablet ? 35 : 28,
  h4: isTablet ? 31 : 25,
  h5: isTablet ? 28 : 23,
  h6: isTablet ? 25 : 20,
  h7: isTablet ? 22 : 17,
  h8: isTablet ? 22 : 16,
  h9: isTablet ? 19 : 14,
  h10: isTablet ? 16 : 14,
};

export const fontSize = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  h7: 'h7',
  h8: 'h8',
  h9: 'h9',
  h10: 'h10',
};
// Export font family
