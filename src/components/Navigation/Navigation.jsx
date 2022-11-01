import { NavLink as Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <Link
        exact
        to="/movies"
        activeClassName="navigation__item-active"
        className="link navigation__item"
      >
        Фильмы
      </Link>
      <Link
        exact
        to="/saved-movies"
        activeClassName="navigation__item-active"
        className="link navigation__item"
      >
        Сохранённые фильмы
      </Link>
      <Link
        exact
        to="/profile"
        activeClassName="navigation__item-active"
        className="link navigation__item"
      >
        <div className="navigation__user-account">
          Аккаунт
          <div className="user-icon" />
        </div>
      </Link>
    </nav>
  );
}

export default Navigation;
