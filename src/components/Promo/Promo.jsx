import promoLogo from "../../images/promo-logo.svg";
import "./Promo.css";

function Promo({ handleScrollClick }) {
  return (
    <section className="promo__container">
      <div className="promo__content">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="link promo__link" onClick={handleScrollClick}>Узнать больше</button>
      </div>
      <img src={promoLogo} alt="Логотип" className="promo__logo"></img>
    </section>
  );
}

export default Promo;
