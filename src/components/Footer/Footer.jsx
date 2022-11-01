import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2022</p>
        <ul className='footer__list'>
          <li className='link footer__link-item'>
            <a className='footer__link'
              href='https://practicum.yandex.ru'
              target='_blank'
              rel='noopener noreferrer'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='link footer__link-item'>
            <a className='footer__link'
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;