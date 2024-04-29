import VariationTables from "layouts/tables/VariationComman";
import { TableContainer, Paper } from "@mui/material";
import { ProductVariationList } from "api/ProductVariation";
import { Button, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { useFormik } from "formik";
import React, { useContext, useState, useEffect } from "react";
import { ProductAdd } from "api/product";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ProductVariationInitialValue,
  ProductVariationSchemas,
  EditProductVariationInitialValue,
} from "../validation";
import {
  selectModal,
  showNotification,
  setproductEdit,
  setcollapseEditMode,
  setEditedRow,
  setEditedRowIndex,
  setvariationId,
  setbarcodeId,
} from "layouts/redux/modal/slice";
import { Formik, Form, Field, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import { ProductVariationAdd } from "api/ProductVariation";
import { ProductVariationDelete } from "api/ProductVariation";
import CustomSwal from "components/CustomSwal";
import { ProductVariationByID } from "api/ProductVariation";
import { ProductVariationUpdate } from "api/ProductVariation";
import { PopupContext } from "context/Popup";
import { useNavigate } from "react-router-dom";

const ProductVariation = ({ productId }) => {
  const [productVariationData, setproductVariationData] = useState([]);
  // console.log('productVariationData: ', productVariationData);
  const [productVariationGetData, setproductVariationGetData] = useState([]);
  const { setNotification, productList, fatchProductData } = useContext(PopupContext);
  const { edit, productEdit, editedRowIndex, variationId, barcodeId } = useSelector(selectModal);
  // console.log("barcodeId: ", barcodeId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate((-1))
  // }

  const FatchProductVariation = async () => {
    const response = await ProductVariationList();
    // console.log('response>>>>>>>>>>>>: ', response);
    if (response.status === 200) {
      const formatedData = response.data.data.map((item) => ({
        ...item,
        pack_size: item.pack_size || "Each",
      }));
      setproductVariationData(formatedData);
    }
  };

  useEffect(() => {
    FatchProductVariation();
  }, []);

  const columns = [
    { id: "barcode", label: "Barcode", width: "15%" },
    // { id: "size", label: "Size", width: "10%" },
    { id: "pack_size", label: "Pack Size", width: "10%" },
    { id: "sales_tax", label: "Sales Tax", width: "10%" },
    { id: "retail_cost", label: "Retail Cost", width: "10%" },
    { id: "pos_margin", label: "Pos Margin", width: "10%" },
    { id: "gross_margin", label: "Gross Margin", width: "10%" },
  ];

  // const [variationId, setvariationId] = ("")
  const onSubmit = async (values) => {
    // product add api
    let res;
    if (!productId?.id) {
      res = await ProductAdd(productId);
      if (res.status === 200) {
        fatchProductData();
      }
    } else {
      // console.log("????????????");
    }

    const variationData = values?.productInputField.map((item) => ({
      pack_size: item?.pack_size || "Each",
      quantity: item?.quantity,
      avg_cost: item?.avg_cost,
      retail_cost: item?.retail_cost,
      sales_tax: item?.sales_tax,
      pos_margin: item?.pos_margin,
      gross_margin: item?.gross_margin,
      barcode: item?.barcode,
      barcode_variation_id: item?.barcode_variation_id,
      product_variation_id: values?.product_variation_id,
      // id:item?.id,
    }))
    // console.log("variationData",variationData?.pack_size)

    const obj = {
      product_variation_size: values.product_variation_size,
      variation_code: values?.variation_code,
      product_id: res?.data?.data?.id,
      product_variation_id: values?.product_variation_id,
      size: values?.size,
      variation_data:variationData,

    };
    // setvariationId(obj?.product_variation_id)
    dispatch(setvariationId(obj?.product_variation_id));
  

    // product variation add api
    let response;
    if (!obj?.product_variation_id) {
      response = await ProductVariationAdd(obj);
      if (response.status === 200) {
        dispatch(
          showNotification({
            title: "Success",
            message: response?.data?.message,
            status: "success",
            isOpen: true,
          })
        );
        FatchProductVariation();
      }
      // console.log("res", response);
    } else {
      // console.log("obj: ", obj?.product_id);
      const response = await ProductVariationUpdate(obj);
      if (response.status === 200) {
        dispatch(
          showNotification({
            title: "Success",
            message: response?.data?.message,
            status: "success",
            isOpen: true,
          })
        );
        FatchProductVariation();
      } else {
        dispatch(
          showNotification({
            title: "Error",
            message: deleteResponse?.data?.message,
            status: "error",
            isOpen: true,
          })
        );
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await CustomSwal("Delete!", "Do you want to Delete", "skyblue", "red");
    if (confirmDelete.isConfirmed) {
      const deleteResponse = await ProductVariationDelete(id);
      if (deleteResponse.status === 200) {
        FatchProductVariation();
        dispatch(
          showNotification({
            title: "Success",
            message: deleteResponse?.data?.message,
            status: "success",
            isOpen: true,
          })
        );
      } else {
        dispatch(
          showNotification({
            title: "Error",
            message: deleteResponse?.data?.message,
            status: "error",
            isOpen: true,
          })
        );
      }
    }
  };

  const handleEdit = async (id, variation, index) => {
    const response = await ProductVariationByID(id);
    let myeditdata = response?.data?.data;
    if (response.status === 200) {
      dispatch(setcollapseEditMode(true));
      dispatch(setproductEdit(response?.data?.data));
      setproductVariationGetData(myeditdata);
    }
  };

  const handleEditInput = async (id, variation, index) => {
    dispatch(setEditedRowIndex(index));
    dispatch(setEditedRow(variation));
  };

  return (
    <>
      <SoftBox>
        <Formik
          enableReinitialize
          initialValues={
            edit
              ? {
                  ...EditProductVariationInitialValue,
                  ...productEdit,
                  productInputField: productVariationGetData?.variation_data?.length
                    ? productVariationGetData?.variation_data
                    : [{}],
                }
              : ProductVariationInitialValue
          }
          validationSchema={ProductVariationSchemas}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <label>Variation Code*</label>
                  <SoftInput
                    type="number"
                    name="variation_code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.variation_code}
                  />
                  {formik.touched.variation_code && formik.errors.variation_code && (
                    <div className="error">{formik.errors.variation_code}</div>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <label>Product variation Size*</label>
                  <SoftInput
                    name="product_variation_size"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.product_variation_size}
                  />
                  {formik.touched.product_variation_size &&
                    formik.errors.product_variation_size && (
                      <div className="error">{formik.errors.product_variation_size}</div>
                    )}
                </Grid>

                <Grid item xs={6}>
                  <label>Product Size*</label>
                  <SoftInput
                    name="size"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.size}
                  />
                  {formik.touched.size && formik.errors.size && (
                    <div className="error">{formik.errors.size}</div>
                  )}
                </Grid>
              </Grid>

              <div style={{ marginTop: "40px" }}>
                <FieldArray
                  name="productInputField"
                  render={(arrayHelpers) => (
                    <div style={{ overflowX: "auto" }}>
                      {formik?.values?.productInputField?.map((value, index) => (
                        <div key={index}>
                          <div style={{ marginTop: "10px" }}>
                            <input
                              className="productInputField"
                              name={`productInputField[${index}].pack_size`}
                              type="text"
                              placeholder="Pack Size"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={
                                index === 0
                                  ? "Each"
                                  : formik?.values?.productInputField[index]?.pack_size || ""
                              }
                              readOnly
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].quantity`}
                              placeholder="Quantity"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values.productInputField[index]?.quantity || ""}
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].avg_cost`}
                              placeholder="Avg Cost"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values?.productInputField[index]?.avg_cost || ""}
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].retail_cost`}
                              placeholder="Retail Cost"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values?.productInputField[index]?.retail_cost || ""}
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].sales_tax`}
                              placeholder="Sales Tax"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values?.productInputField[index]?.sales_tax || ""}
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].pos_margin`}
                              placeholder="Pos Margin"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values?.productInputField[index]?.pos_margin || ""}
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].gross_margin`}
                              placeholder="Gross Margin"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values?.productInputField[index]?.gross_margin || ""}
                            />
                            <input
                              className="productInputField"
                              type="number"
                              name={`productInputField[${index}].barcode`}
                              placeholder="Barcode"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik?.values?.productInputField[index]?.barcode || ""}
                            />

                            <Button
                              type="button"
                              onClick={() =>
                                arrayHelpers?.push({
                                  pack_size: "Each",
                                  size: "",
                                  quantity: "",
                                  avg_cost: "",
                                  retail_cost: "",
                                  sales_tax: "",
                                  pos_margin: "",
                                  gross_margin: "",
                                  barcode: "",
                                })
                              }
                            >
                              <AddIcon style={{ width: "25px", height: "25px" }} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <SoftBox
                        sx={{ marginTop: "20px", display: "flex", justifyContent: "", bottom: 0 }}
                      >
                        <Button
                          type="submit"
                          variant="gradient"
                          style={{ backgroundColor: "#7676f5", color: "#ffffff" }}
                        >
                          Submit
                        </Button>
                      </SoftBox>
                    </div>
                  )}
                />
              </div>

              <div style={{ marginTop: "40px" }}>
                <VariationTables
                  columns={columns}
                  rows={productVariationData}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleEditInput={handleEditInput}
                  FatchProductVariation={FatchProductVariation}
                />
              </div>
            </form>
          )}
        </Formik>
        {/* <div>
                <SoftBox sx={{ marginTop: "20px", display: "flex", justifyContent: "", bottom: 0 }}>
                  <Button
                  onClick={handleBack}
                    // type="submit"
                    variant="gradient"
                    style={{ backgroundColor: "#7676f5", color: "#ffffff" }}
                  >
                    Back
                  </Button>
                </SoftBox>
              </div> */}
      </SoftBox>
    </>
  );
};

ProductVariation.propTypes = {
  productId: PropTypes.any.isRequired,
  fatchProductData: PropTypes.any.isRequired,
};

export default ProductVariation;
