import React from 'react'
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup(props) {
  const [btnText, setBtnText] = React.useState('Удалить') //первый раз при рендере страницы
  React.useEffect(() => {
    setBtnText('Удалить')
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    setBtnText('Удаление...')
    props.onCardDelete()
  }
  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      title="Вы уверены ?"
      btnText={btnText}
      name="remove-card"></PopupWithForm>
  )
}

export default ConfirmationPopup
