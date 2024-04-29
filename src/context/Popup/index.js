import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductList } from "api/product";

export const PopupContext = createContext();

const PopupContexts = ({ children }) => {
  const [notification, setNotification] = useState({
    color: "success",
    icon: "check",
    title: "Material Dashboard",
    content: "Hello, world! This is a notification message",
    open: false,
  });

  const obj = {
    // "currentPage": 1,
    // "itemsPerPage": 10,
    // filters: [
    //   {
    //     "id": "name",
    //     "value": "",
    //   },
    // ],
    sortBy: [
      {
        id: "id",
        desc: true,
      },
    ],
  };
  const [productList, setproductList] = useState([]);
  const fatchProductData = async () => {
    const response = await ProductList(obj);
    if (response.status === 200) {
      setproductList(response?.data?.data?.rows);
    }
  };

  useEffect(() => {
    fatchProductData(obj);
  }, []);

  return (
    <div>
      <PopupContext.Provider value={{ setNotification, notification,fatchProductData,productList }}>
        {children}
      </PopupContext.Provider>
    </div>
  );
};

PopupContexts.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PopupContexts;
