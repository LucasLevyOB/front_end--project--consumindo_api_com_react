import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormProduct from "../../components/FormProduct";
import Snackbar from "../../components/Snackbar";
import useAxios from "../../hooks/useAxios";
import useProducts from "../../hooks/useProducts";
import productModel from "../../models/productModel";
import useStyles from "./styles";

const Create = () => {
  const { productsDispatch } = useProducts();
  const { response, status, error, fetchData } = useAxios();
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  async function create(product) {
    await fetchData({
      url: "/products",
      method: "POST",
      data: product,
    });
  }

  function handleMessages() {
    if (response && status === "success") {
      setSnackbar({
        open: true,
        message: "Produto criado com sucesso!",
        severity: "success",
      });
      productsDispatch({ type: "ADD_PRODUCT", payload: response.data });
    } else if (error && status === "error") {
      setSnackbar({
        open: true,
        message: "Erro ao criar produto!",
        severity: "error",
      });
    } else {
      setSnackbar({
        open: false,
        message: "",
        severity: "",
      });
    }
  }

  useEffect(() => {
    handleMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, status]);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h4" component="h4">
            Criar Produto
          </Typography>
        </Box>
        <FormProduct
          productProp={productModel}
          cancel={{ text: "Cancelar", action: () => navigate("/") }}
          confirm={{ text: "Cadastrar", action: create }}
          status={status}
        />
      </Box>
      <Snackbar
        message={snackbar.message}
        openProp={snackbar.open}
        severity={snackbar.severity}
      />
    </>
  );
};

export default Create;
