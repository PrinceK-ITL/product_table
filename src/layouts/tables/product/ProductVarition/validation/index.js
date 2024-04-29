import * as Yup from "yup";

export const ProductVariationInitialValue = {
  product_variation_size: "",
  size: "",
  variation_code: "",
  productInputField: [
    {
      pack_size: "",
      barcode_variation_id:"",
      product_variation_id:"",
      size: "",
      quantity: "",
      avg_cost: "",
      retail_cost: "",
      sales_tax: "",
      pos_margin: "",
      gross_margin: "",
      barcode: "",
    },
  ],
};

export const EditProductVariationInitialValue = {
  barcode: "",
  product_variation_size:"",
  size: "",
  productInputField: [
    {
      pack_size: "",
      size: "",
      barcode_variation_id:"",
      product_variation_id:"",
      quantity: "",
      avg_cost: "",
      retail_cost: "",
      sales_tax: "",
      pos_margin: "",
      gross_margin: "",
      variation_code: "",
      barcode: "",
    },
  ],
};

export const ProductVariationSchemas = Yup.object({
  variation_code: Yup.number().required("Variation code is required"),
  product_variation_size: Yup.string().required("Product Variation Size is required"),
  size: Yup.string().required("Size is required"),
});
