import { useState } from "react";

function Login({ onLogin, onUpdate }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const {name, value} = e.target;
    
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValue)
    setFormValue({
      email: '',
      password: ''
    });
  }

  return (
    <section className="auth" aria-label="Вход">
      <h3 className="auth__title">Вход</h3>
      <form action="#" className="auth__form" onSubmit={handleSubmit}>
        <input type="email" className="auth__input" onChange={handleChange} value={formValue.email} name='email' placeholder="Email"/>
        <span className="auth__error"></span>
        <input type="password" className="auth__input" onChange={handleChange} value={formValue.password} name='password' placeholder="Пароль"/>
        <span className="auth__error"></span>
        <button type="submit" className="auth__submit">Войти</button>
      </form>
    </section>
  )
}

export default Login;