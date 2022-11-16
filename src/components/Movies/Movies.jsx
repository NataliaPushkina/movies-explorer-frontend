import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

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
      />
    </section>
  );
}

export default Movies;
