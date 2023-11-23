import {axiosApi} from '../axios/axios_config';

export async function createDiscount({discountObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-discount`,
      method: 'POST',
      bodyData: discountObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getDiscount({discountObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `user-discounts`,
      method: 'POST',
      bodyData: discountObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function deleteDiscount({discountObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `delete-discount`,
      method: 'POST',
      bodyData: discountObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
