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

const cardNewTemlate = document.querySelector('#new-card').content;
const card = cardNewTemlate.querySelector('.card');

const cardsBlock = document.querySelector('.cards');

const cardNew = card.cloneNode(true);
const cardName = cardNew.querySelector('.card__name');
const cardImage = cardNew.querySelector('.card__image');

const overlayImage = document.querySelector('#overlay-image');
const overlayImageName = overlayImage.querySelector('.overlay__name');
const overlayImageItem = overlayImage.querySelector('.overlay__image');
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


//функция открытия popupов
function openPopup(popupNameConst) {
  popupNameConst.classList.add('overlay_opened');
  document.addEventListener('keydown', closePopupCardEscape);
};

//функция закрытия popupов 
function closePopup(popupNameConst) {
  popupNameConst.classList.remove('overlay_opened');
  document.removeEventListener('keydown', closePopupCardEscape);

};

//функция закрытия нажатием за пределами оверлея
function closeOutsidePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt);
  }
};

//функция закрытия popup карточек на клавишу esc
function closePopupCardEscape(evt) {
  if (evt.key === 'Escape') {
    overlayCardOpen.classList.remove('overlay_opened');
    overlayProfileOpen.classList.remove('overlay_opened');
    overlayImage.classList.remove('overlay_opened');
  }
}

//функция открытия формы изменения имени и рода деятельности
function openOverlayProfileClick() {
  openPopup(overlayProfileOpen);
  fieldNameEditProfile.value = profileName.textContent;
  fieldCaptionEditProfile.value = profileCaption.textContent;
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  openPopup(overlayCardOpen);
  fieldNameNewCard.value = '';
  fieldLinkNewCard.value = '';
};
addButton.addEventListener('click', openOverlayCardClick);

//функция закрытия без сохранения формы изменения имени и рода деятельности
function closeOverlayProfileClick() {
  closePopup(overlayProfileOpen);
};
overlayProfileClose.addEventListener('click', closeOverlayProfileClick);
overlayProfileClose.addEventListener('click', closeOutsidePopup);


//функция закрытия без сохранения формы создания карточек
function closeOverlayCardClick() {
  closePopup(overlayCardOpen);
};
overlayCardClose.addEventListener('click', closeOverlayCardClick);
overlayCardClose.addEventListener('click', closeOutsidePopup);

//функция сохранения имени и рода деятельности
function saveFormSubmitProfileHandler(evt) {
  evt.preventDefault();
  profileName.textContent = fieldNameEditProfile.value;
  profileCaption.textContent = fieldCaptionEditProfile.value;
  closeOverlayProfileClick();
}
formEditProfile.addEventListener('submit', saveFormSubmitProfileHandler);

//функция закрытия просмотра фотографии
function closeImageClick() {
  closePopup(overlayImage);
};
overlayImageClose.addEventListener('click', closeImageClick);
overlayImageClose.addEventListener('click', closeOutsidePopup);

//функция обработки лайка
function putLike(evt) {
  evt.target.classList.toggle('card__like_aktive');
};

/* функция создания элемента из данных для карточки, поставка лайка, 
установка слушателя и удаление карточки с фотографией, установка слушателя и открытие просмотра фотографии */
function createCard(cardName, cardLink) {
  const cardNew = card.cloneNode(true);
  const cardNewImage = cardNew.querySelector('.card__image')
  cardNew.querySelector('.card__name').textContent = cardName;
  cardNewImage.src = cardLink;
  cardNewImage.alt = cardName;

  //поставка лайка
  cardNew.querySelector('.card__like').addEventListener('click', putLike);

  //установка слушателя и  удаление карточки с фотографией
  const cardDelete = cardNew.querySelector('#card-delete');
  cardDelete.addEventListener('click', function () {
    cardNew.remove();
  });

  //установка слушателя и открытие просмотра фотографии
  cardNewImage.addEventListener('click', function (evt) {
    openPopup(overlayImage);
    overlayImageName.textContent = cardName;
    overlayImageItem.src = cardLink;
    overlayImageItem.alt = cardName;
  });
  return cardNew
};

// функция добавления элемента в массив, установка слушателя и открытие окна просмотра фотографии
function renderCard(cardNew) {
  cardsBlock.prepend(cardNew);
}

//функция создания новых карточек
function formSubmitCardHandler(evt) {
  const cardNew = createCard(fieldNameNewCard.value, fieldLinkNewCard.value);
  evt.preventDefault();
  renderCard(cardNew);
  closeOverlayCardClick();
};
formCreationCard.addEventListener('submit', formSubmitCardHandler);

//функция создания стартовых карточек
function initialStartCards() {
  for (let i = 0; i <= initialCards.length; i++) {
    const cardNew = createCard(initialCards[i].name, initialCards[i].link);
    renderCard(cardNew);
  };
};
initialStartCards()


