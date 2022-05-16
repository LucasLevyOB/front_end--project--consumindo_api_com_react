import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";

import useAxios from "../../hooks/useAxios";
import ProductModel from "../../models/productModel";

import Snackbar from "../../components/Snackbar";
import FormProduct from "../../components/FormProduct";
import useStyles from "./styles";
import useProducts from "../../hooks/useProducts";

const Edit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(ProductModel);
  const { productsDispatch } = useProducts();
  const navigate = useNavigate();
  const classes = useStyles();
  const { response, status, error, fetchData } = useAxios({
    method: "GET",
    url: `/products/${id}`,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  async function update(product) {
    await fetchData({
      url: `/products/${id}`,
      method: "PUT",
      data: product,
    });
  }

  function handleMessages() {
    if (response && status === "success") {
      productsDispatch({ type: "UPDATE_PRODUCT", payload: response.data });
      setSnackbar({
        open: true,
        message: "Produto atualizado com sucesso!",
        severity: "success",
        actionOnClose: back,
      });
      setProduct(response.data);
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

  function handleMessageGet() {
    if (response && status === "success") {
      setProduct(response.data);
    } else if (error && status === "error") {
      setSnackbar({
        open: true,
        message: error.message,
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

  function back() {
    navigate("/");
  }

  useEffect(() => {
    if (response && response.config.method === "get") handleMessageGet();
    else if (response && response.config.method === "put") handleMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, status]);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h4" component="h4">
            Editar Produto
          </Typography>
        </Box>
        <FormProduct
          status={status}
          productProp={product}
          edit={true}
          cancel={{ text: "Cancelar", action: back }}
          confirm={{ text: "Atualizar", action: update }}
        />
      </Box>
      <Snackbar
        message={snackbar.message}
        openProp={snackbar.open}
        severity={snackbar.severity}
        actionOnClose={snackbar.actionOnClose}
      />
    </>
  );
};

export default Edit;
