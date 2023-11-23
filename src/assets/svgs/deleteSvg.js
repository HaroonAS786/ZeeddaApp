import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const DeleteSVGComponent = props => (
  <Svg
    width={35}
    height={39}
    viewBox="0 0 35 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.5 39C5.30833 39 4.28783 38.5753 3.4385 37.726C2.58917 36.8767 2.16522 35.8569 2.16667 34.6667V6.5H0V2.16667H10.8333V0H23.8333V2.16667H34.6667V6.5H32.5V34.6667C32.5 35.8583 32.0753 36.8788 31.226 37.7282C30.3767 38.5775 29.3569 39.0014 28.1667 39H6.5ZM28.1667 6.5H6.5V34.6667H28.1667V6.5ZM10.8333 30.3333H15.1667V10.8333H10.8333V30.3333ZM19.5 30.3333H23.8333V10.8333H19.5V30.3333Z"
      fill="white"
    />
  </Svg>
);
export default DeleteSVGComponent;
