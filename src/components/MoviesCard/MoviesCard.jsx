import { useState } from "react";
import "./MoviesCard.css";

function MovieCard({ movie, name, duration, link }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const onDelete = (movie) => {
    console.log(movie);
    setIsSaved(false);
  };

  return (
    <li className="card">
      <div className="card__content">
        <h2 className="card__title">{name}</h2>
        <p className="card__subtitle">{duration} минут</p>
      </div>
      <img src={link} alt={name} className="card__image" />
      {!isSaved ? (
        <button
          type="button"
          className={`${
            isChecked ? "card__check-button_active" : "card__check-button"
          }`}
          onClick={handleCheck}
        ></button>
      ) : (
        <button
          type="button"
          className="card__delete-button_active"
          onClick={() => onDelete(movie)}
        ></button>
      )}
    </li>
  );
}

export default MovieCard;
