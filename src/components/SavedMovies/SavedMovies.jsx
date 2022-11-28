import { useState, useEffect } from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  onDeleteClick,
  savedMovies,
  onCheckButtonClick,
  isSaved,
  filterData,
}) {
  const [searchSavedInfo, setSearchSavedInfo] = useState("");
  const [checkbox, setСheckbox] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState("");

  const onCheckChange = () => {
    setСheckbox(!checkbox);
    console.log(savedMovies, searchSavedInfo, !checkbox);
    const result = filterData(savedMovies, searchSavedInfo, !checkbox);
    if (result.length === 0) {
      setError("Ничего не найдено!");
    } else {
      setError("");
    }
    setFilteredMovies(result);
  };

  const handleSavedSearchClick = (info) => {
    setSearchSavedInfo(info);
    const result = filterData(savedMovies, info, checkbox);
    if (result.length === 0) {
      setError("Ничего не найдено!");
    } else {
      setError("");
    }
    setFilteredMovies(result);
  };

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearchClick={handleSavedSearchClick}
        checkboxChecked={checkbox}
        onCheckChange={onCheckChange}
        searchInfo={searchSavedInfo}
        setSearchInfo={setSearchSavedInfo}
      />
      {savedMovies.length > 0 ? (
        <MoviesCardList
          onDeleteClick={onDeleteClick}
          movies={filteredMovies}
          isSaved={isSaved}
          onCheckButtonClick={onCheckButtonClick}
          errorMovie={error}
        />
      ) : (
        <h1 className="saved-movies__text">Нет сохранённых фильмов!</h1>
      )}
    </section>
  );
}

export default SavedMovies;
