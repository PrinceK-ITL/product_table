import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    edit: false,
    blogDataEdit: [],
    showFilter:false
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    editFrom: (state, action) => {
      state.edit = action.payload;
    },
    setDataEdit: (state, action) => {
      state.blogDataEdit = action.payload;
    },
    setshowFilter: (state, action) => {
      state.showFilter = action.payload;
    },
  },
});

export const { setOpen, editFrom, setDataEdit,setshowFilter } = modalSlice.actions;
export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
