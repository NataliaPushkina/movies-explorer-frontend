import usePagination from "../../hooks/usePagination";
import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList({
  onCheckButtonClick,
  movies,
  errorMovie,
  onSaveClick,
  onDeleteClick,

  ...props
}) {
  const pagination = usePagination({
    count: movies.length,
  });

  return (
    <section className="section__movies-card-list">
      <span className="movies-card-list__info">{errorMovie}</span>
      <ul className="movies-card-list__list">
        {movies
          .slice(pagination.firstIndex, pagination.lastIndex)
          .map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                name={movie.nameRU}
                trailerLink={movie.trailerLink}
                duration={movie.duration}
                onCheckButtonClick={onCheckButtonClick}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
              />
            );
          }
          )}
      </ul>

      {/* <button
        className="movies-card-list__button"
        onClick={pagination.showNextCards}
      >
        Ещё
      </button> */}

      <button
        className={`${
          movies.length > pagination.lastIndex + pagination.contentPerPage
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
