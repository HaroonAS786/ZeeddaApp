import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SendSVGComponent = props => (
  <Svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#clip0_184_2580)">
      <Path
        d="M4.62035 20.2119C3.62473 19.8157 3.49955 18.4833 4.42104 18.0932L22.7204 10.3483C23.576 9.9868 24.5823 10.7782 24.4324 11.6945L21.2204 31.3044C21.0585 32.2918 19.7338 32.484 19.1145 31.6102L13.5514 23.7688L4.62035 20.2119ZM14.7573 23.3303L19.9787 30.6916L23.1019 11.6252L5.3089 19.1551L13.6937 22.4945L18.7992 16.0024C18.8997 15.8746 19.052 15.7961 19.2228 15.7842C19.3936 15.7722 19.5687 15.8278 19.7097 15.9387C19.8507 16.0496 19.946 16.2067 19.9747 16.3755C20.0033 16.5442 19.963 16.7108 19.8625 16.8386L14.757 23.3307L14.7573 23.3303Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_184_2580">
        <Rect
          width={23.5372}
          height={25.9721}
          fill="white"
          transform="translate(0.406738 19.4736) rotate(-51.8182)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SendSVGComponent;
