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

    this.renderLikes123(this._data);


  }

  renderLikes() {
    this.counterLikes();
    if (this._likes.find(item => { return item._id === this._userId })) {
      this.addLikes()
    } else {
      this.removeLikes()
    }
  }


  renderLikes123(data) {
    this.counterLikes123(data);
    if (data.likes.find(item => { return item._id === this._userId })) {
      this.addLikes123()
    } else {
      this.removeLikes123()
    }
  }

  counterLikes123(data) {
    if (data.likes.length > 0) {
      this._counterLikes.textContent = data.likes.length;
    }
  }

  addLikes123() {
    this._buttonLike.classList.add('card__like_aktive');
  }

  removeLikes123() {
    this._buttonLike.classList.remove('card__like_aktive');
  }




  counterLikes() {
    if (this._likes.length > 0) {
      this._counterLikes.textContent = this._likes.length;
    }
  }

  addLikes() {
    this._buttonLike.classList.add('card__like_aktive');
  }

  removeLikes() {
    this._buttonLike.classList.remove('card__like_aktive');
  }


  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._cardElement));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }

  //_handleLikeClick() {
  //  const arrayfromLikes = Array.from(this._likes);
  //  if (arrayfromLikes.forEach(element => {
  //    element._id === !this._userId;
  //  })) {
  //    api.dislikeCard(this._idCard)
  //      .then(a => {
  //        console.log(a);
  //        this._buttonLike.classList.remove('card__like_aktive');
  //        this._counterLikes.textContent = this._likes.length;
  //      })
  //  } else {
  //    api.likeCard(this._idCard)
  //      .then(a => {
  //        console.log(a);
  //        this._buttonLike.classList.add('card__like_aktive');
  //        this._counterLikes.textContent = this._likes.length;
  //      })
  //  }
  //};

  //_handleRemoveClick() {
  //  //evt.preventDefault();
  //  this._overlayDeleteCard.classList.add('overlay_opened');
  //  this._buttonDeleteCard.addEventListener('click', (evt) => {
  //    evt.preventDefault();
  //    this._cardElement.remove();
  //    this._handleRemoveClickCard();
  //    api.delCard(this._idCard);
  //    formDeleteCard.close();
  //  });
  //};

  renderCard() {
    this._createElement();
    this._setEventListeners();
    return this._cardElement;
  };
}