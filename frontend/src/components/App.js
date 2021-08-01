import Header from './Header'
import Main from './Main'
import Footer from './Footer'

import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmationPopup from './ConfirmationPopup'
import InfoTooltip from './InfoTooltip'

import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

import api from '../utils/api'
import * as auth from '../utils/auth'

import CurrentUserContext from '../contexts/CurrentUserContext'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'

function App() {
  const [currentUser, setCurrentUser] = React.useState({ name: 'Имя...', about: 'О себе..' })
  const [cards, setCards] = React.useState([]) //Выполнено поднятие стейта
  React.useEffect(() => {
    //тут я получаю данные сразу по пользователю и карточке, так как нет смысла разделять их. Стейт-переменыне вынесены.
    Promise.all([api.getUser(), api.getInitialCards()])
      .then((data) => {
        const [userData, cardsData] = data
        setCurrentUser(userData)
        setCards(cardsData)
        //checkToken()
      })
      .catch((err) => {
        console.log(`Ошибка при получении данных: ${err}`)
      })
  }, [])

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isRemovePlacePopupOpen, setRemovePlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [remCardId, setRemCardId] = React.useState('')
  //хранение состояния авторизации (true/false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  //хранение email авторизированного пользователя
  const [userEmail, setUserEmail] = React.useState({ email: '' })
  //хранение состояния открытия попапа, успеха или ошибки регистрации
  const [isInfoPopupOpen, setInfoPopupOpen] = React.useState(false)
  const [isRegStatus, setRegStatus] = React.useState(null)
  const history = useHistory()

  const handleCardClick = ({ name, link }) => setSelectedCard({ name, link })

  function handleCardLike({ likes, cardId }) {
    const isLiked = likes.some((like) => like._id === currentUser._id)
    isLiked
      ? api
          .deleteLike(cardId)
          .then((newCard) => {
            setCards((state) => state.map((card) => (card._id === cardId ? newCard : card)))
          })
          .catch((err) => {
            console.log(`Ошибка при получении данных карточки во время лайка: ${err}`)
          })
      : api
          .likeCard(cardId)
          .then((newCard) => {
            setCards((state) => state.map((card) => (card._id === cardId ? newCard : card)))
          })
          .catch((err) => {
            console.log(`Ошибка при получении данных карточки во время лайка: ${err}`)
          })
  }
  function handleCardDelete() {
    api
      .removeCard(remCardId)
      .then(() => {
        //исключить удаленную карточку из массива
        setCards(cards.filter((card) => card._id !== remCardId))
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка при удалении карточки: ${err}`)
      })
  }
  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData) //После завершения запроса обновите стейт currentUser из полученных данных
        closeAllPopups() //закройте все модальные окна
      })
      .catch((err) => {
        console.log(`Ошибка при редактировании профиля: ${err}`)
      })
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .updateAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка при редактировании аватара: ${err}`)
      })
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .createNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении новой карточки: ${err}`)
      })
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleRemovePlaceClick({ cardId }) {
    setRemCardId(cardId)
    setRemovePlacePopupOpen(true)
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setRemovePlacePopupOpen(false)
    setSelectedCard(null)
    setInfoPopupOpen(false)
  }

  /*  function closeAllPopupsOverlay(e) {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      console.log(e);
      closeAllPopups()
    }
  } */

  const handleRegister = (password, email) => {
    auth
      .register({ password, email })
      .then((data) => {
        const JWT = data.data._id //вытащить токен
        JWT && localStorage.setItem('jwt', JWT) //если есть токен записать его
        setUserEmail({ email: data.data.email })
        setInfoPopupOpen(true)
        setRegStatus(true)
        setLoggedIn(true)
        history.push('/sign-in')
      })
      .catch((err) => {
        setInfoPopupOpen(true)
        setRegStatus(false)
        console.log(`Ошибка при регистрации нового пользователя.register: ${err}`)
      })
  }
  const handleLogin = ({ password, email }) => {
    auth
      .login({ password, email })
      .then((res) => {
        const JWT = res.token
        JWT && localStorage.setItem('jwt', JWT)
        setUserEmail({ email })
        setLoggedIn(true)
        history.push('/')
      })
      .catch((err) => {
        setInfoPopupOpen(true)
        setRegStatus(false)
        console.log(`Ошибка при авторизации пользователя.login: ${err}`)
      })
  }
  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    history.push('/sign-in')
  }

  const checkToken = React.useCallback(() => {
    const JWT = localStorage.getItem('jwt')
    JWT &&
      auth
        .checkToken(JWT)
        .then((data) => {
          setUserEmail({ email: data.data.email })
          setLoggedIn(true)
          history.push('/')
        })
        .catch((err) => {
          console.log(`Ошибка при проверке токена пользователя.checkToken: ${err}`)
        })
  }, [history])

  React.useEffect(() => {
    checkToken()
  }, [checkToken])
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Header userEmail={userEmail} onSignOut={handleLogOut} />

          <Switch>
            {/* для регистрации пользователя */}
            <Route exact path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            {/* для авторизации пользователя */}
            <Route exact path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onRemovePlace={handleRemovePlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
            />
            {/* Если неавторизованный пользователь приходит на сайт, он должен попадать на страницу входа, на какой бы роут он не пришёл. */}
            <Route path="/">{loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in" />}</Route>
          </Switch>

          <Footer />
          <InfoTooltip
            isOpen={isInfoPopupOpen}
            onClose={closeAllPopups}
            isRegStatus={isRegStatus}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ConfirmationPopup
            onClose={closeAllPopups}
            isOpen={isRemovePlacePopupOpen}
            onCardDelete={handleCardDelete}
          />
        </div>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
