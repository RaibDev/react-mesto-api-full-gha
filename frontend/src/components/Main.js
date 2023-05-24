import { useContext } from "react";

import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main aria-label="Приложение Место">
      <section className="profile container">
        <div className="profile__avatar" onClick={onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})` }} ></div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
            <button onClick={onEditProfile} className="edit-button" type="button" aria-label="кнопка редактирования профиля"></button>
          </div>
          <button onClick={onAddPlace} className="add-button" type="button" aria-label="кнопка добавления новой карточки места"></button>
        </section>
        <section aria-label="Обязательные к посещению места">
          <ul className="gallery container">
            {cards.map(card => (
              <Card key={card._id} card={card} onCardClick={onCardClick}  onCardLike={onCardLike} onCardDelete={onCardDelete} /> 
            ))}
          </ul>
      </section>
    </main>
  )
}

export default Main;