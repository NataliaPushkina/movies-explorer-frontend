import { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  handleSearchClick,
  checkboxChecked,
  onCheckChange,
  searchInfo,
  setSearchInfo,
}) {
  const [searchInfoError, setSearchInfoError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    setSearchInfo(e.target.value);
    if (e.target.value.length === 0) {
      setSearchInfoError("Нужно ввести ключевое слово");
      setFormValid(false);
    } else {
      setSearchInfoError("");
      setFormValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchClick(searchInfo);
  };

  useEffect(() => {
    if (searchInfo && !searchInfoError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [searchInfo, searchInfoError]);

  useEffect(() => {
    if (!searchInfo) {
      setSearchInfoError("Нужно ввести ключевое слово");
    }
  }, [searchInfo])

  return (
    <section className="section__search-form">
      <form className="search-form__form" noValidate onSubmit={handleSubmit}>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            required
            placeholder="Введите поисковый запрос"
            type="text"
            name="search-info"
            id="search-info"
            minLength="2"
            value={searchInfo || ""}
            onChange={(e) => handleChange(e)}
          ></input>
          <button
            type="submit"
            className="button search-form__button"
            disabled={!formValid}
          ></button>
        </div>
        <span className="input__error search-info-error">
          {searchInfoError}
        </span>
      </form>
      <FilterCheckbox
        checkboxChecked={checkboxChecked}
        onCheckChange={onCheckChange}
      ></FilterCheckbox>
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
