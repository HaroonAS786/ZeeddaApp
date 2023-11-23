import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const MyOrderSVGComponent = props => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M22.5 5.5V7.92C22.5 9.5 21.5 10.5 19.92 10.5H16.5V3.51C16.5 2.4 17.41 1.5 18.52 1.5C19.61 1.51 20.61 1.95 21.33 2.67C22.05 3.4 22.5 4.4 22.5 5.5Z"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.5 6.5V20.5C2.5 21.33 3.43998 21.8 4.09998 21.3L5.81 20.02C6.21 19.72 6.77 19.76 7.13 20.12L8.78998 21.79C9.17998 22.18 9.82002 22.18 10.21 21.79L11.89 20.11C12.24 19.76 12.8 19.72 13.19 20.02L14.9 21.3C15.56 21.79 16.5 21.32 16.5 20.5V3.5C16.5 2.4 17.4 1.5 18.5 1.5H7.5H6.5C3.5 1.5 2.5 3.29 2.5 5.5V6.5Z"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 8.5H12.5"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.25 12.5H11.75"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default MyOrderSVGComponent;
