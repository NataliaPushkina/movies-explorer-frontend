import "./Register.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../images/logo.svg";

function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChangeName = (e) => {
    setName(e.target.value);
    const re = /^[a-zа-яё\s]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('Поле может содержать только символы кириллицы, латиницы и пробел');
      if (!e.target.value) {
        setNameError('Поле name обязательное');
      }
    } else {
      setNameError('');
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      if (!e.target.value) {
        setEmailError('Поле email обязательное');
      }
    } else {
      setEmailError('');
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
      if (e.target.value.length < 6 || e.target.value.length > 20) {
        setPasswordError('Пароль должен содержать от 6 до 20 символов, нужно использовать хотя бы 1 цифру, символ и букву латинского алфавита');
        if (!e.target.value) {
          setPasswordError('Поле password обязательное');
      }
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, password);
  };

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [nameError, emailError, passwordError]);

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="link logo-icon" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" onSubmit={handleSubmit} noValidate>
          <fieldset className="form-inputs">
            <label className="input__label">Имя</label>
            <input
              required
              autoComplete="name"
              type="text"
              name="name"
              id="name"
              className="register__input register__input_name"
              onChange={(e) => handleChangeName(e)}
              value={name || ""}
              autoFocus
            />
            <span className="input__error name-error">{nameError}</span>
            <label className="input__label">E-mail</label>
            <input
              required
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              className="register__input register__input_email"
              onChange={(e) => handleChangeEmail(e)}
              value={email || ""}
            />
            <span className="input__error email-error">{emailError}</span>
            <label className="input__label">Пароль</label>
            <input
              required
              autoComplete="current-password"
              type="password"
              name="password"
              id="password"
              className="register__input register__input_password"
              onChange={(e) => handleChangePassword(e)}
              value={password || ""}
            />
            <span className="input__error password-error">{passwordError}</span>
          </fieldset>

          <button type="submit"
          disabled={!isValid}
          className={`${!isValid ? 'form-button' : 'form-button_active'}`}>
            Зарегистрироваться
          </button>
          <p className="register__text">
            {" "}
            Уже зарегистрированы?
            <Link to="/signin" className="register__login-link">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
