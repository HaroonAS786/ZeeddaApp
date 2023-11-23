import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BellSVGComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.stroke}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-bell"
    {...props}>
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </Svg>
);
export default BellSVGComponent;

// import * as React from 'react';
// import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
// const WalletSVGComponent = props => (
//   <Svg
//     width={21}
//     height={25}
//     viewBox="0 0 21 25"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     {...props}>
//     <G clipPath="url(#clip0_258_2448)">
//       <Path
//         d="M5.82324 7.25757H9.89597"
//         stroke={props.stroke}
//         // strokeOpacity={0.49}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M19.6534 8.31836H17.0041C15.1866 8.31836 13.7144 9.74275 13.7144 11.5002C13.7144 13.2576 15.1877 14.682 17.0031 14.682H19.6534C19.7389 14.682 19.7807 14.682 19.8163 14.6799C20.3661 14.6449 20.804 14.2217 20.8396 13.6903C20.8416 13.6564 20.8416 13.615 20.8416 13.5334V9.467C20.8416 9.38533 20.8416 9.34397 20.8396 9.31003C20.8029 8.77866 20.3661 8.35548 19.8163 8.32048C19.7817 8.31836 19.7389 8.31836 19.6534 8.31836Z"
//         stroke={props.stroke}
//         // strokeOpacity={0.49}
//         strokeWidth={1.5}
//       />
//       <Path
//         d="M20.4236 8.31817C20.3442 6.33271 20.0896 5.11514 19.2659 4.25817C18.0736 3.01514 16.1533 3.01514 12.3138 3.01514H9.25922C5.41966 3.01514 3.49937 3.01514 2.30708 4.25817C1.11377 5.50014 1.11377 7.50044 1.11377 11.5C1.11377 15.4995 1.11377 17.4998 2.30708 18.7418C3.49937 19.9848 5.41966 19.9848 9.25922 19.9848H12.3138C16.1533 19.9848 18.0736 19.9848 19.2659 18.7418C20.0896 17.8848 20.3452 16.6673 20.4236 14.6818"
//         stroke={props.stroke}
//         // strokeOpacity={0.49}
//         strokeWidth={1.5}
//       />
//       <Path
//         d="M18.0322 11.5H18.0424"
//         stroke={props.stroke}
//         // strokeOpacity={0.49}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </G>
//     <Defs>
//       <ClipPath id="clip0_258_2448">
//         <Rect
//           width={21}
//           height={25.4545}
//           fill="white"
//           transform="translate(0 -1.22729)"
//         />
//       </ClipPath>
//     </Defs>
//   </Svg>
// );
// export default WalletSVGComponent;
