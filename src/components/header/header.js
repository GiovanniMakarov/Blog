/* eslint-disable no-use-before-define */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser, loadArticles } from "../../redux/actions/actions";
import defaultAvatar from "../../assets/defaultAvatar.png";

import classes from "./header.module.scss";

function Header() {
  const { isAuthorized } = useSelector((state) => state.user);
  const userData = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  const onFeedRefresh = () => {
    dispatch(loadArticles());
  };

  return (
    <header className={classes.header}>
      <Link to="/articles" className={classes.name} onClick={onFeedRefresh}>
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

  const { username, image } = userData;

  const avatar = image || defaultAvatar;

  const onLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Link to="/new-article" className={classes.createArticleBtn}>
        Create article
      </Link>
      <Link to="/profile" className={classes.profileBtn}>
        {username}
        <img src={avatar} alt="avatar" className={classes.avatar} width="46px" height="46px" />
      </Link>
      <Link to="/sign-in" className={classes.logOutBtn} onClick={onLogOut}>
        Log Out
      </Link>
    </>
  );
}

export default Header;
