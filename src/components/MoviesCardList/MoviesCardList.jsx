import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";

function MoviesCardList({
  movies,
  errorMovie,
  onSaveClick,
  onDeleteClick,
  isSaved,
  lastIndex,
}) {
  return (
    <section className="section__movies-card-list">
      <span className="movies-card-list__info">{errorMovie}</span>
      <ul className="movies-card-list__list">
        {movies.slice(0, lastIndex).map((movie) => {
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
    </section>
  );
}

export default MoviesCardList;
