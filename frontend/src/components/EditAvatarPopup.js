import React, { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){
  const inputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    })
  }
  return(
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input ref={inputRef} id="avatar-link-input" className="popup__input" placeholder="Введите ссылку" name="avatar" type="url" required />
      <span className="popup__error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup