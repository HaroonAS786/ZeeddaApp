import {axiosApi} from '../axios/axios_config';

export async function createSupportTickets({createSupportTicket}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `create-ticket`,
      method: 'POST',
      bodyData: createSupportTicket,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getUserTickets({TicketObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `user-tickets`,
      method: 'POST',
      bodyData: TicketObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function deleteUserTickets({TicketObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `delete-ticket`,
      method: 'POST',
      bodyData: TicketObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
