export class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  //получение массива загруженных карточек на сервере
  listCard() {
    return fetch(`${this._url}${'/cards'}`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //получение информации о пользователе
  infoUser() {
    return fetch(`${this._url}${'/users/me'}`, {
      headers: this._headers,
      method: 'GET'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //редактирование информации о профиле
  infoUserPatch(name, about) {
    fetch(`${this._url}${'/users/me'}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //удаление карточки
  delCard(cardId) {
    fetch(`${this._url}${'/cards/'}${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //редактирование аватара
  editAvatar(linkAvatar) {
    fetch(`${this._url}${'/users/me/avatar'}`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: linkAvatar
      })
    })
  }

  //постановка лайка карточки
  likeCard(cardId) {
    fetch(`${this._url}${'/cards/likes/'}${cardId}`, {
      headers: this._headers,
      method: 'PUT'
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //постановка лайка карточки
  dislikeCard(cardId) {
    fetch(`${this._url}${'/cards/likes/'}${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  
}