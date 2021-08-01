//общий компонент попапов
import React from 'react'

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  btnState,
  btnText,
  noValidate,
  showBtn = true,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className={`popup__container ${!showBtn && 'popup__container-status'}`}>
        <button type="button" className="popup__close" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate={noValidate} onSubmit={onSubmit}>
          <fieldset className="popup__fieldset">{children}</fieldset>
          {showBtn && (
            <button
              disabled={btnState}
              type="submit"
              className={`popup__submit ${btnState && 'popup__submit_disabled'}`}>
              {btnText}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
