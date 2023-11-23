import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const VerifiedSVGComponent = props => (
  <Svg
    width={24}
    height={20}
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12 1L3 4.33333V9.33333C3 13.9583 6.84 18.2833 12 19.3333C17.16 18.2833 21 13.9583 21 9.33333V4.33333L12 1ZM19 9.33333C19 13.1 16.02 16.575 12 17.6083C7.98 16.575 5 13.1 5 9.33333V5.41667L12 2.825L19 5.41667V9.33333ZM7.41 9.825L6 11L10 14.3333L18 7.66667L16.59 6.48333L10 11.975L7.41 9.825Z"
      fill="#3F87F7"
    />
  </Svg>
);
export default VerifiedSVGComponent;
