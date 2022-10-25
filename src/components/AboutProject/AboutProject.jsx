import './AboutProject.css';

function AboutProject() {
  return (
    <section className='section__about-project'>
      <h2 className='section__title'>О проекте</h2>
      <div className='section__title-border'></div>
      <div className='about-project__containers'>
        <div className='about-project__container'>
          <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__container'>
          <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно былособлюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__timeLink'>
        <div className='about-project__timeLink_part1'>1 неделя</div>
        <div className='about-project__timeLink_part2'>4 недели</div>
      </div>
      <div className='about-project__timeLink'>
        <div className='about-project__timeLink_text1'>Back-end</div>
        <div className='about-project__timeLink_text2'>Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;
