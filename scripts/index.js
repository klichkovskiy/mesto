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



//функция открытия формы изменения имени и рода деятельности
function openOverlayProfileClick() {
  nameProfileInput.value = profileName.textContent;
  captionProfileInput.value = profileCaption.textContent;
  overlayProfileOpen.classList.toggle('overlay_opened');
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  nameCardInput.placeholder = 'Название';
  captionCardInput.placeholder = 'Ссылка на картинку';
  nameCardInput.value = '';
  captionCardInput.value = '';
  overlayCardOpen.classList.toggle('overlay_opened');
};
addButton.addEventListener('click', openOverlayCardClick);

//функция закрытия без сохранения формы изменения имени и рода деятельности
function closeOverlayProfileClick() {
  overlayProfileOpen.classList.toggle('overlay_opened');
};
overlayProfileClose.addEventListener('click', closeOverlayProfileClick);

//функция закрытия без сохранения формы создания карточек
function closeOverlayCardClick() {
  overlayCardOpen.classList.toggle('overlay_opened');
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
  console.log('exit')
  overlayImage.classList.toggle('overlay_opened');
});


//функция поставки лайка
function putLike(evt) {
  evt.target.classList.toggle('card__like_aktive');
};


//функция создания новых карточек и возможность ставить лайк, удалить карточку, открыть фото
function formSubmitCardHandler(evt) {
  const cardNew = card.cloneNode(true);
  const cardName = cardNew.querySelector('.card__name');
  const cardImage = cardNew.querySelector('.card__image');
  evt.preventDefault();
  cardName.textContent = nameCardInput.value;
  cardImage.src = captionCardInput.value;
  cardsBlock.prepend(cardNew);
  closeOverlayCardClick();


  //поставка лайка
  cardNew.querySelector('.card__like').addEventListener('click', putLike);


  //установка слушателя и  удаление карточки с фотографией
  const cardDelete = cardNew.querySelector('#card-delete');
  cardDelete.addEventListener('click', function () {
    const listItem = cardDelete.closest('.card');
    listItem.remove();
  });


  //установка слушателя и  открытие просмотра фотографии
  cardImage.addEventListener('click', function (evt) {
    const overlayImage = document.querySelector('#overlay-image');
    const overlayImageName = overlayImage.querySelector('.overlay__name');
    const overlayImageItem = overlayImage.querySelector('.overlay__image');
    overlayImage.classList.toggle('overlay_opened');
    overlayImageName.textContent = cardName.textContent;
    overlayImageItem.src = cardImage.src;
    overlayImageItem.alt = cardName.textContent;
  });
};
overlayCardForm.addEventListener('submit', formSubmitCardHandler);



//функция создания стартовых карточек и возможность ставить лайк, удалить карточку, открыть фото
function initialStartCards() {
  for (let i = 0; i <= initialCards.length; i++) {
    const cardNew = card.cloneNode(true);
    const cardName = cardNew.querySelector('.card__name');
    const cardImage = cardNew.querySelector('.card__image');
    cardName.textContent = initialCards[i].name;
    cardImage.src = initialCards[i].link;
    cardImage.alt = initialCards[i].name;
    cardsBlock.prepend(cardNew);


    //поставка лайка
    cardNew.querySelector('.card__like').addEventListener('click', putLike);


    //установка слушателя и  удаление карточки с фотографией
    const cardDelete = cardNew.querySelector('#card-delete');
    cardDelete.addEventListener('click', function () {
      const listItem = cardDelete.closest('.card');
      listItem.remove();
    });


    //установка слушателя и открытие просмотра фотографии
    cardImage.addEventListener('click', function (evt) {
      const overlayImage = document.querySelector('#overlay-image');
      const overlayImageName = overlayImage.querySelector('.overlay__name');
      const overlayImageItem = overlayImage.querySelector('.overlay__image');
      overlayImage.classList.toggle('overlay_opened');
      overlayImageName.textContent = cardName.textContent;
      overlayImageItem.src = cardImage.src;
      overlayImageItem.alt = cardName.textContent;
    });
  };
};
initialStartCards()


