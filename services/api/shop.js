import {axiosApi} from '../axios/axios_config';

export async function createShop({createShop}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-shop`,
      method: 'POST',
      bodyData: createShop,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getShop({user_id}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `shop`,
      method: 'POST',
      bodyData: user_id,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
