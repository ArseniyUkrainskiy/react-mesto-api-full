import React from 'react'
import PopupWithForm from './PopupWithForm'
//В этот раз вы можете использовать как управляемые компоненты, так и рефы для получения значений инпутов — на ваше усмотрение.
function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('')
  const [cardUrl, setCardUrl] = React.useState('')
  const [btnText, setBtnText] = React.useState('Сохранить') //первый раз при рендере страницы
  React.useEffect(() => {
    setCardName('')
    setCardUrl('')
    setBtnText('Сохранить') //при повторном открытии после сохранения
  }, [props.isOpen])

  function handleChangeCardName(e) {
    setCardName(e.target.value)
  }

  function handleChangeCardUrl(e) {
    setCardUrl(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setBtnText('Сохранение...') //при отправке данных на сервер
    props.onAddPlace({ name: cardName, link: cardUrl })
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      title="Новое место"
      name="cards"
      btnText={btnText}
      noValidate={false}>
      <input
        type="text"
        name="name"
        required
        className="popup__field popup__field_input_place"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        id="card-name"
        value={cardName}
        onChange={handleChangeCardName}
      />
      <span className="popup__error" id="card-name-error"></span>
      <input
        type="url"
        name="link"
        required
        className="popup__field popup__field_input_url"
        placeholder="Ссылка на картинку"
        id="link"
        value={cardUrl}
        onChange={handleChangeCardUrl}
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup
