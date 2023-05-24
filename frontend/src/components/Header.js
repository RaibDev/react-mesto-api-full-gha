import { Link, Routes, Route } from 'react-router-dom'

import '../App.css';
import logo from '../images/icon/white-logo.svg';

export default function Header({ email, onLogOut }) {
  return (
    <header className="header container">
      <img src={logo} alt="Белый логотип" className="logo" />
      <nav className='header-box'>
        {email && <p className='header-box__text'>{email}</p>}
        {email && <Link to='/sign-in' className={`header-box__link ${email && 'header-box__link_logged'}`} onClick={onLogOut}>Выйти</Link>}
      </nav>
      <Routes>  
        <Route path='/sign-in' element={<Link to='/sign-up' className='header-box__link'>Регистрация</Link>}/>
        <Route path='/sign-up' element={<Link to='/sign-in' className='header-box__link'>Войти</Link>}/>
      </Routes>  
    </header>
  )
}