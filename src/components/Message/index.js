import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";
import { Box, Typography } from "@material-ui/core";

// ECONNABORTED
//   ERR_BAD_OPTION
//   ERR_BAD_OPTION_VALUE
//   ERR_BAD_REQUEST
//   ERR_BAD_RESPONSE
//   ERR_CANCELED
//   ERR_DEPRECATED
//   ERR_FR_TOO_MANY_REDIRECTS
//   ERR_NETWORK
//   ETIMEDOUT

const messages = {
  0: {
    text: "O servidor não está disponível, tente reinicia-lo ou verifique sua conexão.",
    img: "/imgs/500 Internal Server Error-amico.svg",
    alt: "",
  },
  1: {
    text: "Não há dados correspondentes a requisição.",
    img: "/imgs/No data-amico.svg",
    alt: "",
  },
  404: {
    text: "A url requisitada não está disponível, tente novamente mais tarde.",
    img: "/imgs/Monster 404 Error-amico.svg",
    alt: "",
  },
};

const Message = ({ status }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography component="h5" variant="h5">
        {messages[status].text}
      </Typography>
      {messages[status].img && (
        <img src={messages[status].img} alt={messages[status].alt} />
      )}
    </Box>
  );
};

Message.propTypes = {
  status: PropTypes.number.isRequired,
};

export default Message;
