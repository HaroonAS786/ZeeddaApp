import * as React from 'react';
import Svg, {Rect, Circle} from 'react-native-svg';
const RadioSVGComponent = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={3} y={3} width={18} height={18} rx={9} fill="#3F87F7" />
    <Circle cx={12} cy={12} r={3} fill="white" />
    <Rect
      x={3}
      y={3}
      width={18}
      height={18}
      rx={9}
      stroke="#3F87F7"
      strokeWidth={2}
    />
  </Svg>
);
export default RadioSVGComponent;
