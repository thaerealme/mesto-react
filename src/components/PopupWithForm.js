function PopupWithForm (props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
    <div className="popup__container">
      <button type="button" className="popup__close-button opacity" onClick={props.onClose}></button>
      <h3 className="popup__title">{props.title}</h3>
      <form className="popup__form" name={`popup_${props.name}-form`} noValidate>
        {props.children}
        <button type="submit" className="popup__submit">{props.buttonText}</button>
      </form>
    </div>
  </div>
  )
}

export default PopupWithForm;
