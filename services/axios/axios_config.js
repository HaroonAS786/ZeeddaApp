import axios from 'axios';

//Do not add "/" at the API_URL end
// export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_URL = 'https://devstaging.zeedda.com/v2/api';

export async function axiosApi({
  endpoint,
  method = 'GET',
  bodyData,
  contentType = null,
  Authorization,
}) {
  try {
    const result = await axios.request({
      url: `${API_URL}/${endpoint}`,
      method,
      ...(method !== 'DELETE' && {
        data:
          method === 'PUT' || method === 'POST' || method === 'PATCH'
            ? bodyData
            : null,
      }),
      headers: {
        Authorization: Authorization ? Authorization : null,
        Accept: 'application/json',
        'Content-Type': contentType ? contentType : 'application/json',
      },
      // withCredentials: true,
    });

    const {data, ...response} = result;
    return {data, response};
  } catch (error) {
    const {response, request, message} = error;
    if (response?.status === 403) {
      window.location.href = '/auth/login';
      // Cookies.remove('userInfo');
    } else if (error.request) {
      console.log('The request was made but no response was received');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('message', message);
    }
    console.log('message', message);
    throw error;
  }
}
