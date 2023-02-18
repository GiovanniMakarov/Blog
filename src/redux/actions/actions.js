import api from "../../services/api";

import actionTypes from "./actionTypes";

const _toggleLoading = (value) => {
  return { type: actionTypes.LOADING, payload: value };
};

const _setPage = (page) => {
  return { type: actionTypes.SET_PAGE, page };
};

const _toggleUserProcessing = (value) => {
  return {
    type: actionTypes.SET_USER_PROCESSING,
    value,
  };
};

const loadArticles = (page = 1) => {
  return async (dispatch) => {
    dispatch(_toggleLoading(true));
    dispatch(_setPage(page));

    try {
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.getArticles(page, token);
      dispatch({ type: actionTypes.SUCCESS_LOADING, data: res });
    } catch (err) {
      console.log(err);
      dispatch({ type: actionTypes.ERROR_LOADING });
    }

    dispatch(_toggleLoading(false));
  };
};

const loadCurrentArticle = (slug) => {
  return async (dispatch) => {
    dispatch(_toggleLoading(true));

    try {
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.getArticleBySlug(slug, token);
      dispatch({ type: actionTypes.SUCCESS_LOADING, data: res });
    } catch (err) {
      console.log(err);
      dispatch({ type: actionTypes.ERROR_LOADING });
    }

    dispatch(_toggleLoading(false));
  };
};

const createUser = ({ username, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const res = await api.createUser(username, email, password);
      dispatch({ type: actionTypes.CREATE_ACCOUNT, response: res });
      dispatch(_toggleUserProcessing(false));
    } catch (error) {
      dispatch(_toggleUserProcessing(false));
      throw error?.response?.data?.errors;
    }
  };
};

const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const res = await api.loginUser(email, password);
      dispatch({ type: actionTypes.SUCCESS_LOGIN, response: res.data.user });
      dispatch(_toggleUserProcessing(false));
      localStorage.setItem("RealWorldToken", res.data.user.token);
    } catch (error) {
      dispatch(_toggleUserProcessing(false));
      console.log(error);
      throw error?.response?.data?.errors;
    }
  };
};

const getUserDataByToken = () => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const token = localStorage.getItem("RealWorldToken");
      if (!token) {
        throw new Error("No authorization token");
      }
      const res = await api.getUserDataByToken(token);
      dispatch({ type: actionTypes.SUCCESS_LOGIN, response: res.user });
      localStorage.setItem("RealWorldToken", res.user.token);
      dispatch(_toggleUserProcessing(false));
    } catch (error) {
      console.log(error);
      dispatch(_toggleUserProcessing(false));
    }
  };
};

const logoutUser = () => {
  localStorage.removeItem("RealWorldToken");
  return { type: actionTypes.LOGOUT };
};

const changeUserData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.changeUserData(data, token);
      dispatch({ type: actionTypes.SUCCESS_CHANGE, response: res });
      dispatch({ type: actionTypes.SUCCESS_LOGIN, response: res.user });
      localStorage.setItem("RealWorldToken", res.user.token);
      dispatch(_toggleUserProcessing(false));
    } catch (error) {
      dispatch(_toggleUserProcessing(false));
      console.log(error);
      throw error?.response?.data?.errors;
    }
  };
};

const createArticle = (data) => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.createArticle(data, token);
      dispatch(_toggleUserProcessing(false));
      console.log(res);
    } catch (error) {
      dispatch(_toggleUserProcessing(false));
      console.log(error);
      throw error?.response?.data?.errors;
    }
  };
};

const changeArticle = (slug, data) => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.changeArticle(slug, data, token);
      dispatch(_toggleUserProcessing(false));
    } catch (error) {
      dispatch(_toggleUserProcessing(false));
      console.log(error);
      throw error?.response?.data?.errors;
    }
  };
};

const deleteArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(_toggleUserProcessing(true));
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.deleteArticle(slug, token);
      dispatch(_toggleUserProcessing(false));
    } catch (error) {
      dispatch(_toggleUserProcessing(false));
      console.log(error);
      throw error?.response?.data?.errors;
    }
  };
};

const toggleLikeArticle = (slug, isFavoriteNow) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("RealWorldToken");
      const res = await api.toggleLike(slug, token, isFavoriteNow);
      dispatch({ type: actionTypes.REPLACE_ARTICLE, newArticle: res.data });
    } catch (error) {
      console.log(error);
      throw error?.response?.data?.errors;
    }
  };
};

export {
  loadArticles,
  loadCurrentArticle,
  createUser,
  loginUser,
  logoutUser,
  changeUserData,
  getUserDataByToken,
  createArticle,
  changeArticle,
  deleteArticle,
  toggleLikeArticle,
};
