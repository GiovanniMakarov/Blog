import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { loadCurrentArticle } from "../../redux/actions/actions";
import Article from "../article";
import Spinner from "../spinner";

import classes from "./pages.module.scss";

export default function ArticlePage() {
  const { slug } = useParams();
  const { articles, article } = useSelector((store) => store.content.data);
  const { data, loading } = useSelector((state) => state.content);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!articles) {
      dispatch(loadCurrentArticle(slug));
    }
  }, []);

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

  return (
    <div className={classes.fullArticleWrapper}>
      <Article slug={slug} data={currentArticle} full />
    </div>
  );
}
