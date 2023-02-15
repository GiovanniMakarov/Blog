import { Link } from "react-router-dom";

import classes from "./header.module.scss";

function Header() {
  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes.name}>
        Realworld Blog
      </Link>

      <div className={classes.btnGroup}>
        <Link to="/articles" className={classes.signInBtn}>
          Sign In
        </Link>

        <Link to="/articles" className={classes.signUpButton}>
          Sign Up
        </Link>
      </div>
    </header>
  );
}

export default Header;
