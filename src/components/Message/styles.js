import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
    maxWidth: "556px",
    marginBottom: "24px",
    margin: "auto",
    "& > h5": {
      marginBottom: "12px",
    },
    "& > img": {
      width: "100%",
      maxWidth: "356px",
    },
  },
});

export default useStyles;
