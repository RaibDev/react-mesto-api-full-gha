import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(formValue);
  }

  return (
    <section className="auth" aria-label="Регистрация">
      <h3 className="auth__title">Регистрация</h3>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <input type="email" className="auth__input" onChange={handleChange} value={formValue.email} name='email' placeholder="Email"/>
        <span className="auth__error"></span>
        <input type="password" className="auth__input" onChange={handleChange} value={formValue.password} name='password' placeholder="Пароль"/>
        <span className="auth__error"></span>
        <button type="submit" className="auth__submit">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
    </section>
  )
}

export default Register;