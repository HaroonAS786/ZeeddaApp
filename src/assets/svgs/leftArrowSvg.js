import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const LeftArrowSVGComponent = props => (
  <Svg
    width={6}
    height={10}
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M0.250651 9.41675C0.0978729 9.26397 0.0214844 9.06953 0.0214844 8.83341C0.0214844 8.5973 0.0978729 8.40286 0.250651 8.25008L3.50065 5.00008L0.250651 1.75008C0.0978729 1.5973 0.0214844 1.40286 0.0214844 1.16675C0.0214844 0.930637 0.0978729 0.736192 0.250651 0.583414C0.403428 0.430637 0.597873 0.354248 0.833984 0.354248C1.07009 0.354248 1.26454 0.430637 1.41732 0.583414L5.25065 4.41675C5.33398 4.50008 5.39315 4.59036 5.42815 4.68758C5.46315 4.7848 5.48037 4.88897 5.47982 5.00008C5.47982 5.11119 5.46232 5.21536 5.42732 5.31258C5.39232 5.4098 5.33343 5.50008 5.25065 5.58341L1.41732 9.41675C1.26454 9.56952 1.07009 9.64591 0.833984 9.64591C0.597873 9.64591 0.403428 9.56952 0.250651 9.41675Z"
      fill="black"
    />
  </Svg>
);
export default LeftArrowSVGComponent;
