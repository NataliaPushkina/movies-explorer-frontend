import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./MovieCard.css";

function MovieCard({
  movie,
  name,
  duration,
  trailerLink,
  onDeleteClick,
  onCheckButtonClick,
  // isLiked,
  onDeleteLikeClick,
}) {
  const [isLiked, setIsLiked] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  // const currentUser = useContext(CurrentUserContext);
  // const isSaved = movie.owner === currentUser._id;

  // const isLiked = movie.filter((i) => i.isliked === true);
  let location = useLocation();

  const onClickButton = (movie) => {
    setIsLiked(!isLiked);
    onCheckButtonClick(movie, isLiked);
  };

  const onDelete = (movie) => {
    console.log(movie);
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
        {location.pathname === "/movies" ? (
          <img
            className="card__image"
            max-width="360"
            height="200"
            controls
            src={`https://api.nomoreparties.co${movie.image.url}`}
            alt={name}
          />
        ) : null}

        {location.pathname === "/saved-movies" ? (
          <img
            className="card__image"
            max-width="360"
            height="200"
            controls
            src={movie.image}
            alt={name}
          />
        ) : null}
      </a>

      {location.pathname === "/movies" ? (
        <button
          type="button"
          className={`${
            isLiked ? "card__check-button_active" : "card__check-button"
          }`}
          onClick={() => onClickButton(movie)}
        ></button>
      ) : null}
      {location.pathname === "/saved-movies" ? (
        <button
          type="button"
          className="card__delete-button_active"
          onClick={() => onDelete(movie)}
        ></button>
      ) : null}
    </li>
  );
}

export default MovieCard;
