import { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  const [searchInfo, setSearchInfo] = useState("");
  const [searchInfoError, setSearchInfoError] = useState("");

  const handleChange = (e) => {
    setSearchInfo(e.target.value);
    if (!e.target.value) {
      setSearchInfoError("Введите поисковый запрос");
    } else {
      setSearchInfoError("");
    }
  };

  return (
    <section className="section__search-form">
      <form className="search-form__form" noValidate>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            required
            type="text"
            name="search-info"
            id="search-info"
            value={searchInfo}
            onChange={(e) => handleChange(e)}
          ></input>
          <button type="submit" className="button search-form__button" ></button>
        </div>
        <span className="input__error search-info-error">
          {searchInfoError}
        </span>
      </form>
      <FilterCheckbox></FilterCheckbox>
      <div className="search-form__line"></div>
    </section>
  );
}

export default SearchForm;
