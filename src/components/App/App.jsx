import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoTooltipPopupOpened, setIsInfoTooltipPopupOpened] =
    useState(false);
  const [errorMovie, setErrorMovie] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    mainApi
      .getUserInfo()
      .then((userData) => {
        if (userData) {
          setLoggedIn(true);
          setCurrentUser(userData);
          history.push(path);
        } else {
          clearUserData();
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        clearUserData();
        console.log(err);
      });
  }, [loggedIn]);

  const clearUserData = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser(null);
    setMovies([]);
    setSavedMovies([]);
    setErrorMovie("");
    setCheckboxChecked(false);
    setSearchInfo("");
    setMessage("");
  };

  const handleBurgerOpen = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  const infoTooltipOpen = (message) => {
    setIsInfoTooltipPopupOpened(!isInfoTooltipPopupOpened);
    setMessage(message);
  };

  const closeModalWindows = () => {
    setIsInfoTooltipPopupOpened(false);
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeModalWindows();
    }
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeModalWindows();
      }
    }
    if (isInfoTooltipPopupOpened) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isInfoTooltipPopupOpened]);

  const handleRegister = (name, email, password) => {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          infoTooltipOpen("Пользователь с таким email уже зарегистрирован!");
        } else {
          infoTooltipOpen("При регистрации произошла ошибка");
          console.log(err);
        }
      });
  };

  const handleLogin = (email, password) => {
    mainApi
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        if (err === "Ошибка: 400") {
          infoTooltipOpen("Неправильный email или пароль");
        } else {
          infoTooltipOpen("При авторизации пользователя произошла ошибка");
          console.log(err);
        }
      });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then((res) => {
        console.log(res);
        clearUserData();
        history.push("/");
      })
      .catch((err) => {
        infoTooltipOpen("Ошибка при выходе");
        console.log(err);
      });
  };

  //РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  const handleUpdateUserInfo = (name, email) => {
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        infoTooltipOpen("Данные пользователя успешно обновлены");
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          infoTooltipOpen("Пользователь с таким email уже существует");
        } else {
          infoTooltipOpen("При обновлении данных возникла ошибка");
          console.log(err);
        }
      });
  };

  //ПОИСК ФИЛЬМОВ
  const handleSearchClick = async (info) => {
    setErrorMovie("");
    localStorage.setItem("searchInfo", JSON.stringify(info));
    const checkbox = JSON.parse(
      localStorage.getItem("checkbox") || checkboxChecked
    );
    let data = JSON.parse(localStorage.getItem("moviesList"));
    if (!data) {
      setIsLoading(true);
      await moviesApi
        .getCards()
        .then((res) => {
          data = res;
          localStorage.setItem("moviesList", JSON.stringify(res));
          setMovies(res);
        })
        .catch((err) => {
          setErrorMovie(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    const result = await filterData(data, info, checkbox);
    if (result.length === 0) {
      setErrorMovie("Ничего не найдено!");
    } else {
      setErrorMovie("");
    }
    setMovies(result);
    localStorage.setItem("findedMovies", JSON.stringify(result));
  };

  //ПЕРЕКЛЮЧАТЕЛИ ЧЕКБОКСА
  const handleCheckChange = async () => {
    const info = JSON.parse(localStorage.getItem("searchInfo"));
    setCheckboxChecked(!checkboxChecked);
    localStorage.setItem("checkbox", JSON.stringify(!checkboxChecked));

    const data = JSON.parse(localStorage.getItem("moviesList"));

    const result = await filterData(data, info, !checkboxChecked);
    if (result.length === 0) {
      setErrorMovie("Ничего не найдено!");
    } else {
      setErrorMovie("");
    }
    setMovies(result);
    localStorage.setItem("findedMovies", JSON.stringify(result));
  };

  //ФИЛЬТРАЦИЯ ДАННЫХ
  const filterData = (data, info, checkbox) => {
    let result;
    setErrorMovie("");
    if (!info) {
      setErrorMovie("Введите поисковый запрос");
    }
    if (checkbox) {
      result = data.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(info) &&
          item.duration <= SHORT_MOVIE_DURATION
        );
      });
    } else {
      result = data.filter((item) => {
        return (
          item.nameRU.toLowerCase().includes(info) &&
          item.duration > SHORT_MOVIE_DURATION
        );
      });
    }
    // if (result.length === 0) {
    //   setErrorMovie("Ничего не найдено!");
    // }
    return result;
  };

  // СОХРАНЕНИЕ ФИЛЬМА
  const handleSaveClick = (movie) => {
    mainApi
      .saveMovie({
        country: movie.country,
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        trailerLink: movie.trailerLink,
        year: movie.year,
        owner: currentUser._id,
        isLiked: true,
      })
      .then((res) => {
        if (!res) {
          throw new Error("При добавлении фильма произошла ошибка");
        } else {
          setSavedMovies([res, ...savedMovies]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // УДАЛЕНИЕ ИЗ СОХРАНЕННЫХ
  const handleDeleteClick = (movie) => {
    const movieId = movie.id || movie.movieId;
    const selectedMovie = savedMovies.find(
      (i) => i.movieId === movieId && i.owner === currentUser._id
    );
    if (selectedMovie) {
      mainApi
        .removeMovie(selectedMovie._id)
        .then((res) => {
          if (!res) {
            throw new Error("При удалении фильма произошла ошибка");
          } else {
            setSavedMovies((savedMovies) =>
              savedMovies.filter((c) =>
                c._id !== selectedMovie._id ? res : null
              )
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkIsSaved = (movie) => {
    return savedMovies.some(
      (item) => item.movieId === movie.id && item.owner === currentUser._id
    );
  };

  useEffect(() => {
    const checkbox = JSON.parse(localStorage.getItem("checkbox"));
    if (checkbox) {
      setCheckboxChecked(checkbox);
    }
  }, []);

  useEffect(() => {
    const findedMovies = JSON.parse(localStorage.getItem("findedMovies"));
    if (findedMovies) {
      setMovies(findedMovies);
    }
  }, []);

  useEffect(() => {
    const searchInfo = localStorage.getItem("searchInfo");
    if (searchInfo) {
      setSearchInfo(JSON.parse(searchInfo));
    } else {
      setSearchInfo("");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          const savedMoviesList = res.filter(
            (item) => item.owner === currentUser._id
          );
          setSavedMovies(savedMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {isBurgerOpened ? (
          <BurgerMenu
            loggedIn={loggedIn}
            isBurgerOpened={isBurgerOpened}
            onBurgerOpen={handleBurgerOpen}
          />
        ) : null}

        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ? (
          <Header
            loggedIn={loggedIn}
            isBurgerOpened={isBurgerOpened}
            onBurgerOpen={handleBurgerOpen}
          ></Header>
        ) : null}
        <Main
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          handleLogout={handleLogout}
          infoTooltipOpen={infoTooltipOpen}
          movies={movies}
          isLoading={isLoading}
          handleDeleteClick={handleDeleteClick}
          handleSearchClick={handleSearchClick}
          errorMovie={errorMovie}
          checkboxChecked={checkboxChecked}
          onCheckChange={handleCheckChange}
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          loggedIn={loggedIn}
          onUpdateInfo={handleUpdateUserInfo}
          onSaveClick={handleSaveClick}
          savedMovies={savedMovies}
          isSaved={checkIsSaved}
          currentUser={currentUser}
          filterData={filterData}
        ></Main>
        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ? (
          <Footer />
        ) : null}
      </div>
      <InfoTooltip
        isInfoTooltipPopupOpened={isInfoTooltipPopupOpened}
        onClose={closeModalWindows}
        onOverlay={handleOverlay}
        message={message}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
