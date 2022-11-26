import { Link, useHistory } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  let history = useHistory();
  const goBackClick = () => {
    history.goBack();
    history.go(-3);
  }

  return (
    <section className='not-found-page'>
      <h3 className='not-found-page__title'>404</h3>
      <p className='not-found-page__subtitle'>Страница не найдена</p>
      <Link className='link not-found-page__link' onClick={goBackClick}>
      Назад
      </Link>
    </section>
  )
}

export default NotFoundPage;
