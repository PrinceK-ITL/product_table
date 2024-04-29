import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Modal } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, editFrom, selectModal } from "../../layouts/redux/modal/slice";
// import
import PlusIcon from "assets/images/plus.png";
import "../../components/Modal/index.css";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
//   transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyModal = (props) => {
  const dispatch = useDispatch();
  const { open } = useSelector(selectModal);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleOpen = () => {
    dispatch(setOpen(true));
    dispatch(editFrom(false));
  };

  return (
    <SoftBox>
      {props.text ? (
        <Button
          onClick={() => {
            handleOpen();
          }}
          className="personnel-order_btn"
          sx={{
            marginTop: "12px",
            padding: "12px",
            backgroundColor: "#7b2cc4",
            "&:hover": {
              backgroundColor: "#854cba",
            },
          }}
        >
          <SoftBox>
            <SoftBox style={{ display: "flex", alignItems: "end", color: "#ffff" }}>
              <img src={PlusIcon} alt="plus icon" style={{ marginRight: "6px" }} />
              {props.text}
            </SoftBox>
          </SoftBox>
        </Button>
      ) : (
        ""
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="box_modal"
        >
          <SoftBox className="cc_modal_head">
            <SoftTypography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="modal-modal-title"
            >
              {props.modalhead}
            </SoftTypography>
            <span className="modal-close_btn">
              <CloseIcon onClick={handleClose} />
            </span>
          </SoftBox>
          <SoftBox>
            {/* form... */}
            {props.children}
          </SoftBox>
        </Box>
      </Modal>
    </SoftBox>
  );
};

MyModal.propTypes = {
  children: PropTypes.node,
  text: PropTypes.node,
  modalhead: PropTypes.node,
  editFrom: PropTypes.bool,
};

export default MyModal;
