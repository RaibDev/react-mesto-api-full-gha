import React, { useState, useEffect } from 'react';  
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
                                                    
import api  from '../utils/api.js';
import auth from '../utils/auth.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import NotFound from './NotFound.js';

import '../App.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [responce, setResponce] = useState({
    status: false,
    text: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, card]) => {
      setCurrentUser(user);
      setCards(card);
    })
    .catch((err) => { console.log(err) })
  }, [loggedIn])

  useEffect(() => {
    checkToken()
  },[])

  function handleRegister(formValue) {
    if(!formValue.email || !formValue.password) {
      console.log('Не заполнено одно из полей');
      return
    }
    auth.registrateUser(formValue.password, formValue.email)
      .then((res) => {
        setIsTooltipPopupOpen(value => !value);
        if(res.data) {
        setResponce({
          status: true,
          text: 'Вы успешно зарегистрировались!'
        });
        }
        navigate('/sign-in', { replace: true });

      })
      .catch(err => {
        setResponce({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
        setIsTooltipPopupOpen(value => !value);
        console.log(err);
      })
  }
  
  function handleLogin(formValue) {
    if(!formValue.email || !formValue.password) {
      console.log('Не заполнено одно из полей');
      return
    }

    auth.autorizeUser(formValue.password, formValue.email)
      .then((res) => {
        if(res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(formValue.email)
          navigate('/', {replace: true})
        }
      })
      .catch(err => {
        setResponce({
          status: false,
          text: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
        setIsTooltipPopupOpen(value => !value);
        console.log(err);
      })
  }

  function handleUpdateEmail(value) {
    setEmail(value);
  }

  function checkToken() {
    const token = localStorage.getItem('jwt')
      if(token) {
      auth.checkToken(token)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', {replace: true})
        }
      })
      .catch(err => console.log(err))
    }
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('')
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleUpdateUser(userData) {
    api.changeUserInfo(userData)
    .then(() => {
      setCurrentUser({ ...currentUser, name: userData.name, about: userData.about });
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatarData) {
    api.changeUserAvatar(avatarData)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeCardLikeStatus(card._id, !isLiked)
    .then(newCard => {
      setCards((state) => state.map(c => c._id === card._id ? newCard :c ))
    })
    .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(cards.filter(c => c._id !== card._id))
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCardData) {
    api.addNewCard(newCardData)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => console.log(err))   
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsTooltipPopupOpen(value => !value)
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }} >
      <div className='root'>
        <Header onLogOut={handleLogOut} email={email} />
        <Routes>
          <Route path='/' element={<ProtectedRouteElement element={Main} loggedIn={loggedIn} onAddPlace={handleAddPlaceClick} onEditProfile={handleEditProfileClick} onUpdateAvatar={handleAddPlaceSubmit} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards} />} />
          <Route path='/sign-up' element={<Register onRegister={handleRegister}/>} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} onUpdate={handleUpdateEmail} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCards={handleAddPlaceSubmit} cards={cards} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ConfirmationPopup onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip onClose={closeAllPopups} isOpen={isTooltipPopupOpen} responce={responce} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
