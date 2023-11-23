import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CurrencySVGComponent = props => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M2.5752 5.15513H3.69014V1.8103H4.80508L6.71163 5.15513H9.26485V1.8103H10.3798V5.15513H11.4947V6.27007H10.3798V7.38502H11.4947V8.49996H10.3798V11.8448H9.26485L7.35272 8.49996H4.80508V11.8448H3.69014V8.49996H2.5752V7.38502H3.69014V6.27007H2.5752V5.15513ZM4.80508 5.15513H5.43502L4.80508 4.05691V5.15513ZM4.80508 6.27007V7.38502H6.71163L6.07611 6.27007H4.80508ZM9.26485 9.6149V8.49996H8.62376L9.26485 9.6149ZM7.34715 6.27007L7.98824 7.38502H9.26485V6.27007H7.34715Z"
      fill="#3F87F7"
    />
  </Svg>
);
export default CurrencySVGComponent;