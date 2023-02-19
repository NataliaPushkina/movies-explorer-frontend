import { Link } from "react-router-dom";
import "./BurgerMenu.css";

function BurgerMenu({ onBurgerOpen }) {
  return (
    <section className="section__burger-menu">
      <div className="burger-menu">
        <div className="burger-menu__content">
          <ul className="burger-menu__list">
            <li className="burger-menu__item" onClick={onBurgerOpen}>
              <Link to="/" className="burger-menu__link">
                Главная
              </Link>
            </li>
            <li className="burger-menu__item" onClick={onBurgerOpen}>
              <Link to="/movies" className="burger-menu__link">
                Фильмы
              </Link>
            </li>
            <li className="burger-menu__item" onClick={onBurgerOpen}>
              <Link to="/saved-movies" className="burger-menu__link">
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <div className="burger-menu__item" onClick={onBurgerOpen}>
            <Link
              to="/profile"
              className="burger-menu__link"
            >
              Аккаунт
            </Link>
            <div className="user-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BurgerMenu;
