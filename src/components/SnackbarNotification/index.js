import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
// import { commonDispatch } from 'store/commonRedux/commonDispatch';
import { selectModal, setOpen, showNotification } from "layouts/redux/modal/slice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarNotification = () => {
  const modal = useSelector((state) => state?.modal);
  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(showNotification({ isOpen: false }));
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <Stack spacing={2} sx={{ width: "100%",display: "flex", justifyContent: "center", alignItems: "center", }}>
        <Snackbar
          open={modal?.snackbar?.isOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={modal?.snackbar?.status} sx={{ width: '100%', textAlign: 'center', backgroundColor: modal?.snackbar?.color }}>
            {modal?.snackbar?.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default SnackbarNotification;
