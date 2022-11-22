import { useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
  isSaved,
  handleSearchSavedMovies,
  handleCheckSaveChange,
  currentUser,
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
          currentUser={currentUser}
        ></ProtectedRoute>
        <Route exact path="/signin">
          {loggedIn ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route exact path="/signup">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Register
              onRegister={handleRegister}
              onInfoTooltipOpen={infoTooltipOpen}
              registrationSuccess={registrationSuccess}
            />
          )}
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
          movies={movies}
          isLoading={isLoading}
          handleSearchClick={handleSearchClick}
          errorMovie={errorMovie}
          checkboxChecked={checkboxChecked}
          onCheckChange={onCheckChange}
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          onSaveClick={onSaveClick}
          isSaved={isSaved}
          onDeleteClick={handleDeleteClick}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          onDeleteClick={handleDeleteClick}
          savedMovies={savedMovies}
          handleSearchClick={handleSearchSavedMovies}
          isSaved={isSaved}
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
          checkboxChecked={checkboxChecked}
          onCheckChange={handleCheckSaveChange}
        ></ProtectedRoute>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </section>
  );
}

export default Main;
