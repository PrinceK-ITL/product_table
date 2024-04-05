import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "../redux/modal/slice"

export const store = configureStore({
    reducer:{
      modal:modelReducer,
    }
  })