export class Card {
  constructor(data, templateSelector, userId, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
  }

  _getTemplate() {
    this._cardNewTemlate = document.querySelector(this._templateSelector).content.querySelector('.card');
    this._cardElement = this._cardNewTemlate.cloneNode(true);
  }

  _createElement() {
    this._getTemplate()

    this._buttonLike = this._cardElement.querySelector('.card__like');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._counterLikes = this._cardElement.querySelector('.card__like-count');

    this._cardElement.querySelector('.card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._buttonDelete = this._cardElement.querySelector('.card__delete');
    if (this._id !== this._userId) {
      this._buttonDelete.classList.add('card__delete_hidden');
    }

    this.renderLikes(this._data)
  }

  renderLikes(data) {
    this.counterLikes(data);
    if (data.likes.find(item => { return item._id === this._userId })) {
      this._addLikes()
    } else {
      this._removeLikes()
    }
  }

  counterLikes(data) {
    if (data.likes.length > 0) {
      this._counterLikes.textContent = data.likes.length;
    }
  }

  _addLikes() {
    this._buttonLike.classList.add('card__like_aktive');
  }

  _removeLikes() {
    this._buttonLike.classList.remove('card__like_aktive');
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._cardElement));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  renderCard() {
    this._createElement();
    this._setEventListeners();
    return this._cardElement;
  };
}