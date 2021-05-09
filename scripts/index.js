const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const overlayProfileOpen = document.querySelector('#overlay-profile');
const overlayProfileClose = overlayProfileOpen.querySelector('.overlay__close');
const overlayProfileForm = overlayProfileOpen.querySelector('.overlay__form');

const nameProfileInput = overlayProfileOpen.querySelector('.overlay__item_profile_name');
const captionProfileInput = overlayProfileOpen.querySelector('.overlay__item_profile_caption');

const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const overlayCardOpen = document.querySelector('#overlay-card');
const overlayCardClose = overlayCardOpen.querySelector('.overlay__close');
const overlayCardForm = overlayCardOpen.querySelector('.overlay__form');

const nameCardInput = overlayCardOpen.querySelector('.overlay__item_profile_name');
const captionCardInput = overlayCardOpen.querySelector('.overlay__item_profile_caption');

const cardNewTemlate = document.querySelector('#new-card').content;
const card = cardNewTemlate.querySelector('.card');

const cardsBlock = document.querySelector('.cards');

const cardNew = card.cloneNode(true);
const cardName = cardNew.querySelector('.card__name');
const cardImage = cardNew.querySelector('.card__image');

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


//функция открытия и закрытия popupов
function openAndClosePopup (popupNameConst) {
  popupNameConst.classList.toggle('overlay_opened');
};

//функция открытия формы изменения имени и рода деятельности
function openOverlayProfileClick() {
  openAndClosePopup (overlayProfileOpen);
  nameProfileInput.value = profileName.textContent;
  captionProfileInput.value = profileCaption.textContent;
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  openAndClosePopup (overlayCardOpen);
  nameCardInput.value = '';
  captionCardInput.value = '';
};
addButton.addEventListener('click', openOverlayCardClick);

//функция закрытия без сохранения формы изменения имени и рода деятельности
function closeOverlayProfileClick() {
  openAndClosePopup (overlayProfileOpen);
};
overlayProfileClose.addEventListener('click', closeOverlayProfileClick);

//функция закрытия без сохранения формы создания карточек
function closeOverlayCardClick() {
  openAndClosePopup (overlayCardOpen);
};
overlayCardClose.addEventListener('click', closeOverlayCardClick);

//функция сохранения имени и рода деятельности
function saveFormSubmitProfileHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileCaption.textContent = captionProfileInput.value;
  closeOverlayProfileClick();
}
overlayProfileForm.addEventListener('submit', saveFormSubmitProfileHandler);

//функция закрытия просмотра фотографии
const overlayImage = document.querySelector('#overlay-image');
const overlayImageClose = overlayImage.querySelector('.overlay__close');
overlayImageClose.addEventListener('click', function () {
  openAndClosePopup (overlayImage);
});

//функция обработки лайка
function putLike(evt) {
  evt.target.classList.toggle('card__like_aktive');
};

// функция создания элемента из данных для карточки
function createCard(cardName, cardLink) {
  const cardNew = card.cloneNode(true);
  cardNew.querySelector('.card__name').textContent = cardName;
  cardNew.querySelector('.card__image').src = cardLink;
  cardNew.querySelector('.card__image').alt = cardName;
  return cardNew
};

// функция добавления элемента в массив
function renderCard(cardNew) {
  cardsBlock.prepend(cardNew);
}

//функция создания новых карточек и возможность ставить лайк, удалить карточку, открыть фото
function formSubmitCardHandler(evt) {
  const cardNew = createCard(nameCardInput.value, captionCardInput.value);
  evt.preventDefault();
  renderCard(cardNew);
  closeOverlayCardClick();

  //поставка лайка
  cardNew.querySelector('.card__like').addEventListener('click', putLike);

  //установка слушателя и  удаление карточки с фотографией
  const cardDelete = cardNew.querySelector('#card-delete');
  cardDelete.addEventListener('click', function () {
    const listItem = cardDelete.closest('.card');
    listItem.remove();
  });
  const cardImage = cardNew.querySelector('.card__image');
  const cardName = cardNew.querySelector('.card__name');
  //установка слушателя и  открытие просмотра фотографии
  cardImage.addEventListener('click', function (evt) {
    const overlayImage = document.querySelector('#overlay-image');
    const overlayImageName = overlayImage.querySelector('.overlay__name');
    const overlayImageItem = overlayImage.querySelector('.overlay__image');
    openAndClosePopup (overlayImage);
    overlayImageName.textContent = cardName.textContent;
    overlayImageItem.src = cardImage.src;
    overlayImageItem.alt = cardName.textContent;
  });
};
overlayCardForm.addEventListener('submit', formSubmitCardHandler);


//функция создания стартовых карточек и возможность ставить лайк, удалить карточку, открыть фото
function initialStartCards() {
  for (let i = 0; i <= initialCards.length; i++) {
    const cardNew = createCard(initialCards[i].name, initialCards[i].link);
    renderCard(cardNew);

    //поставка лайка
    cardNew.querySelector('.card__like').addEventListener('click', putLike);

    //установка слушателя и  удаление карточки с фотографией
    const cardDelete = cardNew.querySelector('#card-delete');
    cardDelete.addEventListener('click', function () {
      const listItem = cardDelete.closest('.card');
      listItem.remove();
    });
    const cardImage = cardNew.querySelector('.card__image');
    const cardName = cardNew.querySelector('.card__name');
    //установка слушателя и открытие просмотра фотографии
    cardImage.addEventListener('click', function (evt) {
      const overlayImage = document.querySelector('#overlay-image');
      const overlayImageName = overlayImage.querySelector('.overlay__name');
      const overlayImageItem = overlayImage.querySelector('.overlay__image');
      openAndClosePopup (overlayImage);
      overlayImageName.textContent = cardName.textContent;
      overlayImageItem.src = cardImage.src;
      overlayImageItem.alt = cardName.textContent;
    });
  };
};
initialStartCards()


