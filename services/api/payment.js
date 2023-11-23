import {axiosApi} from '../axios/axios_config';

export async function getPaymentListing({paymentObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `payments`,
      method: 'POST',
      bodyData: paymentObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
