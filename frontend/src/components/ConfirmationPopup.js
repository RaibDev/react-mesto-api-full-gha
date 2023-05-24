import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ onClose }) {
  return(
    <PopupWithForm name="delete" title="Вы уверены?" onClose={onClose} submitText="Да" />
  )
}

export default ConfirmationPopup;