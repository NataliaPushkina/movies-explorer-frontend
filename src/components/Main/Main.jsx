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

function Main({
  userName,
  userEmail,
  handleLogout,
  handleLogin,
  handleRegister,
  infoTooltipOpen,
  registrationSuccess,
  handleCheckButtonClick,
  movies,
  isLoading,
  handleDeleteClick,
}) {
  const aboutRef = useRef(null);

  const handleScrollClick = () =>
    window.scrollTo({ behavior: "smooth", top: aboutRef.current.offsetTop });

  return (
    <section className="main">
      <Switch>
        <Route exact path="/profile">
          <Profile
            userName={userName}
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        </Route>
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
        <Route exact path="/movies">
          <Movies
            onCheckButtonClick={handleCheckButtonClick}
            movies={movies}
            isLoading={isLoading}
          />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies movies={movies} onDeleteClick={handleDeleteClick} />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </section>
  );
}

export default Main;
