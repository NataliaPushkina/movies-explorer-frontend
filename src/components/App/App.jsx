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
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isInfoTooltipPopupOpened, setIsInfoTooltipPopupOpened] =
    useState(false);
  const [errorMovie, setErrorMovie] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    mainApi
      .getUserInfo()
      .then((userData) => {
        if (userData) {
          setLoggedIn(true);
          setCurrentUser(userData);
          console.log(userData);
          history.push(path);
        }
      })
      .catch((err) => {
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser(null);
        setMovies([]);
        setSavedMovies([]);
        setErrorMovie("");
        setCheckboxChecked(false);
        setSearchInfo("");
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
        setIsBurgerOpened(false);
        setIsLoading(false);
        setCurrentUser(null);
        setMovies([]);
        setSavedMovies([]);
        setErrorMovie("");
        setCheckboxChecked(false);
        setSearchInfo("");
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
        history.push("/");
      });
  };

  //ПОИСК ФИЛЬМОВ
  const handleSearchClick = async (info) => {
    localStorage.setItem("searchInfo", JSON.stringify(info));
    setErrorMovie("");
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
          console.log(errorMovie);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    await filterData(data, info);
    setMovies(filterData(data, info));
    localStorage.setItem(
      "findedMovies",
      JSON.stringify(filterData(data, info))
    );
  };

  const handleSearchSavedMovies = (info) => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        const savedMoviesList = res.filter(
          (item) => item.owner === currentUser._id
        );
        filterData(savedMoviesList, info);
        setSavedMovies(filterData(savedMoviesList, info));
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(savedMovies);
    filterData(savedMovies, info);
    setSavedMovies(filterData(savedMovies, info));
  };

  //ПЕРЕКЛЮЧАТЕЛИ ЧЕКБОКСА
  const handleCheckChange = () => {
    const info = JSON.parse(localStorage.getItem("searchInfo"));
    setCheckboxChecked(!checkboxChecked);
    localStorage.setItem("checkbox", JSON.stringify(!checkboxChecked));
    const data = JSON.parse(localStorage.getItem("moviesList"));
    filterData(data, info);
    setMovies(filterData(data, info));
    localStorage.setItem(
      "findedMovies",
      JSON.stringify(filterData(data, info))
    );
  };

  const handleCheckSaveChange = () => {
    const info = JSON.parse(localStorage.getItem("searchInfo"));
    setCheckboxChecked(!checkboxChecked);
    localStorage.setItem("checkbox", JSON.stringify(!checkboxChecked));
    mainApi
      .getSavedMovies()
      .then((res) => {
        const savedMoviesList = res.filter(
          (item) => item.owner === currentUser._id
        );
        filterData(savedMoviesList, info);
        setSavedMovies(filterData(savedMoviesList, info));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ФИЛЬТРАЦИЯ ДАННЫХ
  const filterData = (data, info) => {
    let result;
    setErrorMovie("");
    const checkboxChecked = JSON.parse(localStorage.getItem("checkbox"));
    let infoRu;
    let infoEn;
    console.log("info", info);
    console.log("data", data);
    console.log("checkbox", checkboxChecked);
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
    console.log("filterData", result);
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
        setSavedMovies([res, ...savedMovies]);
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
          setSavedMovies((savedMovies) =>
            savedMovies.filter((c) =>
              c._id !== selectedMovie._id ? res : null
            )
          );
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
    const path = location.pathname;
    const checkbox = JSON.parse(localStorage.getItem("checkbox"));
    if (path === "/saved-movies" && checkbox) {
      console.log(path);
      console.log(checkbox);
      setCheckboxChecked(!checkbox);
      localStorage.setItem("checkbox", JSON.stringify(!checkbox));
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      const searchInfo = localStorage.getItem("searchInfo");
      setSearchInfo(JSON.parse(searchInfo));
    } else {
      setSearchInfo("");
    }
  }, [location]);

  useEffect(() => {
    if (currentUser) {
      mainApi
        .getSavedMovies()
        .then((res) => {
          const savedMoviesList = res.filter(
            (item) => item.owner === currentUser._id
          );
          setSavedMovies(savedMoviesList);
          console.log('сохранённые', savedMovies);
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
          handleSearchSavedMovies={handleSearchSavedMovies}
          handleCheckSaveChange={handleCheckSaveChange}
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
