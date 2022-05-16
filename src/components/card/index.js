import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import { Card as MaterialCard } from "@material-ui/core/";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

import useStyles from "./styles";
import useAxios from "../../hooks/useAxios";
import useDebounce from "../../hooks/useDebounce";
import { CardHeader } from "@mui/material";

const Card = ({ data, handleDeleteProduct }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isDelete, setIsDelete] = useState(false);
  const { response, status, error, fetchData } = useAxios();
  const debounceIsDelete = useDebounce(setIsDelete, 3000);

  function editProduct() {
    navigate(`/edit/${data.id}`);
  }

  function changeIsDelete() {
    setIsDelete(!isDelete);
  }

  function deleteProduct() {
    fetchData({ method: "delete", url: `/products/${data.id}` });
  }

  useEffect(() => {
    handleDeleteProduct(response, status, error, data.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, status, error]);

  if (isDelete)
    return (
      <MaterialCard className={classes.root} variant="outlined">
        <CardHeader>
          <Typography
            className={classes.title}
            color="textSecondary"
            variant="h5"
            component="h2"
            gutterBottom
          >
            {data.name}
          </Typography>
        </CardHeader>
        <CardContent>
          <Typography variant="body2" component="p">
            Tem certeza que deseja deletar esse produto?
          </Typography>
        </CardContent>
        <CardActions className={classes.div_buttons}>
          <Button
            onClick={changeIsDelete}
            endIcon={<CancelIcon />}
            variant="outlined"
            size="small"
          >
            Não
          </Button>
          <Button
            size="small"
            endIcon={<DeleteIcon />}
            variant="contained"
            onClick={deleteProduct}
          >
            Sim
          </Button>
        </CardActions>
      </MaterialCard>
    );
  return (
    <MaterialCard className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          variant="h5"
          component="h2"
          gutterBottom
        >
          {data.name}
        </Typography>
        <Typography variant="body2" component="p" className={classes.text_body}>
          {data.description}
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          R${" "}
          {new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(
            data.price
          )}
        </Typography>
      </CardContent>
      <CardActions className={classes.div_buttons}>
        <Button
          onClick={() => {
            changeIsDelete();
            debounceIsDelete(false);
          }}
          endIcon={<DeleteIcon />}
          variant="outlined"
          size="small"
        >
          Deletar
        </Button>
        <Button
          size="small"
          endIcon={<EditIcon />}
          variant="contained"
          onClick={editProduct}
        >
          Editar
        </Button>
      </CardActions>
    </MaterialCard>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
};

export default Card;
