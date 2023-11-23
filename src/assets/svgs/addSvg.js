import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const AddSVGComponent = props => (
  <Svg
    width={11}
    height={11}
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M9.62636 6.10901H6.27698V9.45839C6.27698 9.63605 6.2064 9.80644 6.08078 9.93207C5.95515 10.0577 5.78477 10.1283 5.6071 10.1283C5.42944 10.1283 5.25906 10.0577 5.13343 9.93207C5.0078 9.80644 4.93723 9.63605 4.93723 9.45839V6.10901H1.58785C1.41018 6.10901 1.2398 6.03843 1.11417 5.91281C0.988545 5.78718 0.917969 5.6168 0.917969 5.43913C0.917969 5.26147 0.988545 5.09109 1.11417 4.96546C1.2398 4.83983 1.41018 4.76926 1.58785 4.76926H4.93723V1.41988C4.93723 1.24221 5.0078 1.07183 5.13343 0.946202C5.25906 0.820576 5.42944 0.75 5.6071 0.75C5.78477 0.75 5.95515 0.820576 6.08078 0.946202C6.2064 1.07183 6.27698 1.24221 6.27698 1.41988V4.76926H9.62636C9.80402 4.76926 9.97441 4.83983 10.1 4.96546C10.2257 5.09109 10.2962 5.26147 10.2962 5.43913C10.2962 5.6168 10.2257 5.78718 10.1 5.91281C9.97441 6.03843 9.80402 6.10901 9.62636 6.10901Z"
      fill="black"
      fillOpacity={0.41}
    />
  </Svg>
);
export default AddSVGComponent;
