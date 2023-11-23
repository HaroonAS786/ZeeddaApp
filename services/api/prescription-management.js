import {axiosApi} from '../axios/axios_config';

export async function getPrescriptions({prescriptionObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `prescriptions`,
      method: 'POST',
      bodyData: prescriptionObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
