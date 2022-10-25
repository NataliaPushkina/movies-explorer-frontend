import './Main.css'
import Promo from '../Promo/Promo';

function Main({ onNavTabButtonClick, isNavTabButtonActive }) {
  return (
    <div className="main">
      <Promo
        onNavTabButtonClick={onNavTabButtonClick}
        isNavTabButtonActive={isNavTabButtonActive}
      />
    </div>
  )
}

export default Main;