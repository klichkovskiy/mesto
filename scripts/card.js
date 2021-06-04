import openPopup from './index.js'
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;

    this._overlayImage = document.querySelector('#overlay-image');
    this._overlayImageName = this._overlayImage.querySelector('.overlay__name');
    this._overlayImageItem = this._overlayImage.querySelector('.overlay__image');
  }

  _getTemplate() {
    this._cardNewTemlate = document.querySelector(this._templateSelector).content.querySelector('.card');
    this._cardElement = this._cardNewTemlate.cloneNode(true);
  }

  _createElement() {
    this._getTemplate()

    this._buttonDelete = this._cardElement.querySelector('.card__delete');
    this._buttonLike = this._cardElement.querySelector('.card__like');
    this._cardImage = this._cardElement.querySelector('.card__image');

    this._cardElement.querySelector('.card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleRemoveClick());
    this._cardImage.addEventListener('click', () => this._handleOpenImage());
  }

  _handleLikeClick() {
    this._buttonLike.classList.toggle('card__like_aktive');
  };
  
  _handleRemoveClick() {
    this._cardElement.remove();
  };
  
  _handleOpenImage() {
    openPopup(this._overlayImage);
    this._overlayImageName.textContent = this._name;
    this._overlayImageItem.src = this._link;
    this._overlayImageItem.alt = this._name;
  };
  
  renderCard() {
    this._createElement();
    this._setEventListeners();
    return this._cardElement;
  };
}