class MovieApi {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(this._url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const moviesApi = new MovieApi('https://api.nomoreparties.co/beatfilm-movies');
export default moviesApi;
