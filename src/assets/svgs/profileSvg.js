import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ProfileSVGComponent = props => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M12.6601 10.37C12.5601 10.36 12.4401 10.36 12.3301 10.37C9.95006 10.29 8.06006 8.34 8.06006 5.94C8.06006 3.49 10.0401 1.5 12.5001 1.5C14.9501 1.5 16.9401 3.49 16.9401 5.94C16.9301 8.34 15.0401 10.29 12.6601 10.37Z"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.66021 14.06C5.24021 15.68 5.24021 18.32 7.66021 19.93C10.4102 21.77 14.9202 21.77 17.6702 19.93C20.0902 18.31 20.0902 15.67 17.6702 14.06C14.9302 12.23 10.4202 12.23 7.66021 14.06Z"
      stroke={props.stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ProfileSVGComponent;
