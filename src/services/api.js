import axios from "axios";

class Api {
  _base = "https://blog.kata.academy/api";

  getArticles(page) {
    return axios
      .get(`${this._base}/articles?offset=${page}`)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }

  getArticleBySlug(slug) {
    return axios
      .get(`${this._base}/articles/${slug}`)
      .then((response) => response.data)
      .catch((err) => {
        throw err;
      });
  }
}

const api = new Api();

export default api;
