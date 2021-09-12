import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCalback) {
    super(popupSelector);
    this._submitCalback = submitCalback;
    this._formElement = this.popupElement.querySelector('.form');
    this._inputs = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._button = this._formElement.querySelector('.form__button');
  }

  open() {
    super.open();
    if (this._button.textContent === 'Сохранение...') {
      this._button.textContent = 'Сохранить';
    }
    else if (this._button.textContent === 'Создание...') {
      this._button.textContent = 'Создать';
    }
    else if (this._button.textContent === 'Удаление...') {
      this._button.textContent = 'Да';
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    const result = {};

    this._inputs.forEach(input => {
      result[input.name] = input.value;
    });

    return result;
  }

  renderLoading() {
    if (this._button.textContent === 'Сохранить') {
      this._button.textContent = 'Сохранение...';
    } else if (this._button.textContent === 'Создать') {
      this._button.textContent = 'Создание...';
    } else if (this._button.textContent === 'Да') {
      this._button.textContent = 'Удаление...';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const cardData = this._getInputValues();
      this._submitCalback(cardData);
    });
  }
}