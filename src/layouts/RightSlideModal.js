import React from "react";
import PropTypes from "prop-types";
import DialogContent from "@mui/material/DialogContent";

function RightSlideModal({ children, ...props }) {
  return (
    <DialogContent
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "60vw",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: (theme) => theme.spacing(2),
        overflowY: "auto",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: (theme) => theme.zIndex.modal,
      }}
      {...props}
    >
      {children}
    </DialogContent>
  );
}

RightSlideModal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RightSlideModal;
