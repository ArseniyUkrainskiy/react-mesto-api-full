import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
    e.target.reset()
  }

  function handleClear() {
    avatarRef.current.value = ''
    props.onClose()
  }
//Отлично, осталось совсем чуть-чуть!
  return (
    <PopupWithForm
      onClose={handleClear}
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      btnText='Сохранить'
      noValidate={false}>
      <input
        type="url"
        name="avatar-link"
        required
        className="popup__field popup__field_input_url"
        placeholder="Ссылка на аватар"
        id="avatar-link"
        ref={avatarRef}
      />
      {/* <span className="popup__error" id="avatar-link-error"></span> */}
    </PopupWithForm>
  )
}
export default EditAvatarPopup
