import './Portfolio.css';

function Portfolio() {
  return (
    <section className='section__portfolio'>
      <ul className='portfolio__list'>
        Портфолио
        <li className='portfolio__item'>
          <a
            href='https://github.com/NataliaPushkina/how-to-learn.git'
            target='_blank'
            rel='noopener noreferrer'
            className='portfolio__item-link'>
            <p className='portfolio__item-text'>Статичный сайт</p>
            <div className='portfolio__icon'></div>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://nataliapushkina.github.io/russian-travel/'
            target='_blank'
            rel='noopener noreferrer'
            className='portfolio__item-link'>
            <p className='portfolio__item-text'>Адаптивный сайт</p>
            <div className='portfolio__icon'></div>
          </a>
        </li>
        <li className='portfolio__item'>
          <a href='https://pushkina.nomorepartiesxyz.ru'
            target='_blank'
            rel='noopener noreferrer'
            className='portfolio__item-link'>
            <p className='portfolio__item-text'>Одностраничное приложение</p>
            <div className='portfolio__icon'></div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
