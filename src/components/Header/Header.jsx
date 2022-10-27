import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom"
import logo from "../../images/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import styled from "styled-components";

const Wrapper = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

function Header({ loggedIn, isBurgerOpened, onBurgerOpen }) {
  let location = useLocation();

  const onBurgerClick = () => {
    onBurgerOpen();
  };

  return (
    <div
      className={`header ${location.pathname === "/" ? "header_unlogged" : ""}`}
    >
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="link logo-icon" />
        </Link>

        {loggedIn ? (
          <>
            <Wrapper>
              <Navigation
                loggedIn={loggedIn}
                isBurgerOpened={isBurgerOpened}
                onBurgerOpen={onBurgerOpen}
              />
            </Wrapper>

            <div className="burger" onClick={onBurgerClick}>
              {isBurgerOpened ? (
                <div className="burger-close">
                  <span className="burger-close-line burger-close-line_first"></span>
                  <span className="burger-close-line burger-close-line_second"></span>
                </div>
              ) : (
                <>
                  <span className="burger__line burger__line_first"></span>
                  <span className="burger__line burger__line_second"></span>
                  <span className="burger__line burger__line_third"></span>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="header_nav">
            <Link to="/signup" className="link header__item">
              Регистрация
            </Link>
            <Link to="/signin" className="link header__item_signin">
              Войти
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
