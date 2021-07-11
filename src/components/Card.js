import { Api } from "./Api.js";
import { PopupWithForm } from '../components/PopupWithForm.js';

import { option } from "../utils/constants.js";

const api = new Api(option);
const formDeleteCard = new PopupWithForm('#overlay-delete-card', () => {
  formDeleteCard.open();
})
formDeleteCard.setEventListeners()


export class Card {
  constructor(data, templateSelector, imageCalback,) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data.owner._id;
    this._idCard = data._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._imageCalback = imageCalback;

    this._overlayImage = document.querySelector('#overlay-image');
    this._overlayImageName = this._overlayImage.querySelector('.overlay__name');
    this._overlayImageItem = this._overlayImage.querySelector('.overlay__image');

    this._overlayDeleteCard = document.querySelector('#overlay-delete-card');
    this._buttonDeleteCard = this._overlayDeleteCard.querySelector('.form__button');
  }

  _getTemplate() {
    this._cardNewTemlate = document.querySelector(this._templateSelector).content.querySelector('.card');
    this._cardElement = this._cardNewTemlate.cloneNode(true);
  }

  _createElement() {
    this._getTemplate()

    this._buttonDelete = this._cardElement.querySelector('.card__delete');
    if (this._id !== '0a6aa271ec5cb1d94b5f42da') {
      this._buttonDelete.classList.add('card__delete_hidden');
    }

    this._buttonLike = this._cardElement.querySelector('.card__like');
    this._cardImage = this._cardElement.querySelector('.card__image');
    this._counterLikes = this._cardElement.querySelector('.card__like-count');

    this._cardElement.querySelector('.card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._likes.length > 0) {
      this._counterLikes.textContent = this._likes.length;
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick());
    this._buttonDelete.addEventListener('click', () => this._handleRemoveClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick());
  }

  _handleLikeClick() {
    const arrayfromLikes = Array.from(this._likes);
    if (arrayfromLikes.forEach(element => {
      element._id === '0a6aa271ec5cb1d94b5f42da';
    })) {
      api.dislikeCard(this._idCard);
      this._buttonLike.classList.remove('card__like_aktive');
      this._counterLikes.textContent = this._likes.length - 1;
    } else {
      api.likeCard(this._idCard);
      this._buttonLike.classList.add('card__like_aktive');
      this._counterLikes.textContent = this._likes.length + 1;
    }
  };

  _handleRemoveClick() {
    //evt.preventDefault();
    this._overlayDeleteCard.classList.add('overlay_opened');
    this._buttonDeleteCard.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._cardElement.remove();
      //this._handleRemoveClickCard();
      api.delCard(this._idCard);
      formDeleteCard.close();
    });
  };

  _handleCardClick() {
    this._imageCalback(this._name, this._link);
  };

  renderCard() {
    this._createElement();
    this._setEventListeners();
    return this._cardElement;
  };
}