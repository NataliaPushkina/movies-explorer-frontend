import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
// import Movies from "../Movies/Movies";
// import SavedMovies from "../SavedMovies/SavedMovies";
// import Register from "../Register/Register";
// import Profile from "../Profile/Profile";
// import Login from "../Login/Login";
// import NotFoundPage from "../NotFoundPage/NotFoundPage";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ConfirmWindow from "../ConfirmWindow/ConfirmWindow";
import * as mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import moviesList from "../../data.json";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false); // eslint-disable-next-line
  const [userName, setUserName] = useState(""); // eslint-disable-next-line
  const [userEmail, setUserEmail] = useState(""); // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false); // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" }); // eslint-disable-next-line
  const [movies, setMovies] = useState(moviesList); // eslint-disable-next-line
  const [savedMovies, setSavedMovies] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(true);
  const [isInfoTooltipPopupOpened, setIsInfoTooltipPopupOpened] =
    useState(false);
  const [isConfirmWindowOpened, setIsConfirmWindowOpened] = useState(false);

  const history = useHistory();
  let location = useLocation();

  const handleBurgerOpen = () => {
    setIsBurgerOpened(!isBurgerOpened);
  };

  const infoTooltipOpen = () => {
    setIsInfoTooltipPopupOpened(!isInfoTooltipPopupOpened);
  };
  // eslint-disable-next-line
  const confirmWindowOpen = () => {
    setIsConfirmWindowOpened(!isConfirmWindowOpened);
  };

  const handleRegister = (name, email, password) => {
    // mainApi
    //   .register(name, email, password)
    //   .then(() => {
    console.log(name, email, password);
    setRegistrationSuccess(true);
    history.push("/signin");
    // })
    // .catch((err) => {
    //   setRegistrationSuccess(false);
    //   console.log(err);
    // })
    // .finally(() => {
    infoTooltipOpen();
    // });
  };

  const handleLogin = (email, password) => {
    // mainApi
    //   .authorize(email, password)
    //   .then((res) => {
    setLoggedIn(true);
    history.push("/movies");
    // })
    // .catch((err) => {
    // setRegistrationSuccess(false);
    //   infoTooltipOpen();
    //   console.log(err);
    // });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then((res) => {
        setLoggedIn(false);
        history.push("/signin");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleCheckButtonClick = (movie) => {
    const isSaved = savedMovies.includes(movie);
    console.log(isSaved);
  };

  const handleDeleteClick = (movie) => {
    console.log("Deleted");
  };

  const closeModalWindows = () => {
    setIsInfoTooltipPopupOpened(false);
    setIsConfirmWindowOpened(false);
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeModalWindows();
    }
  };

  const handleSubmitConfirm = (e) => {
    console.log(e);
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeModalWindows();
      }
    }
    if (isInfoTooltipPopupOpened || isConfirmWindowOpened) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isInfoTooltipPopupOpened, isConfirmWindowOpened]);

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
        userName={userName}
        userEmail={userEmail}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        infoTooltipOpen={infoTooltipOpen}
        registrationSuccess={registrationSuccess}
        handleCheckButtonClick={handleCheckButtonClick}
        movies={movies}
        isLoading={isLoading}
        handleDeleteClick={handleDeleteClick}
        >
        </Main>
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
      />
      <ConfirmWindow
        isConfirmWindowOpened={isConfirmWindowOpened}
        onClose={closeModalWindows}
        onOverlay={handleOverlay}
        onSubmitConfirm={handleSubmitConfirm}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
