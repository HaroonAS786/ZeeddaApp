import {axiosApi} from '../axios/axios_config';

export async function getOrderListing({orderObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `my-orders-listing`,
      method: 'POST',
      bodyData: orderObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getAllTrackingListing({orderObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `all-tracking-orders`,
      method: 'POST',
      bodyData: orderObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getCustomerOrderListing({customerOrderObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `customer-orders-listing`,
      method: 'POST',
      bodyData: customerOrderObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getCustomerShippingListing({customerShippingObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `shipping-orders`,
      method: 'POST',
      bodyData: customerShippingObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getShippingDetail({shippingObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `shippment-detail`,
      method: 'POST',
      bodyData: shippingObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function changeOrderStatus({ChangeStatusObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `change-order-status`,
      method: 'POST',
      bodyData: ChangeStatusObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getReOrderListing({reOrderObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `reorder-listing`,
      method: 'POST',
      bodyData: reOrderObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function addToCartItem({addToCart}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `add-to-cart`,
      method: 'POST',
      bodyData: addToCart,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function getCartItem({userId}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `user-cart`,
      method: 'POST',
      bodyData: userId,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function postReorderInitialize({reorderObject}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `reorder-initialize`,
      method: 'POST',
      bodyData: reorderObject,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function postPromoCode({objectCode}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `verify-promo`,
      method: 'POST',
      bodyData: objectCode,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}

export async function placeOrder({Checkout}) {
  try {
    const {data, response} = await axiosApi({
      endpoint: `place-order`,
      method: 'POST',
      bodyData: Checkout,
    });
    return {data, response};
  } catch (err) {
    throw err;
  }
}
