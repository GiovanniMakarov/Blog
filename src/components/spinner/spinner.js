import SyncLoader from "react-spinners/SyncLoader";

import classes from "./spinner.module.scss";

function Spinner({ size = 20 }) {
  return <SyncLoader className={classes.spinner} size={size} color="#73bbff" />;
}

export default Spinner;
