import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Article from "../article";
import Spinner from "../spinner";

import classes from "./pages.module.scss";

export default function ArticlePage() {
  const { slug } = useParams();
  const { articles, article } = useSelector((store) => store.content.data);
  const { data, loading } = useSelector((state) => state.content);
  const { user } = useSelector((state) => state.user);

  if (loading || data.length === 0) {
    return <Spinner />;
  }

  let currentArticle;

  if (article) {
    currentArticle = article;
  } else {
    const idx = articles.findIndex((el) => el.slug === slug);
    currentArticle = articles[idx];
  }

  const ownership = currentArticle?.author?.username === user?.username;

  return (
    <div className={classes.fullArticleWrapper}>
      <Article slug={slug} data={currentArticle} ownership={ownership} full />
    </div>
  );
}
