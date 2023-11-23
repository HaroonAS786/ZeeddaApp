import {axiosApi} from '../axios/axios_config';

export async function AppData() {
  try {
    const {data, response} = await axiosApi({
      endpoint: `app-data`,
      method: 'GET',
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
