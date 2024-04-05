import { Button, Grid, TextField } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import React from "react";

const ProductForm = () => {
  return (
    <SoftBox>
      <form onSubmit={""}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

          <Grid item xs={6}>
            <label>Product name</label>
            <SoftInput name="Product name" />
          </Grid>

        </Grid>
          <SoftBox sx={{ marginTop: "20px", display: "flex", justifyContent: "center", bottom: 0 }}>
          <Button
            type="submit"
            variant="gradient"
            style={{ backgroundColor: "#7676f5", color: "#ffffff" }}
            // onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </SoftBox>
      </form>
    </SoftBox>
  );
};

export default ProductForm;
