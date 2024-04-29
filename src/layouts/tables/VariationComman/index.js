import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModal,
  showNotification,
  setcollapseEditMode,
  setEditedRow,
  setEditedRowIndex,
  setbarcodeId
} from "layouts/redux/modal/slice";
import CustomSwal from "components/CustomSwal";
import { ProductVariationDelete } from "api/ProductVariation";
import { ProductVariationUpdate } from "api/ProductVariation";
import { ProductVariationByID } from "api/ProductVariation";
import { useFormik } from "formik";
import { BarcodeVariationUpdate } from "api/ProductVariation";

function Row({ row, item, columns, handleDelete, handleEdit, row1, FatchProductVariation,barcodeVariationId }) {
  const { collapseEditMode, editedRow, editedRowIndex,variationId,barcodeId } = useSelector(selectModal);
  // console.log('barcodeId: ', barcodeId);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [EditedVariationId, setEditedVariationId] = useState(null);
  const [productId, setproductId] = useState(null);

  // console.log("rowwwwwwwwwwwwwwwww", item)
  // console.log("barcodeVariationId",barcodeVariationId)
  const formik = useFormik({
    initialValues: {
      barcode: "",
      pack_size: "",
      sales_tax: "",
      retail_cost: "",
      pos_margin: "",
      gross_margin: "",
      // avg_cost:"",
    },
    onSubmit: async (values) => {
      const data = {
        barcode_variation_id: barcodeId,
        product_variation_id:variationId,
        barcode: values.barcode,
        pack_size: values.pack_size,
        sales_tax: values.sales_tax,
        retail_cost: values.retail_cost,
        pos_margin: values.pos_margin,
        gross_margin: values.gross_margin,
        // avg_cost:values.avg_cost
      };


      console.log("data: ", data);
      const response = await BarcodeVariationUpdate(data);
      if (response.status === 200) {
        dispatch(
          showNotification({
            title: "Success",
            message: response?.data?.message,
            status: "success",
            isOpen: true,
          })
        );
        setOpen(false);
        FatchProductVariation();
      } else {
        dispatch(
          showNotification({
            title: "Error",
            message: response?.data?.message,
            status: "error",
            isOpen: true,
          })
        );
      }
    },
  });
  // console.log("formik",formik)

  const handleEditInput = async (
    id,
    barcode,
    pack_size,
    sales_tax,
    retail_cost,
    pos_margin,
    gross_margin,
    barcode_variation_id,
    productss_id
  ) => {
    // console.log("barcode_variation_id",barcode_variation_id)
    // setEditedVariationId(id);
    dispatch(setbarcodeId(id))
    // setproductId(productss_id)
    formik.setValues({
      barcode,
      pack_size,
      sales_tax,
      retail_cost,
      pos_margin,
      gross_margin,
    });
  };


  const handleRowClick = () => {
    setOpen(!open);
  };


  return (
    <>
      <TableRow onClick={handleRowClick}>
        <TableCell style={{ width: "10%" }}>
          <IconButton size="small">
            {open ? (
              <>{item?.variation_data.length > 1 ? <KeyboardArrowUpIcon /> : ""}</>
            ) : (
              <>{item?.variation_data.length > 1 ? <KeyboardArrowDownIcon /> : ""}</>
            )}
          </IconButton>
        </TableCell>
        {columns.map((column) => (
          <TableCell key={column.id} style={{ width: column.width }}>
            {row[column.id]}
          </TableCell>
        ))}
        <TableCell>
          {/* {console.log("row????????????????????/: ", item)} */}
          <IconButton aria-label="edit" onClick={() => handleEdit(item.product_variation_id)}>
            <EditIcon style={{ color: "#3c7ae1" }} />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(item.product_variation_id)}>
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, padding: 0 }} colSpan={columns.length + 2}>
          <form onSubmit={formik.handleSubmit}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {/* {console.log("item>>>>>>>>>>>", item)} */}
                  {item?.variation_data?.slice(1).map((variation) => {
                    return (
                      <>
                        <>
                          <TableRow key={variation}>
                            {/* {console.log("variation",variation)} */}
                            <TableCell style={{ width: "10%" }}></TableCell>

                            <TableCell style={{ width: "15%" }}>
                              {barcodeId === variation.barcode_variation_id ? (
                                <input
                                  className="commantable_input"
                                  name="barcode"
                                  type="number"
                                  value={formik.values.barcode}
                                  onChange={formik.handleChange}
                                />
                              ) : (
                                variation.barcode
                              )}
                            </TableCell>
                            <TableCell style={{ width: "10%" }}>
                              {barcodeId === variation.barcode_variation_id ? (
                                <input
                                  className="commantable_input"
                                  type="text"
                                  name="pack_size"
                                  value={formik.values.pack_size}
                                  onChange={formik.handleChange}
                                />
                              ) : (
                                variation.pack_size
                              )}
                            </TableCell>
                            <TableCell style={{ width: "10%" }}>
                              {barcodeId === variation.barcode_variation_id ? (
                                <input
                                  className="commantable_input"
                                  type="number"
                                  name="sales_tax"
                                  value={formik.values.sales_tax}
                                  onChange={formik.handleChange}
                                />
                              ) : (
                                variation.sales_tax
                              )}
                            </TableCell>
                            <TableCell style={{ width: "10%" }}>
                              {barcodeId === variation.barcode_variation_id ? (
                                <input
                                  className="commantable_input"
                                  type="number"
                                  name="retail_cost"
                                  value={formik.values.retail_cost}
                                  onChange={formik.handleChange}
                                />
                              ) : (
                                variation.retail_cost
                              )}
                            </TableCell>
                            <TableCell style={{ width: "10%" }}>
                              {barcodeId === variation.barcode_variation_id ? (
                                <input
                                  className="commantable_input"
                                  type="number"
                                  name="pos_margin"
                                  value={formik.values.pos_margin}
                                  onChange={formik.handleChange}
                                />
                              ) : (
                                variation.pos_margin
                              )}
                            </TableCell>
                            <TableCell style={{ width: "10%" }}>
                              {barcodeId === variation.barcode_variation_id ? (
                                <input
                                  className="commantable_input"
                                  type="number"
                                  name="gross_margin"
                                  value={formik.values.gross_margin}
                                  onChange={formik.handleChange}
                                />
                              ) : (
                                variation.gross_margin
                              )}
                            </TableCell>
                            <TableCell>
                              {barcodeId === variation.barcode_variation_id ? (
                                <IconButton
                                  aria-label="save"
                                  type="submit"
                                  onClick={formik.handleSubmit}
                                >
                                  <SaveIcon />
                                </IconButton>
                              ) : (
                                <>
                                  {/* {console.log("row:::::::::::",variation)} */}
                                  <div>
                                    <IconButton
                                      aria-label="edit"
                                      onClick={() =>
                                        handleEditInput(
                                          variation.barcode_variation_id,
                                          variation.barcode,
                                          variation.pack_size,
                                          variation.sales_tax,
                                          variation.retail_cost,
                                          variation.pos_margin,
                                          variation.gross_margin,
                                          // variation.product_variation_id,
                                        )
                                      }
                                    >
                                      <EditIcon style={{ color: "#3c7ae1" }} />
                                    </IconButton>
                                    {/* <IconButton
                                      aria-label="delete"
                                      onClick={() =>
                                        handleDeleteVariation(variation.barcode_variation_id)
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton> */}
                                  </div>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        </>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </Collapse>
          </form>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function VariationTables({
  rows,
  columns,
  handleDelete,
  handleEdit,
  handleEditInput,
}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{ background: "#fdfdf7" }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => {
            return (
              <>
                {item.variation_data?.map((row, index) => {
                  if (index === 0) {
                    return (
                      <>
                      {/* {console.log("row",row)} */}
                        <Row
                          key={row.id}
                          row={row}
                          // rows={rows}
                          item={item}
                          columns={columns}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          handleEditInput={handleEditInput}
                          barcodeVariationId={row.barcode_variation_id}
                          // FatchProductVariation={FatchProductVariation}
                        />
                      </>
                    );
                  }
                })}
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

VariationTables.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleEditInput: PropTypes.object.isRequired,
  barcodeVariationId: PropTypes.func.isRequired,
};

Row.propTypes = {
  barcodeVariationId: PropTypes.func.isRequired,
  item: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  row1: PropTypes.object.isRequired,
  handleEditInput: PropTypes.object.isRequired,
  FatchProductVariation: PropTypes.func.isRequired,
};
