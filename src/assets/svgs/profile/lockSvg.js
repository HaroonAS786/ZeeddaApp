import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const ProfileLockSVGComponent = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.75 10C4.75 8.38987 5.00031 7.10912 5.70907 6.22924C6.38962 5.38439 7.62836 4.75 10 4.75C12.3716 4.75 13.6104 5.38439 14.2909 6.22924C14.9997 7.10912 15.25 8.38987 15.25 10V12C15.25 12.0005 15.25 12.0009 15.25 12.0014C15.168 12.0004 15.0847 12 15 12H5C4.91533 12 4.832 12.0004 4.75 12.0014C4.75 12.0009 4.75 12.0005 4.75 12V10ZM3.25543 12.0907C3.25185 12.061 3.25 12.0307 3.25 12V10C3.25 8.30013 3.49969 6.58088 4.54093 5.28826C5.61038 3.96061 7.37164 3.25 10 3.25C12.6284 3.25 14.3896 3.96061 15.4591 5.28826C16.5003 6.58088 16.75 8.30013 16.75 10V12C16.75 12.0307 16.7482 12.061 16.7446 12.0907C19.3029 12.4119 20 13.6603 20 17V19C20 23 19 24 15 24H5C1 24 0 23 0 19V17C0 13.6603 0.697114 12.4119 3.25543 12.0907Z"
      fill="#3F87F7"
    />
    <G clipPath="url(#clip0_279_2122)">
      <Path
        d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
        stroke="#1D272F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
        stroke="#1D272F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.9965 16H16.0054"
        stroke="#1D272F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.9955 16H12.0045"
        stroke="#1D272F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99451 16H8.00349"
        stroke="#1D272F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_279_2122">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ProfileLockSVGComponent;
