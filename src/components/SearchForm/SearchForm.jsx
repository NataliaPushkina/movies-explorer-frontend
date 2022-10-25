import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className='section__search-form'>
      <form className='search-form__form'>
        <div className='search-form__input-container'>
          <input className='search-form__input' autoFocus></input>
          <button type="submit" className="button search-form__button"></button>
        </div>
      </form>
      <FilterCheckbox></FilterCheckbox>
      <div className='search-form__line'></div>
    </section>
  )
}

export default SearchForm;
