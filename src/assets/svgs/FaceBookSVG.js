import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
const FacebookSVGComponent = props => (
  <Svg
    width={48}
    height={44}
    viewBox="0 0 48 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1 22C1 33.598 11.2975 43 24 43C36.7025 43 47 33.598 47 22C47 10.402 36.7025 1 24 1C11.2975 1 1 10.402 1 22Z"
      // fill="white"
    />
    <Path
      d="M35.5 22C35.5 16.225 30.325 11.5 24 11.5C17.675 11.5 12.5 16.225 12.5 22C12.5 27.25 16.6687 31.5812 22.1312 32.3687V25.0187H19.2562V22H22.1312V19.6375C22.1312 17.0125 23.8563 15.5688 26.4438 15.5688C27.7375 15.5688 29.0312 15.8313 29.0312 15.8313V18.4563H27.5938C26.1562 18.4563 25.725 19.2438 25.725 20.0312V22H28.8875L28.3125 25.0187H25.5813V32.5C31.3313 31.7125 35.5 27.25 35.5 22Z"
      fill="#1877F2"
    />
    <Rect
      x={0.5}
      y={0.5}
      width={47}
      height={43}
      rx={10.5}
      stroke="black"
      strokeOpacity={0.14}
    />
  </Svg>
);
export default FacebookSVGComponent;
