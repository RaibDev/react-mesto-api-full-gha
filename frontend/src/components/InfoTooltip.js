import Popup from "./Popup.js"

import ok from '../images/icon/Ok.svg'
import err from '../images/icon/Err.svg'
import '../App.css';


export default function InfoTooltip({ responce, ...props }) {
  return (
    <Popup {...props}>
      <div className="popup-tooltip">
        <img className="popup-tooltip__icon" src={!responce.status ? err : ok} alt='Иконка результата авторизации' />
        <p className="popup-tooltip__text">{responce.text}</p>
      </div>

    </Popup>
  )
}