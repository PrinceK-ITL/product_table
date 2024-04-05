/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by https://www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// import TextField from '@mui/material/TextField';
import { useMemo, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "@mui/material/TextField";

// Material Dashboard 2 PRO React components

// Material Dashboard 2 PRO React examples
import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftPagination from "components/SoftPagination";
import SoftInput from "components/SoftInput";
import { Button, Checkbox, FormControlLabel, FormGroup, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoDataFound from "components/NoDataFound";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { useDispatch } from "react-redux";

function DataTable({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  tableTitle,
  canFilter,
  isClearAllFilter,
  clearAllFilters,
  dataFilter,
  // dataFilter2,
  // isRowClickable,
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];

  const columns = useMemo(() => (table && table.columns) || [], [table]);
  const data = useMemo(() => (table && table.rows) || [], [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;
  // const navigate = useNavigate();
  // const {CCLoader} = useContext(CommonContext);
  // const clickableRow = (row) => {
  //  if (isRowClickable) {

  //    CCLoader()
  //   navigate(`/case-overview/${row?.original?.case_cloud_id}`);
  //  }
  // };
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);
  const setLocation = (value) => setGlobalFilter(value);
  const setarea = (value) => setGlobalFilter(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <SoftPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </SoftPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "aesc";
    } else if (isSorted) {
      sortedValue = "none";
    } else if (column?.sort) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const customButtonStyles = {
    width: "150px",
    backgroundColor: "transparent",
    color: "#33ACCF",
    "&:hover": {
      backgroundColor: "darkred",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px",
    },
  };

  const handleAutocompleteChange = (event, newValue) => {
    setEntriesPerPage(parseInt(newValue, 10));
  };

  useEffect(() => {
    setGlobalFilter();
  }, []);

  // const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);

  return (
    // <button type="submit">NEW CASE</button>
    <TableContainer sx={{ boxShadow: "none" }}>
      <SoftBox style={{ display: "flex", alignItems: "center", position: "sticky", left: "0" }}>
        {tableTitle && (
          <h3
            style={{
              fontWeight: "700",
              paddingLeft: "25px",
              paddingTop: "25px",
              fontSize: "18px",
              lineHeight: "21px",
              color: "#344767",
            }}
          >
            {tableTitle}
          </h3>
        )}
        {canSearch && (
          <SoftBox width="12rem" ml="auto" pl={1} pr={4} pt={4}>
            <SoftInput
              placeholder="Search here"
              value={search}
              size="small"
              fullWidth
              onChange={({ currentTarget }) => {
                setSearch(search);
                onSearchChange(currentTarget.value);
              }}
              sx={{ color: "#344767", fontWeight: "400", fontSize: "14px", lineHeight: "17px" }}
            />
          </SoftBox>
        )}
      </SoftBox>

      {entriesPerPage || canSearch ? (
        <SoftBox className="cc-filter_record" p={2} style={{ position: "sticky", left: "0" }}>
          <SoftBox>
            {entriesPerPage && (
              <SoftBox display="flex" alignItems="center">
                <Autocomplete
                  disableClearable
                  value={pageSize.toString()}
                  options={entries}
                  onChange={handleAutocompleteChange}
                  size="small"
                  sx={{ width: "5rem" }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <SoftTypography variant="caption" color="secondary" sx={{ textWrap: "nowrap" }}>
                  &nbsp;&nbsp;entries per page
                </SoftTypography>
              </SoftBox>
            )}
          </SoftBox>
          <SoftBox display="flex" alignItems="center">
            <SoftBox
              className={`table-clear_btn ${
                isClearAllFilter && dataFilter.some((filterVal) => Boolean(filterVal.value))
                  ? "cc_opicity--full"
                  : ""
              } `}
            >
              {isClearAllFilter && (
                <Button style={customButtonStyles} onClick={(e) => clearAllFilters()}>
                  <CloseIcon sx={{ marginRight: "10px" }} />
                  clear All
                </Button>
              )}
            </SoftBox>
            {canFilter &&
              dataFilter &&
              dataFilter.map((filterVal) => {
                return (
                  <>
                    {filterVal.inputType === "selectbox" && (
                      <SoftBox display="flex" alignItems="center" paddingRight="10px">
                        <Autocomplete
                          disableClearable
                          options={filterVal.option}
                          value={filterVal.value}
                          onChange={(event, newValue) => {
                            filterVal.handleChange(filterVal.accessor, newValue);
                          }}
                          size="small"
                          sx={{
                            width: "10rem",
                            color: "#BFC3DA",
                            padding: "0px",
                            border: "0",
                          }}
                          popupIcon={
                            <KeyboardArrowDownIcon sx={{ fontSize: "14px", width: "18px" }} />
                          }
                          renderInput={(params) => (
                            <SoftInput
                              {...params}
                              label={filterVal.label}
                              variant="standard"
                              sx={{ fontWeight: "400" }}
                            />
                          )}
                        />
                      </SoftBox>
                    )}
                    {/* {filterVal.inputType === "date" && (
                      <SoftBox
                        component="span"
                        className="table-date-selector"
                        style={{ minWidth: "150px" }}
                      >
                        <MDDatePicker
                          value={filterVal.value}
                          onChange={(date) => {
                            filterVal.handleChange(filterVal.accessor, date);
                          }}
                          label={filterVal.label}
                        />
                      </SoftBox>
                    )} */}
                    {filterVal.inputType === "checkbox" && (
                      <SoftBox
                        component="span"
                        className="table-date-selector"
                        style={{ minWidth: "150px" }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            sx={{ userSelect: "none" }}
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  filterVal.handleChange(filterVal.accessor, e.target.checked);
                                }}
                                checked={Boolean(filterVal.value)}
                              />
                            }
                            label={filterVal.label}
                          />
                        </FormGroup>
                      </SoftBox>
                    )}
                  </>
                );
              })}
          </SoftBox>
        </SoftBox>
      ) : null}

      <SoftBox
        style={{
          paddingRight: "20px",
          display: "flex",
          justifyContent: "end",
          position: "sticky",
          left: "0",
        }}
      >
        <Button onClick={() => setShowFilter(!showFilter)}>
          {showFilter ? (
            <SoftBox>
              <FilterAltOffIcon sx={{ fontSize: 30 }} />
            </SoftBox>
          ) : (
            <SoftBox>
              <FilterAltIcon sx={{ fontSize: 30 }} />
            </SoftBox>
          )}
        </Button>
      </SoftBox>

      {/* {entriesPerPage || canSearch ? (
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
          {entriesPerPage && (
            <SoftBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <input {...params} />}
              />
              <SoftTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entries per page
              </SoftTypography>
            </SoftBox>
          )}
          <SoftBox display="flex" alignItems="end" pb={0}>
            <SoftButton className="clear_all_btn">
              <CloseIcon className="btn_icon" />
              Clear All
            </SoftButton>
            <SoftBox width="10rem" ml="20px">
              <Autocomplete
                options={[1, 2]}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Filter by Status"
                  />
                )}
              />
            </SoftBox>
            <SoftBox width="10rem" ml="10px">
              <Autocomplete
                options={[1, 2]}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    placeholder=" Montana "
                  />
                )}
              />
            </SoftBox>
            <SoftBox width="10rem" ml="10px">
              <Autocomplete
                options={[1, 2]}
                renderInput={(params) => (
                  <FormField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Filter by Location"
                  />
                )}
              />
            </SoftBox>
          </SoftBox>
        </SoftBox>
      ) : null} */}
      <Table {...getTableProps()}>
        <SoftBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </SoftBox>

        {Boolean(table?.isFilter) && showFilter && (
          <TableRow className="">
            {Boolean(table?.columns) &&
              table?.columns?.map((item) => (
                <>
                  {console.log("item: ", item)}
                  <DataTableBodyCell className="">
                    {item?.filterInputType === "text" && (
                      <SoftBox display="flex" alignItems="center" sx={{ minWidth: "160px" }}>
                        <Input
                          sx={{ fontSize: "12px", border: "none" }}
                          type="text"
                          value={item?.filterValue}
                          onChange={(e) => {
                            item?.filterHandleChange(item?.filterAccessor, e.target.value);
                          }}
                          placeholder={item?.filterLabel}
                          // inputProps={{ "aria-label": "description" }}
                        />
                      </SoftBox>
                    )}
                  </DataTableBodyCell>
                </>
              ))}
          </TableRow>
        )}

        <TableBody {...getTableBodyProps()}>
          {/* {console.log("Data", data)} */}

          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/*When no data found then this code will run */}
      {data.length === 0 ? <NoDataFound /> : null}
      <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
        style={{ position: "sticky", left: "0" }}
      >
        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              Showing {entriesStart} to {entriesEnd} of {rows.length} entries
            </SoftTypography>
          </SoftBox>
        )}
        {pageOptions.length > 1 && (
          <SoftPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <SoftPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </SoftPagination>
            )}
            {renderPagination.length > 6 ? (
              <SoftBox>
                <SoftInput
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </SoftBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <SoftPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </SoftPagination>
            )}
          </SoftPagination>
        )}
      </SoftBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  entriesPerPage: { defaultValue: 5, entries: [5, 10, 15, 20, 25] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
  tableTitle: "",
  canFilter: false,
  isClearAllFilter: false,
  dataFilter: [],
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  tableTitle: PropTypes.string,
  canFilter: PropTypes.bool,
  isClearAllFilter: PropTypes.bool,
  clearAllFilters: PropTypes.func,
  dataFilter: PropTypes.array,
};

export default DataTable;
