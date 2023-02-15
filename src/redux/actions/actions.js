import api from "../../services/api";

import actionTypes from "./actionTypes";

const toggleLoading = (value) => {
  return { type: actionTypes.LOADING, payload: value };
};

const setPage = (page) => {
  return { type: actionTypes.SET_PAGE, page };
};

const loadArticles = (page = 1) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));
    dispatch(setPage(page));

    try {
      const res = await api.getArticles(page);
      dispatch({ type: actionTypes.SUCCESS_LOADING, data: res });
    } catch (err) {
      console.log(err);
      dispatch({ type: actionTypes.ERROR_LOADING });
    }

    dispatch(toggleLoading(false));
  };
};

const loadCurrentArticle = (slug) => {
  return async (dispatch) => {
    dispatch(toggleLoading(true));

    try {
      const res = await api.getArticleBySlug(slug);
      dispatch({ type: actionTypes.SUCCESS_LOADING, data: res });
    } catch (err) {
      console.log(err);
      dispatch({ type: actionTypes.ERROR_LOADING });
    }

    dispatch(toggleLoading(false));
  };
};

// eslint-disable-next-line import/prefer-default-export
export { loadArticles, loadCurrentArticle };
