/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import defaultAvatar from "../../assets/defaultAvatar.png";
import Tags from "../tags";
import { toggleLikeArticle } from "../../redux/actions/actions";

import ArticleControlButtons from "./articleControlButtons";
import classes from "./article.module.scss";

function Article(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { full, data, ownership } = props;
  const { isAuthorized } = useSelector((state) => state.user);

  const { slug, title, tagList, favoritesCount, description, body, author, createdAt, favorited } = data;
  const { username, image } = author;
  const avatar = image || defaultAvatar;

  const descriptionClassName = full ? classes.fullDescription : classes.shortDescription;

  const articleTitle = full ? (
    <ReactMarkdown className={classes.title}>{title}</ReactMarkdown>
  ) : (
    <a onClick={() => navigate(`/articles/${slug}`)}>
      <ReactMarkdown className={classes.title}>{title}</ReactMarkdown>
    </a>
  );

  const likeButtonClass = favorited
    ? `${classes.likeBtn} ${classes.likedTrue}`
    : `${classes.likeBtn} ${classes.likedFalse}`;

  const onLiked = () => {
    if (isAuthorized) {
      dispatch(toggleLikeArticle(slug, favorited));
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <article className={classes.article}>
      <span className={classes.titleGroup}>
        {articleTitle}
        <button type="button" className={likeButtonClass} onClick={onLiked}>
          {favoritesCount}
        </button>
      </span>

      <div className={classes.tags}>
        <Tags tags={tagList} />
      </div>
      <p className={descriptionClassName}>{description}</p>

      {full && fullArticle(body)}

      <div className={classes.profileWrapper}>
        <span className={classes.profileName}>{username}</span>
        <span className={classes.date}>{format(new Date(createdAt), "MMMM d, yyyy")}</span>
        <img src={avatar} alt="avatar" className={classes.avatar} />
        {full && ownership && <ArticleControlButtons data={data} />}
      </div>
    </article>
  );
}

function fullArticle(body) {
  return <ReactMarkdown className={classes.textBody}>{body}</ReactMarkdown>;
}

export default Article;
