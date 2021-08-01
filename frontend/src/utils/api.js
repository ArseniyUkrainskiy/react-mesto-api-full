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
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }
  //Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse)
  }
  //Редактирование профиля
  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse)
  }
  //Добавление новой карточки
  createNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse)
  }
  //Удаление карточки
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  //Постановка и снятие лайка
  //Поставить лайк
  likeCard(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse)
  }
  //Снять лайк
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }
  //Обновление аватара пользователя
  updateAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
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
    /* Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZmQxZmU3NzE4NGNiMTlmODRmZjMzMiIsImlhdCI6MTYyNzcxMTEyMCwiZXhwIjoxNjI4MzE1OTIwfQ.HU1ozOeuTnY2xaLWz6QXYf1eh_wZ_UhZzIkGVUiAuKE', */
    'Content-Type': 'application/json',
  },
})

export default api
