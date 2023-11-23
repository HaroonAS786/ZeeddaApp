import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CartSVGComponent = props => (
  <Svg
    width={props.width ? props.width : 42}
    height={props.height ? props.height : 37}
    viewBox="0 0 42 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.75 33.9167C16.7165 33.9167 17.5 33.2265 17.5 32.375C17.5 31.5236 16.7165 30.8334 15.75 30.8334C14.7835 30.8334 14 31.5236 14 32.375C14 33.2265 14.7835 33.9167 15.75 33.9167Z"
      stroke={props.color ? props.color : '#23142c'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M35 33.9167C35.9665 33.9167 36.75 33.2265 36.75 32.375C36.75 31.5236 35.9665 30.8334 35 30.8334C34.0335 30.8334 33.25 31.5236 33.25 32.375C33.25 33.2265 34.0335 33.9167 35 33.9167Z"
      stroke={props.color ? props.color : '#23142c'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.75 1.54163H8.75L13.44 22.1845C13.6 22.8943 14.0383 23.5319 14.6782 23.9857C15.3181 24.4394 16.1187 24.6805 16.94 24.6666H33.95C34.7713 24.6805 35.5719 24.4394 36.2118 23.9857C36.8517 23.5319 37.29 22.8943 37.45 22.1845L40.25 9.24996H10.5"
      stroke={props.color ? props.color : '#23142c'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CartSVGComponent;
