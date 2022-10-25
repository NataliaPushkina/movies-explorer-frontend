import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ userName, userEmail, onLogout, onUpdateInfo }) {
  const [isEditButtonActive, setIsEditButtonActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const inputRef = useRef(null);


  const onEditBtnClick = () => {
    inputRef.current.focus();
    setIsEditButtonActive(!isEditButtonActive)
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError("Допустимое количество символов - от 2 до 30");
      if (!e.target.value) {
        setNameError("Поле name обязательное");
      }
    } else {
      setNameError("");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
      if (!e.target.value) {
        setEmailError("Поле email обязательное");
      }
    } else {
      setEmailError("");
    }
  };

  const checkValidity = () => {
    if (nameError || emailError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateInfo(name, email);
  };

  useEffect(() => {
    checkValidity();
  }, [nameError, emailError]);

  return (
    <div className="profile">
      <div className="profile-container">
        <h2 className="profile__title">Привет, {userName}</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile_input-container">
            <label className="profile__label">Имя</label>
            <input
              required
              autoComplete="name"
              type="text"
              name="name"
              id="name"
              placeholder={userName}
              className="profile__input profile__input_name"
              onChange={(e) => handleChangeName(e)}
              value={name || ""}
              ref={inputRef}
            />
          </fieldset>
          <fieldset className="profile_input-container">
            <label className="profile__label">E-mail</label>
            <input
              required
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              placeholder={userEmail}
              className="profile__input profile__input_email"
              onChange={(e) => handleChangeEmail(e)}
              value={email || ""}
            />
          </fieldset>

          {!isEditButtonActive ? (
            <>
              <button
                type="button"
                className="button form__button_profile"
                onClick={() => onEditBtnClick()}
              >
                Редактировать
              </button>
              <button
                type="button"
                className="button profile__button-signin-link"
                onClick={onLogout}
              >
                <Link to="/signin" className="profile__signin-link">
                  Выйти из аккаунта
                </Link>
              </button>
            </>
          ) : (
            <>
              <div className="profile__error">
                <p className="profile__error-text">{nameError}</p>
                <p className="profile__error-text">{emailError}</p>
              </div>
              <button
                type="submit"
                // className="button profile_save-btn profile_save-btn_active"
                disabled={!isValid}
                className={`profile_save-btn ${!isValid ? '' : 'profile_save-btn_active'}`}
              >
                Сохранить
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Profile;
