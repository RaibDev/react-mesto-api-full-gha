function PopupWithForm({ name, title, submitText, isOpen, onClose, children, onSubmit }) {
  return(
    <div className={`popup popup-${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className={`popup__box popup__box_type_${name}`}>
        <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
        <form action="#" className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__button">{submitText || 'Создать'}</button>
        </form>
        <button className="close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;