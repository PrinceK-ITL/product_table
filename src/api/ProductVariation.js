import { callPostApi, callGetApi, callPutApi, callDeleteApi } from "./api";

export async function ProductVariationList(data) {
  try {
    const response = await callPostApi({ url: "product_variations/list", body: data });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ProductVariationByID(id) {
  try {
    const response = await callGetApi({ url: `product_variations/${id}` });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ProductVariationAdd(data) {
  try {
    const response = await callPostApi({ url: "product_variations/add", body: data });
    return response;
  } catch (error) {
    throw error;
  }
}


export async function ProductVariationDelete(id) {
  try {
    const response = await callDeleteApi({ url: `product_variations/delete/${id}`});
    return response;
  } catch (error) {
    throw error;
  }
}


export async function ProductVariationUpdate(data) {
  try {
    const response = await callPutApi({ url: "product_variations/update", body:data});
    return response;
  } catch (error) {
    throw error;
  }
}


export async function BarcodeVariationUpdate(data) {
  try {
    const response = await callPutApi({ url: "product_variations/update/barcode_variation", body:data});
    return response;
  } catch (error) {
    throw error;
  }
}
