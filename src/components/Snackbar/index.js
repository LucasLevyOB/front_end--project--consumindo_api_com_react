import { useState } from "react";

import { Snackbar as MaterialSnackbar } from "@mui/material";

import { useEffect } from "react";
import Alert from "../Alert";

const Snackbar = ({ message, openProp, severity, actionOnClose = null }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    actionOnClose?.();
  };

  return (
    <MaterialSnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MaterialSnackbar>
  );
};

export default Snackbar;
