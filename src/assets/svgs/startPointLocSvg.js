import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const StartPointSVGComponent = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.9697 22C17.4926 22 21.9697 17.5228 21.9697 12C21.9697 6.47715 17.4926 2 11.9697 2C6.44688 2 1.96973 6.47715 1.96973 12C1.96973 17.5228 6.44688 22 11.9697 22Z"
      stroke="#3F87F7"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.9995 16.23C14.3357 16.23 16.2295 14.3362 16.2295 12C16.2295 9.66386 14.3357 7.77002 11.9995 7.77002C9.66337 7.77002 7.76953 9.66386 7.76953 12C7.76953 14.3362 9.66337 16.23 11.9995 16.23Z"
      fill="#3F87F7"
      stroke="#3F87F7"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default StartPointSVGComponent;
