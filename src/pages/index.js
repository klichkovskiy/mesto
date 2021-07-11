import { Card } from '../components/Card.js';
import { FormValidator } from '../components/Validate.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';
import {
  editButton, addButton, editButtonAvatar, deleteButtonCard, fieldNameEditProfile,
  fieldCaptionEditProfile, avatarImg, cardSelector, config, option
} from '../utils/constants.js';


const api = new Api(option)

//получаем и отрисовываем первоначальный массим карточек (сделана)
api.listCard()
  .then((data) => {
    const cardSection = new Section({
      items: data,
      renderer: (cardData) => {
        const card = new Card(cardData, cardSelector, (name, link) => {
          openImagePopup.open(name, link);
        });
        return card.renderCard()
      }
    }, '.cards');
    cardSection.rendererAll();
  })

const userInfoData = new UserInfo({
  nameSelector: '.profile__name',
  captionSelector: '.profile__caption',
});

//получаем информацию о пользователе и аватар
api.infoUser()
  .then(data => {
    avatarImg.src = data.avatar;
    userInfoData.setUserInfo(data);
  })

//функция 
function renderLoading(isLoading, formSelector) {
  const form = document.querySelector(formSelector)
  const textContent = form.querySelector('.form__button').textContent;
  if (isLoading) {
    return textContent + '...'
  } else {
    return textContent
  }

}


//функция добавления карточки (сделана)
const addCardPopup = new PopupWithForm('#overlay-card', (cardData) => {
  renderLoading(true, '#overlay-card')
  api.addCard(cardData.name, cardData.link)
    .then((data) => {
      const cardSection = new Section({
        items: data,
        renderer: (item) => {
          const newCard = new Card(item, cardSelector, (name, link) => {
            openImagePopup.open(name, link);
          }
          );
          return newCard.renderCard()
        }
      }, '.cards');
      cardSection.addItemPrepend(data);
    })
    .finally(() => {
      renderLoading(false, '#overlay-card')
    })
  addCardPopup.close();
});
addCardPopup.setEventListeners()


//функция редактирования профиля (сделана)
const editProfilePopup = new PopupWithForm('#overlay-profile', (inpitValues) => {
  renderLoading(true, '#overlay-profile')
  api.infoUserPatch(inpitValues.name, inpitValues.about)
  userInfoData.setUserInfo(inpitValues)
  editProfilePopup.close();

});
editProfilePopup.setEventListeners()

//функция изменения аватара(сделана)
const formAvatar = new PopupWithForm('#overlay-avatar', (avatarLink) => {
  renderLoading(true, '#overlay-avatar')
  api.editAvatar(avatarLink.link)
  avatarImg.src = avatarLink.link
  formAvatar.close();
})
formAvatar.setEventListeners()

//Открытие полноразмерных картинок (сделана)
const openImagePopup = new PopupWithImage('#overlay-image');
openImagePopup.setEventListeners()

//валидация формы изменения профиля (сделана)
const formEditProfileValidator = new FormValidator(
  config,
  document.querySelector('#form-profile')
);
formEditProfileValidator.enableValidation();

//валидация формы создания карточки (сделана)
const formCreationCardValidator = new FormValidator(
  config,
  document.querySelector('#form-card')
);
formCreationCardValidator.enableValidation();

//валидация формы редактирвоания аватара (сделана)
const formEditAvatarValidator = new FormValidator(
  config,
  document.querySelector('#form-avatar')
);
formEditAvatarValidator.enableValidation();

//функция открытия формы изменения имени и рода деятельности(сделана)
function openOverlayProfileClick() {
  renderLoading(false, '#overlay-profile')
  formEditProfileValidator.resetValidationform();
  const userData = userInfoData.getUserInfo();
  fieldNameEditProfile.value = userData.name;
  fieldCaptionEditProfile.value = userData.caption;
  editProfilePopup.open();
};
editButton.addEventListener('click', openOverlayProfileClick);

//функция открытия формы создания карточек(сделана)
function openOverlayCardClick() {
  addCardPopup.open();
  formCreationCardValidator.resetValidationform();
};
addButton.addEventListener('click', openOverlayCardClick);

//функция открытия формы изменения аватара(сделана)
function openOverlayEditAvatar() {
  renderLoading(false, '#overlay-avatar')
  formAvatar.open();
}
editButtonAvatar.addEventListener('click', openOverlayEditAvatar);


