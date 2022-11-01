import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ onCheckButtonClick, movies, isLoading }) {
  return (
    <section className="movies">
      <SearchForm></SearchForm>
      {isLoading ? <Preloader /> : null}
      <MoviesCardList onCheckButtonClick={onCheckButtonClick} movies={movies} />
      <button className="movies__button">Ещё</button>
    </section>
  );
}

export default Movies;
