import * as React from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';
const NameSVGComponent = props => (
  <Svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5.15973 17.06C2.73973 18.68 2.73973 21.32 5.15973 22.93C7.90973 24.77 12.4197 24.77 15.1697 22.93C17.5897 21.31 17.5897 18.67 15.1697 17.06C12.4297 15.23 7.91973 15.23 5.15973 17.06Z"
      fill="#3F87F7"
    />
    <Path
      d="M10.1596 13.37C10.0596 13.36 9.93957 13.36 9.82957 13.37C7.44957 13.29 5.55957 11.34 5.55957 8.94C5.55957 6.49 7.53957 4.5 9.99957 4.5C12.4496 4.5 14.4396 6.49 14.4396 8.94C14.4296 11.34 12.5396 13.29 10.1596 13.37Z"
      fill="#3F87F7"
    />
    <G clipPath="url(#clip0_252_2600)">
      <Path
        d="M12.1601 11.37C12.0601 11.36 11.9401 11.36 11.8301 11.37C9.45006 11.29 7.56006 9.34 7.56006 6.94C7.56006 4.49 9.54006 2.5 12.0001 2.5C14.4501 2.5 16.4401 4.49 16.4401 6.94C16.4301 9.34 14.5401 11.29 12.1601 11.37Z"
        stroke="#1D272F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.16021 15.06C4.74021 16.68 4.74021 19.32 7.16021 20.93C9.91021 22.77 14.4202 22.77 17.1702 20.93C19.5902 19.31 19.5902 16.67 17.1702 15.06C14.4302 13.23 9.92021 13.23 7.16021 15.06Z"
        stroke="#1D272F"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_252_2600">
        <Rect
          width={24}
          height={24}
          fill="white"
          transform="translate(0 0.5)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default NameSVGComponent;
