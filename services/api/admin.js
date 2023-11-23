import {axiosApi} from '../axios/axios_config';

export async function createAdmin({adminObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-admin`,
      method: 'POST',
      bodyData: adminObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getAdmin({adminObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `admins`,
      method: 'POST',
      bodyData: adminObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function deleteAdmin({adminObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `delete-admin`,
      method: 'POST',
      bodyData: adminObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
