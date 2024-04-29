import axios from "axios";
import { json } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

//  PostAPI  //
export async function callPostApi({ url, body, headers }) {
  let authHeader = localStorage.getItem("authorization")
    ? { authorization:localStorage.getItem("authorization") }
    : {};
  try {
    const result = await axios({
      url: API_URL + url,
      method: "POST",
      headers: { ...headers, },
      data: body,
      timeout: 120000,
    });
    return result;
  } catch (error) {
    // throw error;
    if (error && error.response) {
      return error.response;
    }
  }
}

//  GETAPI  //
export async function callGetApi({ url, body, headers }) {
  let authHeader = localStorage.getItem("authorization")
    ? { authorization: localStorage.getItem("authorization") }
    : {};
  try {
    const result = await axios({
      url: API_URL + url,
      method: "GET",
      headers: { ...headers, },
      data: body,
      timeout: 120000,
    });
    return result;
  } catch (error) {
    // throw error;
    if (error && error.response) {
      return error.response;
    }
  }
}

//  PUTAPI  //
export async function callPutApi({ url, body, headers }) {
  let authHeader = localStorage.getItem("authorization")
    ? { authorization: localStorage.getItem("authorization") }
    : {};
  try {
    const result = await axios({
      url: API_URL + url,
      method: "PUT",
      headers: { ...headers, },
      data: body,
      timeout: 120000,
    });
    return result;
  } catch (error) {
    // throw error;
    if (error && error.response) {
      return error.response;
    }
  }
}

// DELETEAPI //
export async function callDeleteApi({ url, body, headers }) {
  let authHeader = localStorage.getItem("authorization")
    ? { authorization: localStorage.getItem("authorization") }
    : {};
  try {
    const result = await axios({
      url: API_URL + url,
      method: "DELETE",
      headers: { ...headers,},
      data: body,
      timeout: 120000,
    });
    return result;
  } catch (error) {
    // throw error;
    if (error && error.response) {
      return error.response;
    }
  }
}
