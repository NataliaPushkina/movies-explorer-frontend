import "./Login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../images/logo.svg";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

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
    onLogin(email, password);
  };

  useEffect(() => {
    if (emailError || passwordError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [emailError, passwordError])

  return (
    <div className="login">
      <div className="login-container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="link logo-icon" />
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <fieldset className="form-inputs">
            <label className="input__label">E-mail</label>
            <input
              required
              autoComplete="email"
              type="email"
              name="email"
              id="email"
              className="login__input login__input_email"
              value={email || ''}
              onChange={(e) => handleChangeEmail(e)}
              autoFocus
            />
            <span className="input__error email-error">{emailError}</span>
            <label className="input__label">Пароль</label>
            <input
              required
              autoComplete="current-password"
              type="password"
              name="password"
              id="password"
              className="login__input login__input_password"
              value={password || ''}
              onChange={(e) => handleChangePassword(e)}
            />
            <span className="input__error password-error">{passwordError}</span>
          </fieldset>


          <button type="submit"
          disabled={!isValid}
          className={`${!isValid ? 'form-button' : 'form-button_active'}`}>
            Войти
          </button>


          {/* <button type="submit" className="form__button"> */}

          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__signup-link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
