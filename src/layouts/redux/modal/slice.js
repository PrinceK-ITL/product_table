import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    open: false,
    edit: false,
    dataEdit: [],
    showFilter:false,
    productEdit:[],
    snackbar: {
      title: "",
      message: "",
      status: "",
      isOpen: false,
    },
    collapseEditMode:false,
    editedRow:null,
    editedRowIndex:null,
    productId:[],
    variationId:"",
    barcodeId:""
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    editFrom: (state, action) => {
      state.edit = action.payload;
    },
    setDataEdit: (state, action) => {
      state.dataEdit = action.payload;
    },
    setshowFilter: (state, action) => {
      state.showFilter = action.payload;
    },
    showNotification: (state, action) => {
      state.snackbar = action.payload;
    },
    setproductEdit: (state, action) => {
      state.productEdit = action.payload;
    },
    setcollapseEditMode: (state, action) => {
      state.collapseEditMode = action.payload;
    },
    setEditedRow: (state, action) => {
      state.editedRow = action.payload;
    },
    setEditedRowIndex: (state, action) => {
      state.editedRowIndex = action.payload;
    },
    setproductId: (state, action) => {
      state.productId = action.payload;
    },
    setvariationId: (state, action) => {
      state.variationId = action.payload;
    },
    setbarcodeId: (state, action) => {
      state.barcodeId = action.payload;
    },
  },
});

export const { setOpen, editFrom,setproductId,setbarcodeId,setvariationId, setDataEdit,setshowFilter,showNotification,setproductEdit,setcollapseEditMode,setEditedRow,setEditedRowIndex } = modalSlice.actions;
export const selectModal = (state) => state.modal;

export default modalSlice.reducer;
