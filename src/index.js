import { Card } from './Card.js';
import { FormValidator } from './Validate.js';
import { Section } from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import './pages/index.css';


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const overlayProfileOpen = document.querySelector('#overlay-profile');

const formEditProfile = document.forms['form-edit-profile'];
const fieldNameEditProfile = formEditProfile.elements['name-profile'];
const fieldCaptionEditProfile = formEditProfile.elements['caption-profile'];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__botton_type_no-validate',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const cardSelector = '#new-card';
const cardSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    const card = new Card(cardData, cardSelector);
    return card.renderCard()
  }
}, '.cards');
cardSection.rendererAll();

const addCardPopup = new PopupWithForm('#overlay-card', (cardData) => {
  cardSection.addItem(cardData);
  addCardPopup.close();
});
addCardPopup.setEventListeners()


const editProfilePopup = new PopupWithForm('#overlay-profile', () => {
  editProfilePopup.close();
});
editProfilePopup.setEventListeners()


const openImagePopup = new PopupWithImage('#overlay-image');
openImagePopup.setEventListeners()

const userInfoData = new UserInfo({ nameSelector: '.profile__name', captionSelector: '.profile__caption' });

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

function openOverlayProfileClick() {
  formEditProfileValidator.resetValidationform();
  editProfilePopup.open();
  document.querySelector('#name-profile').value = userInfoData.getUserInfo().name;
  fieldCaptionEditProfile.value = userInfoData.getUserInfo().caption;
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  addCardPopup.open();
  formCreationCardValidator.resetValidationform();
};
addButton.addEventListener('click', openOverlayCardClick);

//функция сохранения имени и рода деятельности
function saveFormSubmitProfileHandler(evt) {
  evt.preventDefault();
  userInfoData.setUserInfo({ name: fieldNameEditProfile.value, caption: fieldCaptionEditProfile.value })
  closePopup(overlayProfileOpen);
}
formEditProfile.addEventListener('submit', saveFormSubmitProfileHandler);