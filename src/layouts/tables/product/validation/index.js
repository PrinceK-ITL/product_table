import * as Yup from "yup";

export const ProductInitialValues = {
  article_number: "",
  name:"",
  category:"",
  sub_category:"",
  nested_category:"",
  tax:"",
  badge:"",
  // status:""
};

export const ProductValidationSchema = Yup.object({
  article_number: Yup.number().required("Article number is required"),
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
  sub_category: Yup.string().required("Sub category is required"),
  nested_category: Yup.string().required("Nested category is required"),
  tax: Yup.string().required("Tax is required"),
  badge: Yup.string().required("Badge is required"),
  // status: Yup.number().required("Status is required").oneOf([0, 1], "Status must be either 0 or 1")
});
