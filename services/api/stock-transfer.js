import {axiosApi} from '../axios/axios_config';

export async function createStockTransfer({stockObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-stock-transfer`,
      method: 'POST',
      bodyData: stockObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getStocks({StockObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `stock`,
      method: 'POST',
      bodyData: StockObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
