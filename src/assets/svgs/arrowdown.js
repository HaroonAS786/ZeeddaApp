import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={props.width ? props.width : 12}
    height={props.width ? props.width : 8}
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M1.41 0.580078L6 5.17008L10.59 0.580078L12 2.00008L6 8.00008L0 2.00008L1.41 0.580078Z"
      fill={props.strokeColor ? props.strokeColor : '#545454'}
    />
  </Svg>
);
export default SVGComponent;
