import { callPostApi, callGetApi, callPutApi, callDeleteApi } from "./api";

export async function ProductList(data) {
  try {
    const response = await callPostApi({ url: "products/list",body:data });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ProductAdd(data) {
  try {
    const response = await callPostApi({ url: "products/add", body: data });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ProductDelete(id) {
  try {
    const response = await callDeleteApi({ url: `products/delete/${id}` });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ProductGetByid(id) {
  try {
    const response = await callGetApi({ url: `products/${id}` });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ProductUpdate(data) {
  try {
    const response = await callPutApi({ url: "products/update", body: data });
    return response;
  } catch (error) {
    throw error;
  }
}
