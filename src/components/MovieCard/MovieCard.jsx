import { Route } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({
  movie,
  name,
  duration,
  trailerLink,
  onDeleteClick,
  onSaveClick,
  isSaved,
}) {
  const onSaveButton = (movie) => {
    onSaveClick(movie);
  };

  const onDelete = (movie) => {
    onDeleteClick(movie);
  };

  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__title">{name}</h2>
        <p className="card__subtitle">{duration} минут</p>
      </div>
      <a
        href={trailerLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="card__item-link"
      >
        <Route path="/saved-movies">
          <img
            className="card__image"
            max-width="360"
            height="200"
            controls
            src={movie.image}
            alt={name}
          />
        </Route>
        <Route path="/movies">
          <img
            className="card__image"
            max-width="360"
            height="200"
            controls
            src={`https://api.nomoreparties.co${movie.image.url}`}
            alt={name}
          />
        </Route>
      </a>

      <Route path="/saved-movies">
        <button
          type="button"
          className="card__delete-button_active"
          onClick={() => onDelete(movie)}
        ></button>
      </Route>
      <Route path="/movies">
        {isSaved(movie) ? (
          <button
            type="button"
            className="card__check-button_active"
            onClick={() => onDelete(movie)}
          ></button>
        ) : (
          <button
            type="button"
            className="card__check-button"
            onClick={() => onSaveButton(movie)}
          ></button>
        )}
      </Route>
    </li>
  );
}

export default MovieCard;
