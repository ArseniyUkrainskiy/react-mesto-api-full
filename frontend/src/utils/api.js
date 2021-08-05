export class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //Загрузка информации о пользователе с сервера
  getUser(JWT) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse)
  }
  //Загрузка карточек с сервера
  getInitialCards(JWT) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse)
  }
  //Редактирование профиля
  editUserInfo(data,JWT) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse)
  }
  //Добавление новой карточки
  createNewCard(data,JWT) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name, 
        link: data.link
      }),
    }).then(this._checkResponse)
  }
  //Удаление карточки
  removeCard(cardId,JWT) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse)
  }

  //Постановка и снятие лайка
  //Поставить лайк
  likeCard(cardId,JWT) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse)
  }
  //Снять лайк
  deleteLike(cardId,JWT) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse)
  }
  //Обновление аватара пользователя
  updateAvatar(newAvatar,JWT) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //avatar: newAvatar['avatar-link'],
        avatar: newAvatar,
      }),
    }).then(this._checkResponse)
  }
}
const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`
const api = new Api({
  url: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
})

export default api
