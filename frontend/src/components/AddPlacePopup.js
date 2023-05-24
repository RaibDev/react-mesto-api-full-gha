import React, { useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCards }) {
  const [title, setTitle] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddCards({
      name: title,
      link: link
    })

  }
  return(
    <PopupWithForm name="cards" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit}>
      <input id="place-title-input" className="popup__input popup__input_type_title popup__input_type_place-form" value={title || ''} onChange={(e) => setTitle(e.target.value)} placeholder="Название" name="name" type="text" required />
      <span className="popup__error place-title-input-error"></span>
      <input id="place-link-input" className="popup__input popup__input_type_link popup__input_type_place-form" value={link || ''} onChange={(e) => setLink(e.target.value)} placeholder="Ссылка на картинку" name="link" type="url" required />
      <span className="popup__error place-link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;