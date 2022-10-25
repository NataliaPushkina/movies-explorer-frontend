import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ onDeleteClick, movies }) {
  return (
    <section className="saved-movies">
      {!movies ? (
        <MoviesCardList onCheckButtonClick={onDeleteClick} movies={movies} />
      ) : (
        <h1 className="saved-movies__text">Нет сохранённых фильмов!</h1>
      )}
    </section>
  );
}

export default SavedMovies;
