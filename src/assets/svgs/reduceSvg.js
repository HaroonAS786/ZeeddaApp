import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ReduceSVGComponent = props => (
  <Svg
    width={7}
    height={3}
    viewBox="0 0 7 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.49852 2.29239H0.804574C0.67873 2.29239 0.55804 2.22181 0.469055 2.09619C0.38007 1.97056 0.330078 1.80018 0.330078 1.62251C0.330078 1.44485 0.38007 1.27447 0.469055 1.14884C0.55804 1.02321 0.67873 0.952637 0.804574 0.952637H6.49852C6.62437 0.952637 6.74506 1.02321 6.83404 1.14884C6.92303 1.27447 6.97302 1.44485 6.97302 1.62251C6.97302 1.80018 6.92303 1.97056 6.83404 2.09619C6.74506 2.22181 6.62437 2.29239 6.49852 2.29239Z"
      fill="black"
      fillOpacity={0.33}
    />
  </Svg>
);
export default ReduceSVGComponent;
