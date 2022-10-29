import './Main.css'
import Promo from '../Promo/Promo';
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main({ handleScrollClick }) {
  return (
    <div className="main">
      <Promo
      handleScrollClick={handleScrollClick}
      />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </div>
  )
}

export default Main;
