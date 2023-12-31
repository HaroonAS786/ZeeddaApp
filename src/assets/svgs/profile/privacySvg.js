import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PrivacySVGComponent = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.4902 2.23L5.50016 4.11C4.35016 4.54 3.41016 5.9 3.41016 7.12V14.55C3.41016 15.73 4.19016 17.28 5.14016 17.99L9.44016 21.2C10.8502 22.26 13.1702 22.26 14.5802 21.2L18.8802 17.99C19.8302 17.28 20.6102 15.73 20.6102 14.55V7.12C20.6102 5.89 19.6702 4.53 18.5202 4.1L13.5302 2.23C12.6802 1.92 11.3202 1.92 10.4902 2.23Z"
      stroke="#1D272F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12.5C13.1046 12.5 14 11.6046 14 10.5C14 9.39543 13.1046 8.5 12 8.5C10.8954 8.5 10 9.39543 10 10.5C10 11.6046 10.8954 12.5 12 12.5Z"
      stroke="#1D272F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12.5V15.5"
      stroke="#1D272F"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PrivacySVGComponent;
