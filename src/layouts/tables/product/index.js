import { Button, Card, Dialog, Slide } from "@mui/material";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/Table";
import RightSlideModal from "layouts/RightSlideModal";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from "../../../assets/images/edit.svg";
import DeleteIcon from "../../../assets/images/Trash.svg";
import ProductForm from "./form";
import MyModal from "components/Modal";
import { ProductList } from "api/product";
import SoftButton from "components/SoftButton";
import StatusButton from "components/Status";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModal,
  setOpen,
  editFrom,
  setDataEdit,
  showNotification,
  setproductEdit
} from "layouts/redux/modal/slice";
import { ProductDelete } from "api/product";
import CustomSwal from "components/CustomSwal";
import { ProductGetByid } from "api/product";
import { PopupContext } from "context/Popup";
import { ProductVariationByID } from "api/ProductVariation";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Toast from "components/Toast";

// function Transition(props) {
//   return <Slide direction="left" {...props} />;
// }

const ProductTable = () => {
  const { edit } = useSelector(selectModal);
  const dispatch = useDispatch();
  // const [productList, setproductList] = useState([]);
  const { setNotification,productList,fatchProductData } = useContext(PopupContext);

  // const obj = {
  //   // "currentPage": 1,
  //   // "itemsPerPage": 10,
  //   // filters: [
  //   //   {
  //   //     "id": "name",
  //   //     "value": "",
  //   //   },
  //   // ],
  //   sortBy: [
  //     {
  //       id: "id",
  //       desc: true,
  //     },
  //   ],
  // };
  // const fatchProductData = async () => {
  //   const response = await ProductList(obj);
  //   if (response.status === 200) {
  //     setproductList(response?.data?.data?.rows);
  //   }
  // };

  // useEffect(() => {
  //   fatchProductData(obj);
  // }, []);

  // const [filter2, setFilter2] = useState({
  //   name: "",
  // });

  // const handleFilter2 = (accessor, value) => {
  //   setFilter2({ ...filter2, [accessor]: value });
  // };

  const handleEdit = async (id) => {
    // Fetch product details
    const response = await ProductGetByid(id);
    if (response.status === 200) {
      dispatch(setOpen(true));
      dispatch(editFrom(true));
      dispatch(setDataEdit(response?.data?.data));
    }
  
    // Fetch product variations
    // const variationResponse = await ProductVariationByID(id);
    // if (variationResponse.status === 200) {
    //   console.log("response?.data?.data",response?.data?.data?.product_variations)
    //   dispatch(setproductEdit(response?.data?.data));
    // } 
  };
  


  const handleDelete = async (id) => {
    const confirmDelete = await CustomSwal("Delete!", "Do you want to Delete", "skyblue", "red");
    if (confirmDelete.isConfirmed) {
      const deleteResponse = await ProductDelete(id);
      if (deleteResponse.status === 200) {
        fatchProductData();
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

  const dataTableData = {
    isFilter: true,
    columns: [
      {
        Header: " product_name",
        accessor: "name",
        width: "18%",
        // filterValue: filter2.name,
        // filterHandleChange: handleFilter2,
        // filterAccessor: "name",
        // filterInputType: "text",
        // filterLabel: "Search...",
      },
      { Header: "nested_category ", accessor: "nested_category", width: "22%" },
      { Header: "sub_category", accessor: "sub_category" },
      { Header: "article_number", accessor: "article_number", width: "15%" },
      { Header: "tax", accessor: "tax" },
      // {
      //   Header: "status",
      //   accessor: "status",
      //   Cell: (value) => <StatusButton status={value} />,
      // },
      {
        Header: "actions",
        accessor: "actions",
        width: "3%",
        disableSortBy: true,
        Cell: (row, { value }) => (
          <span>
            <Button
              style={{ padding: "0px" }}
              className="arrow-icon"
              onClick={(e) => handleEdit(row?.row?.original?.id)}
            >
              <img src={EditIcon} alt="edit icon" className="edit-delete-icon" />
            </Button>
            <Button
              style={{ padding: "0px" }}
              className="arrow-icon"
              onClick={(e) => handleDelete(row?.row?.original?.id)}
            >
              <img src={DeleteIcon} alt="detele icon" className="edit-delete-icon" />
            </Button>
          </span>
        ),
      },
    ],

    rows: productList,
  };

  // const filteredRows = dataTableData.rows.filter((row) =>
  //   row.name.toLowerCase().includes(filter2.name.toLowerCase())
  // );

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <MyModal text="Product" modalhead={`${edit ? "Edit" : "Add"} Product`}>
            <ProductForm fatchProductData={fatchProductData} />
            {/* <Toast /> */}
          </MyModal>
          {/* <SoftBox>
            <Button onClick={handleClickOpen}>Add</Button>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
              <RightSlideModal>
                <ProductForm />
              </RightSlideModal>
            </Dialog>
          </SoftBox> */}
          <Card>
            <DataTable
              // table={{ ...dataTableData, rows: filteredRows }}
              table={dataTableData}
              canSearch
              tableTitle="Products"
              entriesPerPage
            />
          </Card>
        </SoftBox>
      </DashboardLayout>
    </div>
  );
};

export default ProductTable;
