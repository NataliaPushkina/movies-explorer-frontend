import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ onDeleteClick, movies }) {
  return (
    <section className="saved-movies">
      <SearchForm />
      {movies ? (
        <MoviesCardList onCheckButtonClick={onDeleteClick} movies={movies} />
      ) : (
        <h1 className="saved-movies__text">Нет сохранённых фильмов!</h1>
      )}
    </section>
  );
}

export default SavedMovies;
