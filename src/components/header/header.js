/* eslint-disable no-use-before-define */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../redux/actions/actions";
import defaultAvatar from "../../assets/defaultAvatar.png";

import classes from "./header.module.scss";

function Header() {
  const { isAuthorized } = useSelector((state) => state.user);
  const userData = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes.name}>
        Realworld Blog
      </Link>

      <div className={classes.profileGroup}>{profile(isAuthorized, userData, dispatch)}</div>
    </header>
  );
}

function profile(flag, userData, dispatch) {
  if (!flag) {
    return (
      <>
        <Link to="/sign-in" className={classes.signInBtn}>
          Sign In
        </Link>

        <Link to="/sign-up" className={classes.signUpButton}>
          Sign Up
        </Link>
      </>
    );
  }

  const { username } = userData;

  const onLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Link to="/sign-in" className={classes.createArticleBtn}>
        Create article
      </Link>
      <Link to="/profile" className={classes.profileBtn}>
        {username}
        <img src={defaultAvatar} alt="avatar" />
      </Link>
      <Link to="/sign-in" className={classes.logOutBtn} onClick={onLogOut}>
        Log Out
      </Link>
    </>
  );
}

export default Header;
