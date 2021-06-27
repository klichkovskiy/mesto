export class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsidePopupClose = this._handleOutsidePopupClose.bind(this);
    this._popupClose = this.popupElement.querySelector('.overlay__close');
  }

  open() {
    this.popupElement.classList.add('overlay_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this.popupElement.classList.remove('overlay_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleOutsidePopupClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close()
    }
  };

  setEventListeners() {
    this._popupClose.addEventListener('click', () => this.close());
    this.popupElement.addEventListener('mousedown', this._handleOutsidePopupClose);
  }
}