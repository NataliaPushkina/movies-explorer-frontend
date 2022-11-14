import './FilterCheckbox.css';

function FilterCheckbox({ checkboxChecked, onCheckChange }) {
  return (
    <div className='filter-checkbox__group'>
      <input type='checkbox'
        id='checkbox'
        name='checkbox'
        className='filter-checkbox'
        checked={checkboxChecked}
        onChange={onCheckChange}
      >
      </input>
      <label htmlFor='checkbox' className='filter-checkbox__label'></label>

      <p className='filter-checkbox__name'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;
