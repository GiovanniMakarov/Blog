import { Link } from "react-router-dom";

import classes from "./error.module.scss";

export default function Error() {
  return (
    <div className={classes.errorWrapper}>
      <span className={classes.error}>404</span>
      <span className={classes.title}>Oops, page not found!</span>
      <Link to="/articles" className={classes.button}>
        Return home
      </Link>
    </div>
  );
}
