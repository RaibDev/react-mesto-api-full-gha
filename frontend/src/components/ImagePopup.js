export default function ImagePopup({ card, onClose }) {


  return(
    <div className={`popup popup-img ${Object.keys(card).length !== 0 ? "popup_active" : ''}`}>
      <div className="popup-img__box">
        <figure className="popup-img__figure">
          <img src={card.link} alt={`${card.name}.`} className="popup-img__item" />
          <figcaption className="popup-img__title">{card.name}</figcaption>
        </figure>
        <button className="close-button close-image-btn" onClick={onClose} type="button"></button>
      </div>
    </div>
  )
}