import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";
import useProducts from "../../hooks/useProducts";

const SearchProducts = ({ action }) => {
  const [filterInput, setFilterInput] = useState(null);
  const { products } = useProducts();

  function changeFilterInput(_, newValue) {
    setFilterInput(newValue);
    action(newValue?.name);
  }

  useEffect(() => {
    if (products.length === 1) {
      setFilterInput(products[0]);
    }
  }, []);

  return (
    <Autocomplete
      value={filterInput}
      onChange={changeFilterInput}
      disablePortal
      id="combo-box-demo"
      options={products}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Produtos" />}
    />
  );
};

SearchProducts.propTypes = {
  action: PropTypes.func.isRequired,
};

export default SearchProducts;
