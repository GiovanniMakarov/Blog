/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

import defaultAvatar from "../../assets/defaultAvatar.png";
import Tags from "../tags";

import ArticleControlButtons from "./articleControlButtons";
import classes from "./article.module.scss";

function Article(props) {
  const navigate = useNavigate();
  const { full, data, ownership } = props;

  const { slug, title, tagList, favoritesCount, description, body, author, createdAt } = data;
  const { username, image } = author;
  const avatar = image || defaultAvatar;

  const descriptionClassName = full ? classes.fullDescription : classes.shortDescription;

  const articleTitle = full ? (
    <ReactMarkdown className={classes.title}>{title}</ReactMarkdown>
  ) : (
    <a onClick={() => navigate(slug)}>
      <ReactMarkdown className={classes.title}>{title}</ReactMarkdown>
    </a>
  );

  return (
    <article className={classes.article}>
      <span className={classes.titleGroup}>
        {articleTitle}
        <button type="button" className={classes.likeBtn}>
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
