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
    if (this._button.textContent.substr(-3,3) === '...'){
      this._button.textContent = this._button.textContent.slice(0, -3);
    }
    
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues() {
    const result = {};

    this._inputs.forEach( input => {
      result[input.name] = input.value;
    });

    return result;
  }

  renderLoading() {
    this._button.textContent = this._button.textContent + '...';
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