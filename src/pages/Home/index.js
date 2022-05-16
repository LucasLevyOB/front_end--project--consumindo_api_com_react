import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Typography } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import Card from "../../components/card";
import Pagination from "../../components/Pagination";

import usePagination from "../../hooks/usePagination";
import useAxios from "../../hooks/useAxios";
import useProducts from "../../hooks/useProducts";

import useStyles from "./styles";
import SearchProducts from "../../components/SearchProducts";
import Snackbar from "../../components/Snackbar";
import Message from "../../components/Message";

const Home = () => {
  const classes = useStyles();
  const { products, productsDispatch } = useProducts();
  const { pagination, handlePageChange, handlePagination, getPageData } =
    usePagination(0, 5, 1, parseInt(getActualPage()));
  const navigate = useNavigate();
  const { response, status, error, fetchData } = useAxios();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [search, setSearch] = useState("-1");

  function getActualPage() {
    return localStorage.getItem("actualPage") || 1;
  }

  function handleDeleteProduct(response, status, error, id) {
    if (response && status === "success") {
      productsDispatch({ type: "REMOVE_PRODUCT", payload: id });
      setSnackbar({
        open: true,
        message: "Produto deletado com sucesso!",
        severity: "success",
      });
    } else if (error && status === "error") {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }

  async function filterProducts(name = null) {
    setSearch(name ? name : "");
    const query = name ? `&name_like=${name}` : "";
    await fetchData({
      method: "GET",
      url: `/products?_sort=id${query}`,
    });
  }

  useEffect(() => {
    if (
      (products.length === 0 || search !== "-1") &&
      response &&
      status === "success"
    ) {
      productsDispatch({
        type: "SET_PRODUCTS",
        payload: response.data,
      });
      handlePagination("actualPage", 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, status]);

  useEffect(() => {
    handlePagination("totalCount", products.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    if (products.length === 0) {
      fetchData({
        method: "GET",
        url: "/products?_sort=id",
      });
    }
  }, []);

  return (
    <>
      <Box component="main" className={classes.root}>
        <Box className={classes.header}>
          <Typography variant="h3" component="h3">
            Lista de Produtos
          </Typography>
        </Box>
        <Stack
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          alignItems={["center", "stretch"]}
          spacing={[2, 0]}
          className={classes.actions}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/create");
            }}
          >
            Adicionar Produto
          </Button>
          <SearchProducts action={filterProducts} />
        </Stack>
        {status === "error" ? (
          <Message status={error.response.status} />
        ) : products.length === 0 &&
          (status === "idle" || status === "pending") ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap="16px 12px"
            justifyContent={["center", "normal"]}
            className={classes.products_div}
          >
            {Array.from(new Array(5)).map((_, index) => (
              <Skeleton key={index} variant="rect" width={273} height={155} />
            ))}
          </Stack>
        ) : getPageData(products).length > 0 ? (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap="16px 12px"
            justifyContent={["center", "normal"]}
            className={classes.products_div}
          >
            {getPageData(products).map((product) => (
              <Card
                data={product}
                key={product.name + product.id}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </Stack>
        ) : (
          <Message status={1} />
        )}

        <Pagination
          page={pagination.actualPage}
          totalPages={pagination.totalPages}
          handlePageChange={handlePageChange}
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

export default Home;
