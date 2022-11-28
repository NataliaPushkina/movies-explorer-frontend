import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import usePagination from "../../hooks/usePagination";

function Movies({
  onCheckButtonClick,
  movies,
  isLoading,
  handleSearchClick,
  errorMovie,
  checkboxChecked,
  onCheckChange,
  searchInfo,
  setSearchInfo,
  onSaveClick,
  onDeleteClick,
  isSaved,
}) {

  const pagination = usePagination();

  return (
    <section className="movies">
      <SearchForm
        handleSearchClick={handleSearchClick}
        checkboxChecked={checkboxChecked}
        onCheckChange={onCheckChange}
        searchInfo={searchInfo}
        setSearchInfo={setSearchInfo}
      />
      {isLoading ? <Preloader /> : null}
      <MoviesCardList
        onCheckButtonClick={onCheckButtonClick}
        movies={movies}
        errorMovie={errorMovie}
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
        isSaved={isSaved}
        lastIndex={pagination.lastIndex}
      />

      <button
        className={`${
          movies.length > pagination.lastIndex
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

export default Movies;
