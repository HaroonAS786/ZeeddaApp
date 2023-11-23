import {axiosApi} from '../axios/axios_config';

export async function changePassword({passwordObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `update-password`,
      method: 'POST',
      bodyData: passwordObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function updateProfile({profileObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `update-profile`,
      method: 'POST',
      bodyData: profileObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
