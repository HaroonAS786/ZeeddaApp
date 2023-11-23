import {axiosApi} from '../axios/axios_config';

export async function signup({signUpObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `register`,
      method: 'POST',
      bodyData: signUpObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function logIn(values) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `login`,
      method: 'POST',
      bodyData: values,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function forgotEmailVerification(value) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `forgot-password-otp`,
      method: 'POST',
      bodyData: value,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function codeConformation(value) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `confirm-email-registration-otp`,
      method: 'POST',
      bodyData: value,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function updateForgotPassword(value) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `forgot-password-update`,
      method: 'POST',
      bodyData: value,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function signUptEmailVerification(value) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `email-registration-otp`,
      method: 'POST',
      bodyData: value,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
