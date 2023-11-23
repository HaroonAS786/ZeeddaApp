import {axiosApi} from '../axios/axios_config';

export async function getHealthHubListing({HealthHubObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `health-hub-listing`,
      method: 'POST',
      bodyData: HealthHubObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getHealthHubDetail({HealthHubObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `health-hub-view`,
      method: 'POST',
      bodyData: HealthHubObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getTradeHubListing({TradeObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `trade-hub-listing`,
      method: 'POST',
      bodyData: TradeObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getTradeHubDetail({TradeObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `trade-hub-view`,
      method: 'POST',
      bodyData: TradeObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getB2BHubListing({B2BObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `b2b-hub-listing`,
      method: 'POST',
      bodyData: B2BObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getB2BHubDetail({B2BObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `b2b-hub-view`,
      method: 'POST',
      bodyData: B2BObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
