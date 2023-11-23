import {axiosApi} from '../axios/axios_config';

export async function getWalletAmount({walletObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `user-wallet`,
      method: 'POST',
      bodyData: walletObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
