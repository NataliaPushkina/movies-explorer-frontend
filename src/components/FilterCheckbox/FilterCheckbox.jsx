import { useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isChecked, setIsCheked] = useState(false);

  return (
    <div className='filter-checkbox__group'>
      <input type='checkbox'
        id='checkbox'
        name='checkbox'
        className='filter-checkbox'
        checked={isChecked}
        onChange={() => {setIsCheked(!isChecked)}}
      >
      </input>
      <label htmlFor='checkbox' className='filter-checkbox__label'></label>

      <p className='filter-checkbox__name'>Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;
