import {axiosApi} from '../axios/axios_config';

export async function getInventory({InventoryObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `manage-inventory`,
      method: 'POST',
      bodyData: InventoryObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function createInventory({InventoryObject}) {
  try {
    console.log('Inventory---Object', InventoryObject);
    const {data, response} = await axiosApi({
      endpoint: `create-inventory`,
      method: 'POST',
      bodyData: InventoryObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
