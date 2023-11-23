import {BaseToast, ErrorToast} from 'react-native-toast-message';
import Colors from './Colors';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.TagSuccess,
        borderLeftWidth: 5,
        borderRightColor: Colors.TagSuccess,
        borderRightWidth: 5,
        height: 80,
        width: '90%',
        zIndex: 9999,
      }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.accent,
        paddingTop: 5,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.TagError,
        borderLeftWidth: 5,
        borderRightColor: Colors.TagError,
        borderRightWidth: 5,
        height: 80,
        width: '90%',
        zIndex: 9999,
      }}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 14,
        color: Colors.accent,
        paddingTop: 5,
      }}
    />
  ),
};
