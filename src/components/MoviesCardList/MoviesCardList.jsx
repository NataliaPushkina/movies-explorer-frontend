import usePagination from "../../hooks/usePagination";
import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList({
  movies,
  errorMovie,
  onSaveClick,
  onDeleteClick,
  isSaved,
}) {

  const pagination = usePagination();

  return (
    <section className="section__movies-card-list">
      <span className="movies-card-list__info">{errorMovie}</span>
      <ul className="movies-card-list__list">
        {movies
          .slice(pagination.firstIndex, pagination.lastIndex)
          .map((movie) => {
            return (
              <MovieCard
                key={movie.id || movie._id}
                movie={movie}
                name={movie.nameRU}
                trailerLink={movie.trailerLink}
                duration={movie.duration}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
                isSaved={isSaved}
              />
            );
          })}
      </ul>

      <button
        className={`${
          movies.length >= pagination.lastIndex
            ? "movies-card-list__button"
            : "movies-card-list__button_hidden"
        }`}
        onClick={pagination.showNextCards}
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
