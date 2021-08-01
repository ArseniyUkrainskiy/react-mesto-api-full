import React from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [btnText, setBtnText] = React.useState('Сохранить')//первый раз при рендере страницы
  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
    setBtnText('Сохранить')//при повторном открытии после сохранения
  }, [currentUser, props.isOpen])

  //
  const [nameDirty, setNameDirty] = React.useState(false) //состояние посещения инпута
  const [descriptionDirty, setDescriptionDirty] = React.useState(false) //состояние посещения инпута
  const [nameError, setNameError] = React.useState('') //состояние по ошибке
  const [descriptionError, setDescriptionError] = React.useState('') //состояние по ошибке
  const [formState, setFormState] = React.useState(false)
  //
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.

  React.useEffect(() => {
    nameError || descriptionError ? setFormState(true) : setFormState(false)
  }, [nameError, descriptionError])

  function handleChangeName(e) {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 40) {
      setNameError('Имя должно быть от 2 до 40 символов')
      if (!e.target.value) {
        setNameError('Поле является обязательным')
      }
    } else {
      setNameError('')
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 200) {
      setDescriptionError('О себе должно быть от 2 до 200 символов')
      if (!e.target.value) {
        setDescriptionError('Поле является обязательным')
      }
    } else {
      setDescriptionError('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setBtnText('Сохранение...')//при отправке данных на сервер
    props.onUpdateUser({
      name,
      about: description,
    })
    e.target.reset()
  }

  function handleClear() {
    setName(currentUser.name)
    setDescription(currentUser.about)
    setNameError('')
    setDescriptionError('')
    setBtnText('Сохранить')//при закрытии на крестик
    props.onClose()
  }

  //
  const blurHandler = (e) => {
    if (!e.target.value)
      switch (e.target.name) {
        case 'name':
          setNameDirty(true)
          break
        case 'description':
          setDescriptionDirty(true)
          break
        default:
          setNameDirty(false)
          setDescriptionDirty(false)
      }
  }

  return (
    <PopupWithForm
      onClose={handleClear}
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      btnText={btnText}
      btnState={formState}
      noValidate={true}>
      <input
        type="text"
        name="name"
        className="popup__field popup__field_input_name"
        placeholder="Имя"
        id="edit"
        onChange={handleChangeName}
        value={name}
        onBlur={(e) => blurHandler(e)}
      />
      {(nameDirty || nameError) && <span className="popup__error">{nameError}</span>}

      <input
        type="text"
        name="description"
        className="popup__field popup__field_input_characteristic"
        placeholder="О себе"
        id="about"
        onChange={handleChangeDescription}
        value={description}
        onBlur={(e) => blurHandler(e)}
      />
      {(descriptionDirty || descriptionError) && (
        <span className="popup__error">{descriptionError}</span>
      )}
    </PopupWithForm>
  )
}
export default EditProfilePopup
