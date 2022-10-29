import { useRef } from 'react';
import './Main.css'
import Promo from '../Promo/Promo';
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main() {
  const aboutRef = useRef(null);

  const handleScrollClick = () => window.scrollTo({ behavior: 'smooth', top: aboutRef.current.offsetTop });

  return (
    <div className="main">
      <Promo
      handleScrollClick={handleScrollClick}
      />
      <div className='main_ref' ref={aboutRef}>
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      </div>
    </div>
  )
}

export default Main;
