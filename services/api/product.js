import {axiosApi} from '../axios/axios_config';

export async function getProduct({userId}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `products`,
      method: 'POST',
      bodyData: userId,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getAllProducts({productObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `all-shops-products`,
      method: 'POST',
      bodyData: productObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function createProducts({productObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `register-product`,
      method: 'POST',
      bodyData: productObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
