export const BASE_URL = "https://api.pushkina.nomoredomains.icu";
// export const BASE_URL = 'http://localhost:3000';

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const headers = {
  "Content-Type": "application/json",
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ name, email, password }),
  }).then((response) => getResponseData(response));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((response) => getResponseData(response));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    credentials: "include",
    headers,
  }).then((response) => getResponseData(response));
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers,
  }).then((response) => getResponseData(response));
};

export const updateUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers,
    body: JSON.stringify({ name, email }),
  }).then((response) => getResponseData(response));
};

export const saveMovie = ({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId }),
  }).then((response) => getResponseData(response));
};

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers,
  }).then((response) => getResponseData(response));
};

export const removeMovie = (_id) => {
  return fetch(`${BASE_URL}/movies/${_id}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  }).then((response) => getResponseData(response));
};
