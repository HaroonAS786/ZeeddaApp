import * as React from 'react';
import Svg, {Rect, Circle, Polyline} from 'react-native-svg';
const GallerySVGComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1e90ff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-image"
    {...props}>
    <Rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    <Circle cx={8.5} cy={8.5} r={1.5} />
    <Polyline points="21 15 16 10 5 21" />
  </Svg>
);
export default GallerySVGComponent;
