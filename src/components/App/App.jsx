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
  const [isSaved, setIsSaved] = useState(false);

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
          // console.log(res);
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
    setErrorMovie("");
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
    // let data;
    // if (location.pathname = '/movies') {
    //   data = JSON.parse(localStorage.getItem("moviesList"));
    // } else if (location.pathname = '/saved-movies') {
    //   data = savedMovies;
    // }
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
      console.log("регулярки", infoRu, infoEn);
    }
    if (result.length === 0) {
      setErrorMovie("Ничего не найдено!");
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
    localStorage.setItem("foundedMovies", JSON.stringify(result));
    setMovies(result);
    console.log("filterMovie результат", result);
  };

  const toggleLike = (movie) => {
    setIsSaved(movie.owner === currentUser._id);
    if (isSaved) {
      handleSaveClick(movie);
    } else {
      handleDeleteClick(movie);
    }
  }

  // СОХРАНЕНИЕ ФИЛЬМА
  const handleSaveClick = ({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN,
    thumbnail, movieId, _id, isSaved }) => {
      if (!isSaved) {
    mainApi
      .saveMovie({
        country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail,
        movieId, _id, isSaved
      })
      .then((res) => {
        console.log(isSaved);
        savedMovies.push(res);
        setSavedMovies(savedMovies);
        console.log('сохраненные фильмы', savedMovies);
      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log('фильм уже сохранен');
    }
  };

  // УДАЛЕНИЕ ИЗ СОХРАНЕННЫХ
  const handleDeleteClick = (movie) => {
    console.log(savedMovies, movie);
    mainApi
      .removeMovie(movie._id)
      .then((res) => {
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
    setCheckboxChecked(JSON.parse(checkbox));
  }, []);

  useEffect(() => {
    const foundedMovies = localStorage.getItem("foundedMovies");
    if (!foundedMovies) {
      setMovies([]);
    } else {
      setMovies(JSON.parse(foundedMovies));
    }
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //   mainApi.getSavedMovies()
  //     .then((res) => {
  //       setSavedMovies(res.filter((movie) => movie.owner === currentUser._id));
  //       setSavedMovies(res);
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // },[loggedIn, currentUser]);

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
          isSaved={isSaved}
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
