let userId = '';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';
import {
  editButton, addButton, editButtonAvatar, overlayDeleteCard, fieldNameEditProfile,
  fieldCaptionEditProfile, avatarImg, cardSelector, config, option
} from '../utils/constants.js';

const api = new Api(option)

const userInfoData = new UserInfo({
  nameSelector: '.profile__name',
  captionSelector: '.profile__caption',
  avatarSelector: '.profile__img'
});

const cardSection = new Section({
  renderer: (cardData) => {
    return createCard(cardData);
  }
}, '.cards');



const formDeleteCard = new PopupWithForm('#overlay-delete-card', () => {

})
formDeleteCard.setEventListeners()

//промис на получение данных о пользователях и отрисовке карточек
Promise.all([api.getInfoUser(), api.getListCard()])
  .then(data => {
    const [userData, cardData] = data;
    userId = userData._id;
    userInfoData.setUserInfo(userData);
    cardSection.rendererAll(cardData);
  })

//функция добавления карточки
const addCardPopup = new PopupWithForm('#overlay-card', (cardData) => {
  api.addCard(cardData.name, cardData.link)
    .then(dataCard => {
      cardSection.addItemPrepend(dataCard);
      addCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.renderLoading();
    })
});
addCardPopup.setEventListeners()

//функция редактирования профиля
const editProfilePopup = new PopupWithForm('#overlay-profile', (inpitValues) => {
  api.patchInfoUser(inpitValues.name, inpitValues.about)
    .then(dataProfile => {
      userInfoData.setUserInfo(dataProfile)
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading();
    })
});
editProfilePopup.setEventListeners()

//функция изменения аватара
const formAvatar = new PopupWithForm('#overlay-avatar', (avatarLink) => {
  api.editAvatar(avatarLink.link)
    .then(dataAvatar => {
      avatarImg.src = dataAvatar.avatar
      formAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAvatar.renderLoading();
    })
})
formAvatar.setEventListeners()


const createCard = (cardData) => {
  const card = new Card(cardData, cardSelector, userId,
    {
      handleCardClick: (name, link) => {
        openImagePopup.open(name, link);
      },

      handleLikeClick: () => {
        const result = cardData.likes.find((item) => { return item._id === userId }) ? api.dislikeCard(cardData._id) : api.likeCard(cardData._id)
        result
          .then((data) => {
            card.renderLikes(data);
          })
          .catch((err) => {
            console.log(err);
          })
      },

      handleDeleteClick: (cardElement) => {
        formDeleteCard.open();
        overlayDeleteCard.addEventListener('submit', () => {
          api.delCard(cardData._id)
            .then(() => {
              cardElement.remove();
              formDeleteCard.renderLoading();
              formDeleteCard.close();
            })
            .catch((err) => {
              console.log(err);
            })
        })
      }
    }
  )

  return card.renderCard()
}

//Открытие полноразмерных картинок
const openImagePopup = new PopupWithImage('#overlay-image');
openImagePopup.setEventListeners()

//валидация формы изменения профиля
const formEditProfileValidator = new FormValidator(
  config,
  document.querySelector('#form-profile')
);
formEditProfileValidator.enableValidation();

//валидация формы создания карточки
const formCreationCardValidator = new FormValidator(
  config,
  document.querySelector('#form-card')
);
formCreationCardValidator.enableValidation();

//валидация формы редактирвоания аватара
const formEditAvatarValidator = new FormValidator(
  config,
  document.querySelector('#form-avatar')
);
formEditAvatarValidator.enableValidation();

//функция открытия формы изменения имени и рода деятельности
function openOverlayProfileClick() {
  formEditProfileValidator.resetValidation();
  const userData = userInfoData.getUserInfo();
  fieldNameEditProfile.value = userData.name;
  fieldCaptionEditProfile.value = userData.caption;
  editProfilePopup.open();
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек
function openOverlayCardClick() {
  addCardPopup.open();
  formCreationCardValidator.resetValidation();
};
addButton.addEventListener('click', openOverlayCardClick);

//функция открытия формы изменения аватара
function openOverlayEditAvatar() {
  formAvatar.open();
}
editButtonAvatar.addEventListener('click', openOverlayEditAvatar);