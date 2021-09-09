export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение информации о пользователе
  getInfoUser() {
    return fetch(`${this._url}${'/users/me'}`, {
      headers: this._headers,
      method: 'GET'
    })
    .then(this._checkResponse)
  }

  //получение массива загруженных карточек на сервере
  getListCard() {
    return fetch(`${this._url}${'/cards'}`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(this._checkResponse)
  }

  //редактирование информации о профиле
  patchInfoUser(name, about) {
    return fetch(`${this._url}${'/users/me'}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse)
  }

  //добавление карточки
  addCard(name, link) {
    return fetch(`${this._url}${'/cards'}`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse)
  }

  //удаление карточки
  delCard(cardId) {
    return fetch(`${this._url}${'/cards/'}${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(this._checkResponse)
  }

  //редактирование аватара
  editAvatar(linkAvatar) {
    return fetch(`${this._url}${'/users/me/avatar'}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
    .then(this._checkResponse)
  }

  //постановка лайка карточки
  likeCard(cardId) {
    return fetch(`${this._url}${'/cards/likes/'}${cardId}`, {
      headers: this._headers,
      method: 'PUT'
    })
    .then(this._checkResponse)
  }

  //постановка лайка карточки
  dislikeCard(cardId) {
    return fetch(`${this._url}${'/cards/likes/'}${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(this._checkResponse)
  }

  
}