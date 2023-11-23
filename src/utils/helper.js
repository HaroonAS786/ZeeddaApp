import {
  MoreSVGComponent,
  PaymentSVGComponent,
  SendSVGComponent,
  WithDrawSVGComponent,
} from '../assets/svgs';
import {PermissionsAndroid, Platform} from 'react-native';
import HomeStackNavigator from '../views/dashboard/mainApp/home/homeStack';
import MyOrderStackNavigator from '../views/dashboard/mainApp/myOrders/myOrderStack';
import ProfileStackNavigator from '../views/dashboard/mainApp/profile/profileStack';
import {IMAGES} from './asset';
import * as Yup from 'yup';
import NotificationStackNavigator from '../views/dashboard/mainApp/notiification/stack';
import {launchCamera} from 'react-native-image-picker';

export const SLIDES = [
  {
    key: 1,
    image: IMAGES.onBoardingImg1,
    subTitle1: 'Reliable tracking system',
    subTitle2:
      'Enjoy the advantage of convenient real-time tracking of your shipment wherever you are.',
  },
  {
    key: 2,
    image: IMAGES.onBoardingImg2,
    subTitle1: 'Swift and secure delivery to your location',
    subTitle2:
      'Be rest assured that your delivery arrives to you promptly and safely.',
  },
  {
    key: 3,
    image: IMAGES.onBoardingImg3,
    subTitle1: 'Dependable client services',
    subTitle2:
      'Enjoy 24/7 reliable customer support for booking issues and other enquires.',
  },
];

export const UserSelectionTypeData = [
  {key: 2, label: 'Customer'},
  {key: 3, label: 'Healthcare providers'},
  {key: 4, label: 'Vendors'},
  {key: 5, label: 'Suppliers'},
];

export const screenAnimation = {
  showModal: {
    enter: {
      enabled: true,
      alpha: {
        from: 0,
        to: 1,
        duration: 300,
      },
    },
    exit: {
      enabled: true,
      alpha: {
        from: 1,
        to: 0,
        duration: 300,
      },
    },
  },
};

export const bottomTab = [
  {
    name: 'Home',
    component: HomeStackNavigator,
  },
  {
    name: 'My Order',
    component: MyOrderStackNavigator,
  },
  {
    name: 'Notification',
    component: NotificationStackNavigator,
  },
  {
    name: 'Profile',
    component: ProfileStackNavigator,
  },
];

export const initialPickupData = [
  {
    key: 1,
    label: 'Orders From Stores',
  },
  {
    key: 2,
    label: 'Packages from friends',
  },
  {
    key: 3,
    label: 'Flowers for your loved ones',
  },
  {
    key: 4,
    label: 'Or something to eat',
  },
];

export const walletData = [
  {
    key: 1,
    svg: <SendSVGComponent />,
    navScreen: 'SendCashScreen',
    label: 'Send',
  },
  {key: 2, svg: <WithDrawSVGComponent />, navScreen: '', label: 'Withdraw'},
  // {
  //   key: 3,
  //   svg: <PaymentSVGComponent />,
  //   navScreen: 'PaymentScreen',
  //   label: 'Payment',
  // },
  // {key: 4, svg: <MoreSVGComponent />, navScreen: '', label: 'More'},
];

export const signInValidation = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Incorrect email.'),
});

export const signUpValidation = Yup.object().shape({
  first_name: Yup.string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'First Name must contain only characters'),
  last_name: Yup.string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Last Name must contain only characters'),
  email: Yup.string().required('Email is required').email('Incorrect email.'),
  contact_number: Yup.string().required('Mobile no is required'),
  role: Yup.object().nullable().required('Role is required'),
  password: Yup.string().required('Password is required').min(8),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  location: Yup.string().required('Location is required'),
});

export const forgotEmailValidation = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Incorrect email.'),
});
export const amountValidation = Yup.object().shape({
  amount: Yup.string().required('Amount is required'),
});

export const resetValidation = Yup.object({
  password: Yup.string().required('Password is required').min(8),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const changePasswordValidation = Yup.object({
  password: Yup.string().required('Old Password is required').min(8),
  new_password: Yup.string().required('New Password is required'),
  confirmNewPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
});

export const createShopValidation = Yup.object().shape({
  shop_title: Yup.string().required('Shop title is required'),
  shop_tagline: Yup.string().required('Shop tagline is required'),
  shop_about: Yup.string().required('About shop is required'),
  facebook_url: Yup.string().required('Facebook url is required'),
  twitter_url: Yup.string().required('Twitter url is required'),
  shop_location: Yup.string().required('Shop location is required'),
  shop_email: Yup.string()
    .required('Email is required')
    .email('Incorrect email.'),
  shop_whatsapp: Yup.string().required('Shop whatsapp no is required'),
});

export const createDiscountValidation = Yup.object().shape({
  discount_title: Yup.string().required('Discount title is required'),
  discount_code: Yup.string().required('Discount code is required'),
  start_date: Yup.string().required('Start date code is required'),
  end_date: Yup.string().required('End date is required'),
  discount_percent: Yup.string().required('Discount percent is required'),
  selected_products: Yup.object().nullable().required('Products is required'),
});

export const newInventoryValidation = Yup.object().shape({
  selling_price: Yup.string().required('Selling price is required'),
  re_order_level: Yup.string().required('Re-order level is required'),
  cost_price: Yup.string().required('Cost price is required'),
  quantity: Yup.string().required('Quantity is required'),
  product_id: Yup.object().nullable().required('Products is required'),
});

export const createBranchValidation = Yup.object().shape({
  branch_name: Yup.string().required('Branch name is required'),
  branch_location: Yup.string().required('Branch location is required'),
  manager_name: Yup.string().required('Manager name code is required'),
  manager_email: Yup.string()
    .required('Manager email is required')
    .email('Incorrect email.'),
  manager_password: Yup.string()
    .required('Manager password email is required')
    .min(8),
});

export const createdSupplierValidation = Yup.object().shape({
  company_name: Yup.string().required('Company name is required'),
  company_email: Yup.string()
    .required('Company email is required')
    .email('Incorrect email.'),
  company_phone: Yup.string().required('Company phone code is required'),
  contact_firstname: Yup.string().required('Contact first name is required'),
  contact_lastname: Yup.string().required('Contact last name is required'),
  contact_email: Yup.string()
    .required('Contact email is required')
    .email('Incorrect email.'),
  contact_phone: Yup.string().required('Contact phone is required'),
  company_address: Yup.string().required('Company address is required'),
  company_website: Yup.string().required('Company website is required'),
});

export const createSupportValidation = Yup.object().shape({
  ticket_title: Yup.string().required('Ticket title is required'),
  ticket_desc: Yup.string().required('Ticket description is required'),
});

export const reInitializationValidation = Yup.object().shape({
  reorder_quantity: Yup.string().required('Reorder quantity is required'),
});

export const createStockValidation = Yup.object().shape({
  selected_quantities: Yup.string().required('Quantity is required'),
  selected_products: Yup.object().nullable().required('Products is required'),
  source_branch: Yup.object().nullable().required('Source branch is required'),
  destination_branch: Yup.object()
    .nullable()
    .required('Destination branchis required'),
});

export const createProductValidation = Yup.object().shape({
  product_description: Yup.string().required('Product description is required'),
  subcategories: Yup.object().nullable().required('Sub-categories is required'),
  category_id: Yup.object().nullable().required('Categories is required'),
  product_name: Yup.string().required('Product name is required'),
});

export const changeStatus = Yup.object().shape({
  order_status: Yup.object().nullable().required('Role is required'),
});

export const createAdminValidation = Yup.object().shape({
  admin_name: Yup.string().required('Admin name is required'),
  admin_password: Yup.string()
    .required('Admin password location is required')
    .min(8),
  admin_email: Yup.string()
    .required('Admin email is required')
    .email('Incorrect email.'),
});

export const fromCamera = async type => {
  let options = {
    mediaType: type,
    quality: 1,
    videoQuality: Platform.OS === 'ios' ? 'medium' : 'low',
  };

  if (type === 'photo') {
    delete options.videoQuality;
  } else {
    delete options.quality;
  }

  let isCameraPermitted = await RequestCameraPermission();
  let isStoragePermitted = await RequestExternalWritePermission();
  if (isCameraPermitted && isStoragePermitted) {
    return launchCamera(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.errorCode === 'camera_unavailable') {
        return;
      } else if (response.errorCode === 'permission') {
        return;
      } else if (response.errorCode === 'others') {
        return;
      }

      return response;
    });
  }
};

export const RequestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

export const RequestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
    return false;
  } else {
    return true;
  }
};
