import React, { useContext, useState, useEffect } from "react";


import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onChange }) {
  const { currentUser } = useContext(CurrentUserContext);
  
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  // const [value, setValue] = useState({});

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // function handleChange(evt) {
  //   setValue(evt.target.value)
  // }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    })
  }


  return(
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} submitText="Сохранить" onSubmit={handleSubmit}>
      <input id="profile-name-input" className="popup__input popup__input_type_name" placeholder="Имя" onChange={(e) => setName(e.target.value)} value={name  || ''} name={name} type="text" required />
      <span className="popup__error profile-name-input-error"></span>
      <input id="profile-job-input" className="popup__input popup__input_type_job" placeholder="О себе" onChange={(e) => setDescription(e.target.value)} value={description || ''} name={description} type="text" required />
      <span className="popup__error profile-job-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;