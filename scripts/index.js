import Card from './Card.js';
import FormValidator from './Validate.js';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const overlayProfileOpen = document.querySelector('#overlay-profile');
const overlayCardOpen = document.querySelector('#overlay-card');

const overlayProfileClose = overlayProfileOpen.querySelector('.overlay__close');
const overlayCardClose = overlayCardOpen.querySelector('.overlay__close');

const formEditProfile = document.forms['form-edit-profile'];
const fieldNameEditProfile = formEditProfile.elements['name-profile'];
const fieldCaptionEditProfile = formEditProfile.elements['caption-profile'];

const formCreationCard = document.forms['form-creation-card'];
const fieldNameNewCard = formCreationCard.elements['name-card'];
const fieldLinkNewCard = formCreationCard.elements['link-card'];

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const cardsBlock = document.querySelector('.cards');

const overlay = Array.from(document.querySelectorAll('.overlay'));

const overlayImage = document.querySelector('#overlay-image');
const overlayImageClose = overlayImage.querySelector('.overlay__close');

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

const formEditProfileValidator = new FormValidator(
  {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__botton_type_no-validate',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  },
    document.querySelector('#form-profile')
  );
formEditProfileValidator.enableValidation();

const formCreationCardValidator = new FormValidator(
  {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__botton_type_no-validate',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  },
    document.querySelector('#form-card')
);
formCreationCardValidator.enableValidation();


//навешивание слушателя на закрытия без сохранения формы изменения имени и рода деятельности
overlayProfileClose.addEventListener('click', () => closePopup(overlayProfileOpen));

//навешивание слушателя на закрытия без сохранения формы создания карточек
overlayCardClose.addEventListener('click', () => closePopup(overlayCardOpen));

//функция закрытия popupов на клавишу esc
function closePopupCardEscape(evt) {
  if (evt.key === 'Escape') {
    const overlayAll = Array.from(document.querySelectorAll('.overlay_opened'));
    overlayAll.forEach((overlay) => {
      closePopup(overlay)
    })
  }
}

//функция открытия popupов
export default function openPopup(popupNameConst) {
  popupNameConst.classList.add('overlay_opened');
  document.addEventListener('keydown', closePopupCardEscape);
};

//функция закрытия popupов 
function closePopup(popupNameConst) {
  popupNameConst.classList.remove('overlay_opened');
  document.removeEventListener('keydown', closePopupCardEscape);
  document.querySelector('#form-card').reset();
};

//функция закрытия нажатием за пределами оверлея
function closeOutsidePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
};
overlay.forEach(overlayElement => { overlayElement.addEventListener('mousedown', closeOutsidePopup) }); 

//функция открытия формы изменения имени и рода деятельности
function openOverlayProfileClick() {
  openPopup(overlayProfileOpen);
  fieldNameEditProfile.value = profileName.textContent;
  fieldCaptionEditProfile.value = profileCaption.textContent;
  formEditProfileValidator.resetValidationform();
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  openPopup(overlayCardOpen);
  formCreationCardValidator.resetValidationform();
};
addButton.addEventListener('click', openOverlayCardClick);

//функция делания кнопки неактивной
function deactiveButton() {
  console.log('tut');
  overlayCardOpen.querySelector('.form__button').classList.add('form__botton_type_no-validate');
  overlayCardOpen.querySelector('.form__button').disabled = true;
};

//функция сохранения имени и рода деятельности
function saveFormSubmitProfileHandler(evt) {
  evt.preventDefault();
  profileName.textContent = fieldNameEditProfile.value;
  profileCaption.textContent = fieldCaptionEditProfile.value;
  closePopup(overlayProfileOpen);
}
formEditProfile.addEventListener('submit', saveFormSubmitProfileHandler);

//функция закрытия просмотра фотографии
function closeImageClick() {
  closePopup(overlayImage);
};
overlayImageClose.addEventListener('click', closeImageClick);

// функция создания элемента из класса карточки
function createCard(data) {
  const card = new Card(data, '#new-card');
  return card.renderCard()
};

// функция добавления элемента в массив, установка слушателя и открытие окна просмотра фотографии
function renderCard(cardNew) {
  cardsBlock.prepend(cardNew);
}

//функция создания новых карточек
function formSubmitCardHandler(evt) {
  const cardNew = createCard({ name: fieldNameNewCard.value, link: fieldLinkNewCard.value });
  evt.preventDefault();
  renderCard(cardNew);
  closePopup(overlayCardOpen);
  
};
formCreationCard.addEventListener('submit', formSubmitCardHandler);

//функция создания стартовых карточек
function initialStartCards() {
  initialCards.forEach(initialCard => {
    const cardNew = createCard(initialCard);
    renderCard(cardNew);
  });
};
initialStartCards();