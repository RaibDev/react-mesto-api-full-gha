import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwnCard = card.owner._id === currentUser._id;
  const isLikedCard = card.likes.some(item => item._id === currentUser._id)
  const cardLikeButtonClassName = (`place__button ${isLikedCard && 'place__button_active'}`);

  function handleClick() {
    onCardClick(card);
  }
  return(
    <li className="place container">
      <article>
        <img src={card.link} alt={card.name} className="place__image" onClick={handleClick} />
        <div className="place__caption">
          <h2 className="place__text">{card.name}</h2>
          <div className="place__group">
            <button type="button" className={cardLikeButtonClassName} onClick={() => onCardLike(card)} aria-label="кнопка лайка"></button>
            <p className="place__like-number">{card.likes.length}</p>
          </div>
        </div>
        {isOwnCard && <button className="delete-card-btn delete-card-btn_active" onClick={() => onCardDelete(card)} type="button" aria-label="кнопка удаления карточки"></button>}
      </article>
    </li>
  )
}

export default Card;