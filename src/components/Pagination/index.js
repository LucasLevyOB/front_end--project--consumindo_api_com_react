import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import { Pagination as MaterialPagination } from "@mui/material";
import useStyles from "./styles";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MaterialPagination
        page={page}
        count={totalPages}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
