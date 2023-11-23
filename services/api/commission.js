import {axiosApi} from '../axios/axios_config';

export async function getCommission({commissionObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `commissions`,
      method: 'POST',
      bodyData: commissionObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
