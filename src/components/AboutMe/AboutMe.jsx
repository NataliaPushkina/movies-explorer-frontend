import './AboutMe.css';

function AboutMe() {
  return (
    <section className='section__about-me'>
      <h2 className='section__title'>Студент</h2>
      <div className='section__title-border'></div>
      <div className='about-me__container'>
        <div className='about-me__content'>
          <h3 className='about-me__title'>Наталия</h3>
          <h4 className='about-me__subtitle'>Студентка курса фронтенд разработчик</h4>
          <p className='about-me__text'>Я из Саратова. Закончила СГУ, специальность "прикладная информатика в социологии".
            Надеюсь пройти курс по веб-разработке и стать фронтенд-разработчиком!</p>
          <a className='link about-me__githab-link' href='https://github.com/NataliaPushkina' target='_blank' rel='noopener noreferrer'>Github</a>
        </div>
        <div className='about-me__photo'></div>
      </div>
    </section>
  )
}

export default AboutMe;
