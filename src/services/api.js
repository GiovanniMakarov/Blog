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

  loginUser(email, password) {
    return axios.post(`${this._base}/users/login`, {
      user: {
        email,
        password,
      },
    });
  }

  getUserDataByToken(token) {
    return axios({
      url: `${this._base}/user`,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.data)
      .catch((err) => {
        throw err;
      });
  }

  createUser(username, email, password) {
    return axios
      .post(`${this._base}/users`, {
        user: {
          username,
          email,
          password,
        },
      })
      .then((resp) => resp.data)
      .catch((err) => {
        throw err;
      });
  }

  changeUserData(data, token) {
    return axios({
      url: `${this._base}/user`,
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        user: {
          ...data,
        },
      },
    })
      .then((resp) => resp.data)
      .catch((err) => {
        throw err;
      });
  }
}

const api = new Api();

export default api;
