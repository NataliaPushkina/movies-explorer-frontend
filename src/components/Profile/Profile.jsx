import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ onLogout, onUpdateInfo }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditButtonActive, setIsEditButtonActive] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const inputRef = useRef(null);

  const onEditBtnClick = () => {
    inputRef.current.focus();
    setIsEditButtonActive(!isEditButtonActive);
  };

  const handleChangeName = (e) => {
    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setNameError("Допустимое количество символов - от 2 до 30");
      if (!e.target.value) {
        setNameError("Поле name обязательное");
      }
    } else {
      setNameError("");
    }
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный email");
      if (!e.target.value) {
        setEmailError("Поле email обязательное");
      }
      if (e.target.value === currentUser.email) {
        setNameError("Введенное значение совпадает с текущим почтовым адресом");
      }
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === currentUser.name && email === currentUser.email) {
      setNameError("Введенное значение не может совпадать с текущим");
    } else {
      onUpdateInfo(name, email);
    }
  };

  useEffect(() => {
    if (nameError || emailError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [nameError, emailError]);

  return (
    <section className="profile">
      <div className="profile-container">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile_input-container">
            <label className="profile__label">Имя</label>
            <input
              required
              autoComplete="name"
              type="text"
              name="name"
              id="name"
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
                disabled={!isValid}
                className={`profile_save-btn ${!isValid ? "" : "profile_save-btn_active"
                  }`}
              >
                Сохранить
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default Profile;
