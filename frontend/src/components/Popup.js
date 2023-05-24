function Popup({ onClose, isOpen, children }) {

  return(
    <div className={`popup  ${isOpen ? 'popup_active' : ''}`}>
      <div className={`popup__box`}>
        {children}
        <button className="close-button" onClick={onClose}></button>
      </div>
  </div>
  )
}

export default Popup;