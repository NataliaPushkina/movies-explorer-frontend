import { useRef } from "react";
import { Route, Switch } from "react-router-dom";
import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function Main({
  handleLogout,
  handleLogin,
  handleRegister,
  infoTooltipOpen,
  registrationSuccess,
  handleCheckButtonClick,
  movies,
  savedMovies,
  isLoading,
  handleDeleteClick,
  handleSearchClick,
  errorMovie,
  checkboxChecked,
  onCheckChange,
  searchInfo,
  setSearchInfo,
  loggedIn,
  onUpdateInfo,
  onSaveClick,
  isLiked,
  onDeleteLikeClick,
  // currentUser,
}) {
  const aboutRef = useRef(null);

  const handleScrollClick = () =>
    window.scrollTo({ behavior: "smooth", top: aboutRef.current.offsetTop });

  return (
    <section className="main">
      <Switch>
        <ProtectedRoute
          exact
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onLogout={handleLogout}
          onUpdateInfo={onUpdateInfo}
        ></ProtectedRoute>
        <Route exact path="/signin">
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/signup">
          <Register
            onRegister={handleRegister}
            onInfoTooltipOpen={infoTooltipOpen}
            registrationSuccess={registrationSuccess}
          />
        </Route>
        <Route exact path="/">
          <Promo handleScrollClick={handleScrollClick} />
          <div className="main_ref" ref={aboutRef}>
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
          </div>
        </Route>
        <ProtectedRoute
          exact
          path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          onCheckButtonClick={handleCheckButtonClick}
          movies={movies}
          isLoading={isLoading}
          handleSearchClick={handleSearchClick}
          errorMovie={errorMovie}
          checkboxChecked={checkboxChecked}
          onCheckChange={onCheckChange}
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          onSaveClick={onSaveClick}
          isLiked={isLiked}
          onDeleteLikeClick={onDeleteLikeClick}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          onDeleteClick={handleDeleteClick}
          savedMovies={savedMovies}
          handleSearchClick={handleSearchClick}
          isLiked={isLiked}
        ></ProtectedRoute>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </section>
  );
}

export default Main;
