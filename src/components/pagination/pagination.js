import { Pagination as AntdPagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { loadArticles } from "../../redux/actions/actions";

import classes from "./pagination.module.scss";

export default function Pagination() {
  const { page, data } = useSelector((state) => state.content);
  const { articlesCount } = data;

  const dispatch = useDispatch();

  const onPaginationClicked = (pageNumber) => {
    dispatch(loadArticles(pageNumber));
  };

  return (
    <div className={classes.pagination}>
      <AntdPagination
        total={articlesCount}
        pageSize={20}
        current={page}
        hideOnSinglePage
        simple
        onChange={(num) => onPaginationClicked(num)}
      />
    </div>
  );
}
