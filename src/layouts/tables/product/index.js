import { Button, Card, Dialog, Slide } from "@mui/material";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/Table";
import RightSlideModal from "layouts/RightSlideModal";
import React, { useState } from "react";
import EditIcon from "../../../assets/images/edit.svg";
import DeleteIcon from "../../../assets/images/Trash.svg";
import ProductForm from "./form";
import MyModal from "components/Modal";

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

const ProductTable = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [filter2, setFilter2] = useState({
    name: "",
  });
  // console.log('filter2: ', filter2.name);

  const handleFilter2 = (accessor, value) => {
    setFilter2({ ...filter2, [accessor]: value });
  };

  const dataTableData = {
    isFilter: true,
    columns: [
      {
        Header: " id",
        accessor: "name",
        width: "18%",
        filterValue: filter2.name,
        filterHandleChange: handleFilter2,
        filterAccessor: "name",
        filterInputType: "text",
        filterLabel: "Search...",
      },
      { Header: "family ", accessor: "position", width: "22%" },
      { Header: "relations", accessor: "office" },
      { Header: "cpsffgf", accessor: "age", width: "15%" },
      { Header: "case status", accessor: "startDate" },
      { Header: "create by", accessor: "salary" },
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
              //   onClick={(e) => handleEdit(row?.row?.original?.id, "Edit")}
            >
              <img src={EditIcon} alt="edit icon" className="edit-delete-icon" />
            </Button>
            <Button
              style={{ padding: "0px" }}
              className="arrow-icon"
              //   onClick={(e) => handleEdit(row?.row?.original?.id, "Delete")}
            >
              <img src={DeleteIcon} alt="detele icon" className="edit-delete-icon" />
            </Button>
          </span>
        ),
      },
    ],

    rows: [
      {
        name: "Hanny Baniard",
        position: "Data Coordiator",
        office: "Baorixile",
        age: 42,
        startDate: "4/11/2021",
        salary: "$474,978",
      },

      {
        name: "Lara Puleque",
        position: "Payment Adjustment Coordinator",
        office: "Cijangkar",
        age: 47,
        startDate: "8/2/2021",
        salary: "$387,287",
      },
      {
        name: "Torie Repper",
        position: "Administrative Officer",
        office: "Montpellier",
        age: 25,
        startDate: "4/21/2021",
        salary: "$94,780",
      },
      {
        name: "Nat Gair",
        position: "Help Desk Technician",
        office: "Imider",
        age: 57,
        startDate: "12/6/2020",
        salary: "$179,177",
      },
      {
        name: "Maggi Slowan",
        position: "Help Desk Technician",
        office: "Jaunpils",
        age: 56,
        startDate: "11/7/2020",
        salary: "$440,874",
      },
      {
        name: "Marleah Snipe",
        position: "Account Representative II",
        office: "Orekhovo-Borisovo Severnoye",
        age: 31,
        startDate: "7/18/2021",
        salary: "$404,983",
      },
      {
        name: "Georgia Danbury",
        position: "Professor",
        office: "Gniezno",
        age: 50,
        startDate: "10/1/2020",
        salary: "$346,576",
      },
    ],
  };

  const filteredRows = dataTableData.rows.filter((row) =>
    row.name.toLowerCase().includes(filter2.name.toLowerCase())
  );

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
            <MyModal text="Product" modalhead="Edit" TransitionComponent={Transition}>
                <ProductForm />
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
              table={{ ...dataTableData, rows: filteredRows }}
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
