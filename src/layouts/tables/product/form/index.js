import { Button, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { ProductInitialValues, ProductValidationSchema } from "../validation";
import { ProductAdd } from "api/product";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { selectModal, setOpen, showNotification,setproductId } from "layouts/redux/modal/slice";
import { ProductUpdate } from "api/product";
import MyModal from "components/Modal";
import ProductVariation from "../ProductVarition/form";
import { ProductVariationByID } from "api/ProductVariation";
import { PopupContext } from "context/Popup";
// import { toast } from "react-toastify";

const ProductForm = (props) => {
  const { edit, dataEdit } = useSelector(selectModal);
  const { setNotification,productList,fatchProductData } = useContext(PopupContext);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (edit) {
      formik.setValues(dataEdit);
    }
  }, [dataEdit]);

  const handleOpen = async(value) => {
    setIsOpen(true);
    let obj = {
      article_number:value?.article_number,
      badge:value?.badge,
      id:value?.id ?? "",
      name:value?.name,
      sub_category: value?.sub_category,
      nested_category:value?.nested_category,
      tax:value?.tax,
      category:value?.category
    }
    setproductId(obj)
  };
  
  const [productId, setproductId] = useState([]);

  // formik validation
  const validateAllFields = async () => {
    const allFieldsTouched = Object.keys(formik.values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    formik.setTouched(allFieldsTouched);
    const errors = await formik.validateForm();
    return errors;
  };

  const handleNextButtonClick = async () => {
    const errors = await validateAllFields();
    if (Object.keys(errors).length === 0) {
      handleOpen(formik.values);
    } 
    // else {
    //   console.log("Form has errors", errors);
    // }
  };
  
  const onSubmit = async (value) => {
    // console.log("value",value)
      if(edit){
        const response = await ProductUpdate(value);
        if (response.status === 200) {
          dispatch(setOpen(false));
          fatchProductData();
          dispatch(
            showNotification({
              title: "Success",
              message: response?.data?.message,
              status: "success",
              isOpen: true,
            })
          );
      }
    }
      //   // toast.success(response?.data?.message);
      //   // setNotification({
      //   //   color: "success",
      //   //   icon: "check",
      //   //   title: "Success",
      //   //   content: response.data.message,
      //   //   open: true,
      //   // });
      // }
      //  else {
      //   dispatch(
      //     showNotification({
      //       title: "Error",
      //       message: response?.data?.message,
      //       status: "error",
      //       isOpen: true,
      //     })
      //   );
      // }
    // }
  };

  const formik = useFormik({
    initialValues: edit ? dataEdit : ProductInitialValues,
    validationSchema: ProductValidationSchema,
    onSubmit: onSubmit,
  });
  return (
    <>
      <SoftBox>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <label>Article Number*</label>
              <SoftInput
                type="number"
                name="article_number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.article_number}
              />
              {formik.touched.article_number && formik.errors.article_number ? (
                <div className="error">{formik.errors.article_number}</div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              <label>Product name*</label>
              <SoftInput
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              <label>Category*</label>
              <SoftInput
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              />
              {formik.touched.category && formik.errors.category ? (
                <div className="error">{formik.errors.category}</div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              <label>Sub Category*</label>
              <SoftInput
                name="sub_category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sub_category}
              />
              {formik.touched.sub_category && formik.errors.sub_category ? (
                <div className="error">{formik.errors.sub_category}</div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              <label>Nested Category*</label>
              <SoftInput
                name="nested_category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nested_category}
              />
              {formik.touched.nested_category && formik.errors.nested_category ? (
                <div className="error">{formik.errors.nested_category}</div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              <label>Tex*</label>
              <SoftInput
                name="tax"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tax}
              />
              {formik.touched.tax && formik.errors.tax ? (
                <div className="error">{formik.errors.tax}</div>
              ) : null}
            </Grid>

            <Grid item xs={6}>
              <label>Badge*</label>
              <SoftInput
                name="badge"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.badge}
              />
              {formik.touched.badge && formik.errors.badge ? (
                <div className="error">{formik.errors.badge}</div>
              ) : null}
            </Grid>

            {/* <Grid item xs={12} sm={6}>
            <div className="w-full  mb-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Status*
              </label>
              <div className="relative w-full">
                <select
                  style={{
                    border: "1px solid #d2d2d2",
                    borderRadius: "4px",
                    padding: "6px",
                    outline: "none",
                    width: "100%",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    color: "inherit",
                    backgroundColor: "inherit",
                    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                  }}
                  id="grid-state"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // value={formik.values.status}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Deactive</option>
                </select>
              </div>
              {formik.touched.status && formik.errors.status ? (
                <div className="error">{formik.errors.status}</div>
              ) : null}
            </div>
          </Grid> */}

            {/* <Grid item xs={6}>
            <div style={{ width: "100%"}}>
              <InputLabel htmlFor="grid-state">Status</InputLabel>
              <FormControl sx={{ minWidth: 120 }}>
                <Select
                  value={""}
                  onChange={formik.handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.status && formik.errors.status && (
                <div style={{ color: "#f44336", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  {formik.errors.status}
                </div>
              )}
            </div>
          </Grid> */}
          </Grid>
          {
            edit && (
          <SoftBox sx={{ marginTop: "20px", display: "flex", justifyContent: "center", bottom: 0 }}>
            <Button
              type="submit"
              variant="gradient"
              style={{ backgroundColor: "#7676f5", color: "#ffffff" }}
            >
              Update
            </Button>
          </SoftBox>
            )
          }
        </form>
          <SoftBox sx={{ marginTop: "20px", display: "flex", justifyContent: "end", bottom: 0 }}>
            <Button
              type="submit"
              variant="gradient"
              style={{ backgroundColor: "#7676f5", color: "#ffffff" }}
              onClick={handleNextButtonClick}
            >
              Next
            </Button>
            {isOpen && (
              <MyModal modalhead={`${edit ? "Edit" : "Add"} Product Variation`}>
                <ProductVariation  productId={productId}/>
              </MyModal>
            )}
          </SoftBox>
         
      </SoftBox>
      {/* <ToastContainer /> */}
    </>
  );
};

ProductForm.propTypes = {
  fatchProductData: PropTypes.func.isRequired,
};

export default ProductForm;
