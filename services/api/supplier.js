import {axiosApi} from '../axios/axios_config';

export async function createSupplier({supplierObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-supplier`,
      method: 'POST',
      bodyData: supplierObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getSuppliers({SupplierObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `supplier-listing`,
      method: 'POST',
      bodyData: SupplierObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function deleteSuppliers({SupplierObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `delete-supplier`,
      method: 'POST',
      bodyData: SupplierObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
