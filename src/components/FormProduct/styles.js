import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 596,
    width: "100%",
    margin: "auto",
  },
  input_wraper: {
    marginBottom: 24,
    "& > p": {
      marginTop: 4,
    },
  },
});

export default useStyles;
