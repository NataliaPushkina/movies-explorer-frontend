import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  isLiked,
  onDeleteClick,
  savedMovies,
  handleSearchClick,
  checkboxChecked,
  onCheckChange,
  searchInfo,
  setSearchInfo,
  onCheckButtonClick
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        handleSearchClick={handleSearchClick}
        checkboxChecked={checkboxChecked}
        onCheckChange={onCheckChange}
        searchInfo={searchInfo}
        setSearchInfo={setSearchInfo}
      />
      {savedMovies.length > 0 ? (
        <MoviesCardList
          onDeleteClick={onDeleteClick}
          movies={savedMovies}
          isLiked={true}
          onCheckButtonClick={onCheckButtonClick}
        />
      ) : (
        <h1 className="saved-movies__text">Нет сохранённых фильмов!</h1>
      )}
    </section>
  );
}

export default SavedMovies;
