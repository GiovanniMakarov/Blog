/* eslint-disable default-param-last */
import actionTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  page: null,
  loading: false,
  error: false,
};

const reducerContent = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.SUCCESS_LOADING:
      return {
        ...state,
        data: action.data,
      };

    case actionTypes.ERROR_LOADING:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case actionTypes.REPLACE_ARTICLE: {
      if (state.data.article) {
        return {
          ...state,
          data: action.newArticle,
        };
      }
      const oldArticles = state.data.articles;
      const idx = oldArticles.findIndex((art) => art.slug === action.newArticle.article.slug);
      const newArr = [...oldArticles.slice(0, idx), action.newArticle.article, ...oldArticles.slice(idx + 1)];

      return {
        ...state,
        data: { articles: newArr, articlesCount: state.data.articlesCount },
      };
    }

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default reducerContent;
