import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Validate.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';
import { editButton, addButton, fieldNameEditProfile, fieldCaptionEditProfile, cardSelector, initialCards, config } from '../utils/constants.js';

const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, cardSelector, (name, link) => {
      openImagePopup.open(name, link);
    } );
    return card.renderCard()
  }
}, '.cards');
cardSection.rendererAll();

const addCardPopup = new PopupWithForm('#overlay-card', (cardData) => {
  cardSection.addItem(cardData);
  addCardPopup.close();
});
addCardPopup.setEventListeners()

const userInfoData = new UserInfo({ 
  nameSelector: '.profile__name', 
  captionSelector: '.profile__caption'
});

const editProfilePopup = new PopupWithForm('#overlay-profile', (inpitValues) => {
  {inpitValues.name = fieldNameEditProfile.value,
  inpitValues.caption = fieldCaptionEditProfile.value}
  userInfoData.setUserInfo(inpitValues)
  editProfilePopup.close();
});
editProfilePopup.setEventListeners()

const openImagePopup = new PopupWithImage('#overlay-image');
openImagePopup.setEventListeners()

const formEditProfileValidator = new FormValidator(
  config,
  document.querySelector('#form-profile')
);
formEditProfileValidator.enableValidation();

const formCreationCardValidator = new FormValidator(
  config,
  document.querySelector('#form-card')
);
formCreationCardValidator.enableValidation();

//функция открытия формы изменения имени и рода деятельности
function openOverlayProfileClick() {
  formEditProfileValidator.resetValidationform();
  const userData = userInfoData.getUserInfo();
  fieldNameEditProfile.value = userData.name;
  fieldCaptionEditProfile.value = userData.caption;
  editProfilePopup.open();
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  addCardPopup.open();
  formCreationCardValidator.resetValidationform();
};
addButton.addEventListener('click', openOverlayCardClick);