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
import { REG_EXP_RU, REG_EXP_EN } from "../../utils/constants";

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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    mainApi
      .getUserInfo()
      .then((userData) => {
        setLoggedIn(true);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  const handleBurgerOpen = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  const infoTooltipOpen = () => {
    setIsInfoTooltipPopupOpened(!isInfoTooltipPopupOpened);
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
        console.log(name, email, password);
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
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
        setRegistrationSuccess(false);
        infoTooltipOpen();
        console.log(err);
      });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then((res) => {
        console.log(res);
        localStorage.clear();
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  const handleUpdateUserInfo = (name, email) => {
    mainApi
      .updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setUpdateSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setUpdateSuccess(false);
      })
      .finally(() => {
        infoTooltipOpen();
      });
  };

  //ПОИСК ФИЛЬМОВ
  const handleSearchClick = async (info) => {
    localStorage.setItem("searchInfo", JSON.stringify(info));
    setErrorMovie("");
    const data = JSON.parse(localStorage.getItem("moviesList"));
    if (!data) {
      setIsLoading(true);
      await moviesApi
        .getCards()
        .then((res) => {
          localStorage.setItem("moviesList", JSON.stringify(res));
          setMovies(res);
        })
        .catch((err) => {
          setErrorMovie(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(errorMovie);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    filterMovies(info);
  };

  //ПЕРЕКЛЮЧАТЕЛЬ ЧЕКБОКСА
  const handleCheckChange = () => {
    const info = JSON.parse(localStorage.getItem("searchInfo"));
    setCheckboxChecked(!checkboxChecked);
    localStorage.setItem("checkbox", JSON.stringify(!checkboxChecked));
    filterMovies(info);
    console.log("чекбокс, передаем", info);
  };

  //ФИЛЬТРАЦИЯ
  const filterMovies = (info) => {
    let result = [];
    setErrorMovie("");
    const data = JSON.parse(localStorage.getItem("moviesList"));
    const checkboxChecked = JSON.parse(localStorage.getItem("checkbox"));
    console.log("распарсить дату при фильтрации:", data);
    console.log("что ищем при фильтрации:", info);
    console.log("состояние чекбокс пр фильтрации", checkboxChecked);
    let infoRu;
    let infoEn;
    if (!info) {
      setErrorMovie("Введите поисковый запрос");
    } else {
      if (REG_EXP_RU.test(info)) {
        infoRu = info.toLowerCase();
      } else if (REG_EXP_EN.test(info)) {
        infoEn = info.toLowerCase();
      }
    }
    if (checkboxChecked) {
      result = data.filter(
        (item) =>
          (item.nameRU.toLowerCase().includes(infoRu) ||
            item.nameEN.toLowerCase().includes(infoEn)) &&
          item.duration <= 40
      );
    } else {
      result = data.filter(
        (item) =>
          (item.nameRU.toLowerCase().includes(infoRu) ||
            item.nameEN.toLowerCase().includes(infoEn)) &&
          item.duration > 40
      );
    }
    if (result.length === 0) {
      setErrorMovie("Ничего не найдено!");
    }
    localStorage.setItem("foundedMovies", JSON.stringify(result));
    setMovies(result);
    console.log("filterMovie результат", result);
  };

  const toggleLike = (movie) => {
    setIsLiked(!isLiked);
    console.log(movie, isLiked);
    if (!isLiked) {
      handleSaveClick(movie);
    } else {
      const movieId = movie.id || movie.movieId;
      const selectedMovie = savedMovies.find((i) => i.movieId === movieId);
      handleDeleteClick(selectedMovie);
    }
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
        savedMovies.push(res);
        setSavedMovies(savedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        console.log("сохраненные фильмы", savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // УДАЛЕНИЕ ИЗ СОХРАНЕННЫХ
  const handleDeleteClick = (movie) => {
    mainApi
      .removeMovie(movie._id)
      .then((res) => {
        console.log(res);
        setSavedMovies((savedMovies) =>
          savedMovies.filter((c) => (c._id !== movie._id ? res : null))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const checkbox = localStorage.getItem("checkbox");
    if (checkbox !== null) {
      setCheckboxChecked(JSON.parse(checkbox));
    }
  }, []);

  useEffect(() => {
    const foundedMovies = localStorage.getItem("foundedMovies");
    if (!foundedMovies) {
      setMovies([]);
    } else {
      setMovies(JSON.parse(foundedMovies));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      mainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res.filter(
          (item) => item.owner._id === currentUser._id
        ));
      })
      }
  },[currentUser]);

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
          isLiked={isLiked}
          handleCheckButtonClick={toggleLike}
          currentUser={currentUser}
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
        registrationSuccess={registrationSuccess}
        updateSuccess={updateSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
