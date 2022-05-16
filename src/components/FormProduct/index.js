import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, TextField, InputAdornment, Box } from "@material-ui/core";
import { CircularProgress, Stack, Typography } from "@mui/material";

import useStyles from "./styles";
import validationSchema from "./schema";

const FormProduct = ({
  productProp,
  cancel,
  confirm,
  status = "",
  edit = false,
}) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = (data) => {
    confirm.action(data);
  };

  useEffect(() => {
    if (!edit && status === "success") reset();
  }, [status]);

  useEffect(() => {
    setValue("name", productProp.name);
    setValue("description", productProp.description);
    setValue("price", productProp.price);
  }, [productProp]);

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.input_wraper}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              label="Nome"
              variant="outlined"
              autoComplete="off"
              {...register("name")}
              error={errors.name ? true : false}
              fullWidth
            />
          )}
          control={control}
          id="name"
          name="name"
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.name?.message}
        </Typography>
      </Box>
      <Box className={classes.input_wraper}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              {...register("description")}
              error={errors.description ? true : false}
              label="Descrição"
              multiline
              maxRows={4}
              variant="outlined"
              autoComplete="off"
              fullWidth
            />
          )}
          control={control}
          id="description"
          name="description"
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.description?.message}
        </Typography>
      </Box>
      <Box className={classes.input_wraper}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              {...register("price")}
              error={errors.price ? true : false}
              label="Preço"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              variant="outlined"
              autoComplete="off"
              step="0.01"
            />
          )}
          control={control}
          id="price"
          name="price"
        />
        <Typography variant="inherit" color="textSecondary">
          {errors.price?.message}
        </Typography>
      </Box>
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap="8px"
        justifyContent="flex-end"
        padding="0 8px"
      >
        <Button variant="outlined" color="secondary" onClick={cancel.action}>
          {cancel.text}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={status === "pending" ? true : false}
        >
          {confirm.text}
          {status === "pending" && (
            <CircularProgress
              color="primary"
              size={20}
              style={{ marginLeft: "8px" }}
            />
          )}
        </Button>
      </Stack>
    </form>
  );
};

FormProduct.propTypes = {
  productProp: PropTypes.object.isRequired,
  cancel: PropTypes.shape({ text: PropTypes.string, action: PropTypes.func })
    .isRequired,
  confirm: PropTypes.shape({ text: PropTypes.string, action: PropTypes.func })
    .isRequired,
  status: PropTypes.string,
  edit: PropTypes.bool,
};

export default FormProduct;
