import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._overlayImage = document.querySelector(popupSelector);
    this._overlayImageName = this._overlayImage.querySelector('.overlay__name');
    this._overlayImageItem = this._overlayImage.querySelector('.overlay__image');
  }


  open(name , link) {
    super.open();
    this._overlayImageName.textContent = name;
    this._overlayImageItem.src = link;
    this._overlayImageItem.alt = name;
  }
}