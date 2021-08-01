//компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации
import React from 'react'
import PopupWithForm from './PopupWithForm'
import done from '../blocks/popup/__infoTool-img/images/done.svg'
import errorElement from '../blocks/popup/__infoTool-img/images/registration-error.svg'

function InfoTooltip(props) {
  return (
    <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} showBtn={false}>
      <>
        <img
          className="popup__infoTool-img"
          src={props.isRegStatus ? done : errorElement}
          alt="статус авторизации"></img>
        <p className="popup__infoTool-message">
          {props.isRegStatus
            ? `Вы успешно${' '}зарегистрировались!`
            : `Что-то пошло не так!${' '}
Попробуйте ещё раз.`}
        </p>
      </>
    </PopupWithForm>
  )
}
export default InfoTooltip
