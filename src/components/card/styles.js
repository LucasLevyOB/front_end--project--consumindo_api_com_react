import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    minHeight: 221,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  title: {
    fontSize: "14px !important",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
  },
  text_body: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    minHeight: 60,
  },
  pos: {
    marginBottom: 12,
  },
  div_buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default useStyles;
