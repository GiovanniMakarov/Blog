import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadArticles } from "../../redux/actions/actions";
import Article from "../article";
import Spinner from "../spinner";

import classes from "./list-articles.module.scss";

function ListArticles() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.content);

  useEffect(() => {
    if (!data.articles) {
      dispatch(loadArticles());
    }
  }, []);

  if (loading || !data.articles) {
    return <Spinner />;
  }

  const list = data.articles.map((article) => {
    return (
      <Fragment key={article.slug}>
        <Article data={article} />
      </Fragment>
    );
  });

  return <section className={classes.list}>{list}</section>;
}

export default ListArticles;
