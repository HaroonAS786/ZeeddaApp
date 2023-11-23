import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const DoneSVGComponent = props => (
  <Svg
    width={20}
    height={21}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10 0.5C4.49 0.5 0 4.99 0 10.5C0 16.01 4.49 20.5 10 20.5C15.51 20.5 20 16.01 20 10.5C20 4.99 15.51 0.5 10 0.5ZM14.78 8.2L9.11 13.87C8.97 14.01 8.78 14.09 8.58 14.09C8.38 14.09 8.19 14.01 8.05 13.87L5.22 11.04C4.93 10.75 4.93 10.27 5.22 9.98C5.51 9.69 5.99 9.69 6.28 9.98L8.58 12.28L13.72 7.14C14.01 6.85 14.49 6.85 14.78 7.14C15.07 7.43 15.07 7.9 14.78 8.2Z"
      fill="#1D272F"
    />
  </Svg>
);
export default DoneSVGComponent;
