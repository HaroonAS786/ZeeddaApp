import {axiosApi} from '../axios/axios_config';

export async function getBranchListing({branchObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `branch-listing`,
      method: 'POST',
      bodyData: branchObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function createBranch({branchObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-branch`,
      method: 'POST',
      bodyData: branchObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function deleteBranch({branchObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `delete-branch`,
      method: 'POST',
      bodyData: branchObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
